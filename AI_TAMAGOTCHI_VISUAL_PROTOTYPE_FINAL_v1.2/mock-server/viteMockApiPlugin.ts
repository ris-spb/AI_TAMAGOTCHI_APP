import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

import type {
  ClarificationAnswerRequest,
  ComplexityLevel,
  ProcessingState,
  TaskAcceptedResponse,
  TaskCreateRequest,
  TaskEditRequest,
} from '../src/features/ai-case/contracts';
import { taskCreateRequestSchema, taskEditRequestSchema, clarificationAnswerRequestSchema } from '../src/features/ai-case/schemas';
import { deterministicMascotHp } from '../src/fixtures/demo';
import {
  AI_CASE_PROCESSING_ID,
  AI_CASE_PROVIDER_ATTEMPT_ID,
  AI_CASE_TASK_ID,
  AI_CASE_VERSION_ID,
  buildTaskResult,
  clarificationFixtures,
  deterministicTranscript,
  safeClarificationTarget,
} from '../src/fixtures/aiCase';
import { buildHomeFixture } from '../src/fixtures/home';
import healthFixture from '../src/fixtures/mock-health.json';
import { mascotStates, type ErrorCode, type MascotState } from '../src/mock-api/contracts';
import {
  achievements,
  companyAnalytics,
  currentGoalCycle,
  directorateLeaderboard,
  employeeLeaderboard,
  meResponse,
  notifications,
  personalDashboard,
  previousGoalCycle,
  publicProfiles,
  scoringInfo,
  stage6HistoryEvents,
  stage6TaskDetail,
  stage6Tasks,
  stage6TaskVersions,
} from '../src/features/employee-sections/fixtures';
import type { PrivacyResponse, VacationState } from '../src/features/employee-sections/contracts';
import {
  adminDirectorates,
  adminEmployees,
  auditEvents,
  calendarDays,
  directorDashboard,
  executiveDashboard,
  managementEmployeeDashboard,
  scoringTrace,
  taxonomyVersions,
  tools,
  unrecognizedTools,
} from '../src/features/management/fixtures';
import type { AdminEmployee, CalendarDay, Directorate, ExportCreateRequest, TaxonomyVersion, Tool } from '../src/features/management/contracts';
import type { AuthVerifyRequest, GoalSetupSubmitRequest, OnboardingCompleteRequest } from '../src/features/entry/contracts';
import { DEMO_PERSONNEL_NUMBER, DEMO_PHONE, GOAL_SETUP_CYCLE_ID, ONBOARDING_CONTENT_VERSION, goalSetupOptions } from '../src/features/entry/fixtures';

const MOCK_HEALTH_PATH = '/__prototype/mock-health';
const HOME_PATH = '/v1/home';
const TASKS_PATH = '/v1/tasks';
const TRANSCRIPTION_PATH = '/v1/tasks/voice/transcriptions';
const MAX_LATENCY_MS = 3_000;

type AiCaseScenario = 'success' | 'processing_error' | 'stt_error' | 'network_error' | 'microphone_denied';

type MockTaskState = {
  request: TaskCreateRequest | TaskEditRequest;
  idempotencyKey: string;
  taskId: string;
  taskVersionId: string;
  processingRunId: string;
  versionNo: number;
  targetClarifications: 0 | 1 | 2 | 3;
  answeredClarifications: number;
  resultLevel: ComplexityLevel;
  scenario: AiCaseScenario;
  processingRetryCount: number;
  resultNormalizedDescription?: string;
  resultToolName?: string;
  resultEvolutionXpAwarded?: number;
  resultGoalProgressDelta?: number;
};

let activeTask: MockTaskState | null = null;
const acceptedByIdempotency = new Map<string, TaskAcceptedResponse>();
let currentPrivacy: PrivacyResponse['privacy_level'] = 'standard';
let vacationState: VacationState = { enabled: false, started_at: null };
const readNotificationIds = new Set(notifications.filter((item) => item.read_at).map((item) => item.notification_id));
const deletedTaskIds = new Set<string>();
let mutableAdminEmployees: AdminEmployee[] = adminEmployees.map((item) => ({ ...item }));
let mutableDirectorates: Directorate[] = adminDirectorates.map((item) => ({ ...item }));
let mutableCalendarDays: CalendarDay[] = calendarDays.map((item) => ({ ...item }));
let mutableTaxonomyVersions: TaxonomyVersion[] = taxonomyVersions.map((version) => ({ ...version, categories: version.categories.map((item) => ({ ...item })), subcategories: version.subcategories.map((item) => ({ ...item })) }));
let mutableTools: Tool[] = tools.map((item) => ({ ...item, aliases: [...item.aliases] }));
let exportCounter = 0;
let onboardingCompleted = false;
let goalSetupSubmitted = false;
const exportJobs = new Map<string, { request: ExportCreateRequest; role: string; polls: number; createdAt: string }>();

function clampLatency(value: string | null, fallback = 80): number {
  const parsed = Number(value ?? fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.trunc(parsed), 0), MAX_LATENCY_MS);
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Prototype-Mock', 'true');
  response.end(JSON.stringify(payload));
}

function sendText(response: ServerResponse, statusCode: number, payload: string, contentType = 'text/plain; charset=utf-8') {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', contentType);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Prototype-Mock', 'true');
  response.end(payload);
}

function parseMascotState(value: string | null): MascotState {
  return mascotStates.includes(value as MascotState) ? (value as MascotState) : 'happy';
}

function parseStreak(value: string | null): number {
  const parsed = Number(value ?? 7);
  if (!Number.isFinite(parsed)) return 7;
  return Math.max(0, Math.trunc(parsed));
}

function parseGoalProgress(value: string | null): readonly [number, number, number] {
  const raw = (value ?? '1,2,0').split(',').slice(0, 3);
  const parseOne = (item: string | undefined) => {
    const parsed = Number(item ?? 0);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  };
  return [parseOne(raw[0]), parseOne(raw[1]), parseOne(raw[2])];
}

function apiError(code: ErrorCode, message: string, fieldErrors?: readonly { field: string; code: string; message: string }[]) {
  return {
    code,
    message,
    trace_id: 'prototype-stage5-trace-0001',
    ...(fieldErrors ? { field_errors: fieldErrors } : {}),
  } as const;
}

function parseScenario(value: string | string[] | undefined): AiCaseScenario {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === 'processing_error' || normalized === 'stt_error' || normalized === 'network_error' || normalized === 'microphone_denied'
    ? normalized
    : 'success';
}

function parseComplexity(value: string | string[] | undefined): ComplexityLevel {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === 'C1' || normalized === 'C2' || normalized === 'C4' || normalized === 'C5' ? normalized : 'C3';
}

function getHeader(request: IncomingMessage, name: string): string | undefined {
  const value = request.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

async function readBody(request: IncomingMessage, maxBytes = 1_500_000): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buffer.length;
    if (total > maxBytes) throw new Error('BODY_TOO_LARGE');
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

async function readJson<T>(request: IncomingMessage): Promise<T> {
  const raw = await readBody(request);
  return JSON.parse(raw.toString('utf8')) as T;
}

function acceptedResponse(
  status: TaskAcceptedResponse['status'] = 'accepted',
  identity: { taskId: string; taskVersionId: string; versionNo: number; processingRunId: string } = {
    taskId: AI_CASE_TASK_ID, taskVersionId: AI_CASE_VERSION_ID, versionNo: 1, processingRunId: AI_CASE_PROCESSING_ID,
  },
): TaskAcceptedResponse {
  return {
    task_id: identity.taskId,
    task_version_id: identity.taskVersionId,
    version_no: identity.versionNo,
    processing_run_id: identity.processingRunId,
    status,
  };
}

function buildProcessingState(task: MockTaskState): ProcessingState {
  if (task.scenario === 'processing_error' && task.processingRetryCount === 0) {
    return {
      task_id: task.taskId,
      task_version_id: task.taskVersionId,
      processing_run_id: task.processingRunId,
      status: 'failed',
      clarification_count: Math.min(task.answeredClarifications, 3),
      pending_clarification: null,
      failure_code: 'PROCESSING_FAILED',
    };
  }

  if (task.answeredClarifications < task.targetClarifications && task.answeredClarifications < 3) {
    const pending = clarificationFixtures[task.answeredClarifications] ?? null;
    return {
      task_id: task.taskId,
      task_version_id: task.taskVersionId,
      processing_run_id: task.processingRunId,
      status: 'waiting_clarification',
      clarification_count: pending?.sequence_no ?? task.answeredClarifications,
      pending_clarification: pending,
      failure_code: null,
    };
  }

  return {
    task_id: task.taskId,
    task_version_id: task.taskVersionId,
    processing_run_id: task.processingRunId,
    status: 'completed',
    clarification_count: Math.min(task.targetClarifications, 3),
    pending_clarification: null,
    failure_code: null,
  };
}

async function handleHealth(requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (requestUrl.pathname !== MOCK_HEALTH_PATH) return false;

  const latencyMs = clampLatency(requestUrl.searchParams.get('latency'));
  const scenario = requestUrl.searchParams.get('scenario') ?? 'success';
  await wait(latencyMs);

  switch (scenario) {
    case 'error':
      sendJson(response, 503, {
        code: 'PROTOTYPE_MOCK_UNAVAILABLE',
        message: 'Deterministic prototype error scenario',
      });
      break;
    case 'forbidden':
      sendJson(response, 403, {
        code: 'PROTOTYPE_MOCK_FORBIDDEN',
        message: 'Deterministic prototype forbidden scenario',
      });
      break;
    case 'empty':
      sendJson(response, 200, { items: [] });
      break;
    default:
      sendJson(response, 200, healthFixture);
  }

  return true;
}

async function handleHome(requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (requestUrl.pathname !== HOME_PATH) return false;

  const latencyMs = clampLatency(requestUrl.searchParams.get('latency'));
  const scenario = requestUrl.searchParams.get('scenario') ?? 'success';
  const healthState = parseMascotState(requestUrl.searchParams.get('health_state'));
  const streak = parseStreak(requestUrl.searchParams.get('streak'));
  const goalProgress = parseGoalProgress(requestUrl.searchParams.get('goals'));

  void deterministicMascotHp[healthState];
  await wait(latencyMs);

  if (scenario === 'forbidden') {
    sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Доступ к Home запрещён для текущего mock scope.'));
    return true;
  }
  if (scenario === 'error') {
    sendJson(response, 500, apiError('INTERNAL_ERROR', 'Контролируемая ошибка mock Home API.'));
    return true;
  }

  sendJson(response, 200, buildHomeFixture({
    healthState,
    streak,
    goalProgress,
    empty: scenario === 'empty',
  }));
  return true;
}

async function handleTranscription(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (requestUrl.pathname !== TRANSCRIPTION_PATH || request.method !== 'POST') return false;

  const idempotencyKey = getHeader(request, 'Idempotency-Key');
  if (!idempotencyKey) {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для mock STT требуется Idempotency-Key.'));
    return true;
  }

  const scenario = parseScenario(getHeader(request, 'X-Prototype-STT-Scenario'));
  try {
    // Audio exists only in request memory and is discarded immediately after parsing.
    await readBody(request);
  } catch {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Аудио не удалось обработать.'));
    return true;
  }
  await wait(360);

  if (scenario === 'stt_error' || scenario === 'network_error') {
    sendJson(response, 503, apiError('DEPENDENCY_UNAVAILABLE', 'Контролируемая ошибка mock STT. Исходное аудио не сохранено.'));
    return true;
  }

  sendJson(response, 200, {
    transcript: deterministicTranscript,
    provider_attempt_id: AI_CASE_PROVIDER_ATTEMPT_ID,
  });
  return true;
}

async function handleCreateTask(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (requestUrl.pathname !== TASKS_PATH || request.method !== 'POST') return false;

  const idempotencyKey = getHeader(request, 'Idempotency-Key');
  if (!idempotencyKey) {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для создания AI-кейса требуется Idempotency-Key.'));
    return true;
  }

  let payload: TaskCreateRequest;
  try {
    payload = taskCreateRequestSchema.parse(await readJson<unknown>(request));
  } catch {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Проверьте описание выполненной AI-задачи и ссылки.', [{
      field: 'raw_input',
      code: 'INVALID_TASK_INPUT',
      message: 'Описание выполненной AI-задачи обязательно.',
    }]));
    return true;
  }

  const existing = acceptedByIdempotency.get(idempotencyKey);
  if (existing && activeTask?.idempotencyKey === idempotencyKey) {
    // Retry of the same mutation never creates a duplicate. For the controlled processing_error
    // scenario, the retry re-enters processing and demonstrates the package retry contract.
    if (activeTask.scenario === 'processing_error' && activeTask.processingRetryCount === 0) {
      activeTask.processingRetryCount += 1;
    }
    await wait(160);
    sendJson(response, 202, existing);
    return true;
  }

  const targetClarifications = safeClarificationTarget(getHeader(request, 'X-Prototype-Clarifications'));
  const resultLevel = parseComplexity(getHeader(request, 'X-Prototype-Result-Level'));
  const scenario = parseScenario(getHeader(request, 'X-Prototype-AI-Scenario'));

  activeTask = {
    request: payload,
    idempotencyKey,
    taskId: AI_CASE_TASK_ID,
    taskVersionId: AI_CASE_VERSION_ID,
    processingRunId: AI_CASE_PROCESSING_ID,
    versionNo: 1,
    targetClarifications,
    answeredClarifications: 0,
    resultLevel,
    scenario,
    processingRetryCount: 0,
  };
  const accepted = acceptedResponse('accepted');
  acceptedByIdempotency.set(idempotencyKey, accepted);

  // URLs are deliberately stored as strings in the in-memory request object and never fetched.
  await wait(220);
  sendJson(response, 202, accepted);
  return true;
}

function matchActiveTaskPath(pathname: string, suffix: string): boolean {
  return Boolean(activeTask && pathname === `/v1/tasks/${activeTask.taskId}${suffix}`);
}

async function handleProcessing(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (request.method !== 'GET' || !requestUrl.pathname.match(/^\/v1\/tasks\/[^/]+\/processing$/)) return false;
  await wait(220);

  if (!activeTask || !matchActiveTaskPath(requestUrl.pathname, '/processing')) {
    sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден в текущей deterministic mock session.'));
    return true;
  }
  if (activeTask.scenario === 'network_error' && activeTask.processingRetryCount === 0) {
    activeTask.processingRetryCount += 1;
    sendJson(response, 503, apiError('DEPENDENCY_UNAVAILABLE', 'Контролируемая transient network/dependency ошибка. Повторный запрос безопасен.'));
    return true;
  }
  sendJson(response, 200, buildProcessingState(activeTask));
  return true;
}

// Contract route: /v1/tasks/{taskId}/clarifications/{clarificationId}/answer
async function handleClarificationAnswer(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (request.method !== 'POST') return false;
  const match = requestUrl.pathname.match(/^\/v1\/tasks\/([^/]+)\/clarifications\/([^/]+)\/answer$/);
  if (!match) return false;

  if (!activeTask || match[1] !== activeTask.taskId) {
    sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.'));
    return true;
  }
  if (!getHeader(request, 'Idempotency-Key')) {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для ответа требуется Idempotency-Key.'));
    return true;
  }

  let answer: ClarificationAnswerRequest;
  try {
    answer = clarificationAnswerRequestSchema.parse(await readJson<unknown>(request));
    void answer;
  } catch {
    sendJson(response, 400, apiError('VALIDATION_ERROR', 'Введите ответ на уточнение.'));
    return true;
  }

  if (activeTask.answeredClarifications >= 3) {
    sendJson(response, 409, apiError('CLARIFICATION_LIMIT_REACHED', 'Лимит из трёх уточнений достигнут. Четвёртый вопрос невозможен.'));
    return true;
  }

  const pending = clarificationFixtures[activeTask.answeredClarifications] ?? null;
  if (!pending || activeTask.answeredClarifications >= activeTask.targetClarifications) {
    sendJson(response, 409, apiError('CLARIFICATION_NOT_PENDING', 'Ожидающего уточнения нет.'));
    return true;
  }
  if (match[2] !== pending.clarification_id) {
    sendJson(response, 409, apiError('CLARIFICATION_NOT_PENDING', 'Это уточнение уже не является текущим.'));
    return true;
  }

  activeTask.answeredClarifications += 1;
  await wait(180);
  sendJson(response, 200, buildProcessingState(activeTask));
  return true;
}

async function handleResult(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  if (request.method !== 'GET' || !requestUrl.pathname.match(/^\/v1\/tasks\/[^/]+\/result$/)) return false;
  await wait(160);

  if (!activeTask || !matchActiveTaskPath(requestUrl.pathname, '/result')) {
    sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.'));
    return true;
  }
  const state = buildProcessingState(activeTask);
  if (state.status !== 'completed') {
    sendJson(response, 409, apiError('PROCESSING_NOT_READY', 'Результат ещё не готов.'));
    return true;
  }

  // Numerical Score/XP/Goal effects are supplied by this server-side mock fixture, never the UI.
  sendJson(response, 200, buildTaskResult(activeTask.resultLevel, activeTask.taskId, activeTask.taskVersionId, {
    normalizedDescription: activeTask.resultNormalizedDescription,
    toolName: activeTask.resultToolName,
    evolutionXpAwarded: activeTask.resultEvolutionXpAwarded,
    goalProgressDelta: activeTask.resultGoalProgressDelta,
  }));
  return true;
}

function readScenario(requestUrl: URL): string {
  return requestUrl.searchParams.get('scenario') ?? 'success';
}

function stage6ReadError(requestUrl: URL, response: ServerResponse): boolean {
  const scenario = readScenario(requestUrl);
  if (scenario === 'forbidden') {
    sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Контролируемое forbidden-состояние Stage 6.'));
    return true;
  }
  if (scenario === 'error') {
    sendJson(response, 500, apiError('INTERNAL_ERROR', 'Контролируемая ошибка Stage-6 mock API.'));
    return true;
  }
  return false;
}


async function handleEntryFlow(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  const path = requestUrl.pathname;
  const method = request.method ?? 'GET';
  const scenario = requestUrl.searchParams.get('scenario') ?? 'success';

  if (path === '/v1/auth/verify' && method === 'POST') {
    await wait(120);
    if (scenario === 'error') { sendJson(response, 503, apiError('DEPENDENCY_UNAVAILABLE', 'Personnel verification временно недоступна.')); return true; }
    if (scenario === 'forbidden') { sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Аккаунт заблокирован или неактивен.')); return true; }
    const payload = await readJson<AuthVerifyRequest>(request).catch(() => null);
    if (!payload?.personnel_number?.trim() || !payload?.phone?.trim()) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Заполните табельный номер и телефон.')); return true; }
    if (scenario === 'empty' || payload.personnel_number !== DEMO_PERSONNEL_NUMBER || payload.phone !== DEMO_PHONE) { sendJson(response, 401, apiError('AUTH_REQUIRED', 'Сотрудник с такой парой идентификаторов не найден.')); return true; }
    sendJson(response, 200, {
      access_token: 'prototype-access-token-stage9',
      token_type: 'Bearer',
      expires_at: '2026-09-01T18:00:00.000Z',
      user: meResponse.user,
      onboarding_required: !onboardingCompleted,
      goal_setup_required: !goalSetupSubmitted,
    });
    return true;
  }

  if (path === '/v1/me/onboarding' && method === 'GET') {
    await wait(100);
    if (scenario === 'error') { sendJson(response, 500, apiError('INTERNAL_ERROR', 'Не удалось загрузить onboarding.')); return true; }
    if (scenario === 'forbidden') { sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Onboarding недоступен для текущего mock scope.')); return true; }
    sendJson(response, 200, { required: !onboardingCompleted, completed: onboardingCompleted, content_version: ONBOARDING_CONTENT_VERSION, completed_at: onboardingCompleted ? '2026-09-01T08:15:00.000Z' : null });
    return true;
  }

  if (path === '/v1/me/onboarding/complete' && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<OnboardingCompleteRequest>(request).catch(() => null);
    if (!payload || payload.content_version !== ONBOARDING_CONTENT_VERSION) { sendJson(response, 409, apiError('CONFLICT', 'Версия onboarding изменилась.')); return true; }
    onboardingCompleted = true;
    sendJson(response, 200, { required: false, completed: true, content_version: ONBOARDING_CONTENT_VERSION, completed_at: '2026-09-01T08:15:00.000Z' });
    return true;
  }

  if (path === '/v1/goals/setup' && method === 'GET') {
    await wait(120);
    if (scenario === 'error') { sendJson(response, 503, apiError('DEPENDENCY_UNAVAILABLE', 'Генерация Monthly Goals временно недоступна.')); return true; }
    if (scenario === 'forbidden') { sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Goal setup недоступен для текущего mock scope.')); return true; }
    if (scenario === 'empty') { sendJson(response, 200, { cycle_id: GOAL_SETUP_CYCLE_ID, status: 'pending', options: [] }); return true; }
    sendJson(response, 200, { cycle_id: GOAL_SETUP_CYCLE_ID, status: goalSetupSubmitted ? 'submitted' : 'ready', options: goalSetupSubmitted ? [] : goalSetupOptions });
    return true;
  }

  if (path === '/v1/goals/setup' && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<GoalSetupSubmitRequest>(request).catch(() => null);
    if (!payload || payload.cycle_id !== GOAL_SETUP_CYCLE_ID || !Array.isArray(payload.selected_option_ids) || payload.selected_option_ids.length !== 2 || new Set(payload.selected_option_ids).size !== 2) {
      sendJson(response, 400, apiError('VALIDATION_ERROR', 'Нужно выбрать ровно два разных текущих варианта.')); return true;
    }
    const selected = payload.selected_option_ids.map((id) => goalSetupOptions.find((option) => option.option_id === id)).filter(Boolean);
    if (selected.length !== 2) { sendJson(response, 404, apiError('NOT_FOUND', 'Один из вариантов цели не найден.')); return true; }
    const systemOption = goalSetupOptions.find((option) => !payload.selected_option_ids.includes(option.option_id))!;
    goalSetupSubmitted = true;
    sendJson(response, 200, {
      cycle_id: GOAL_SETUP_CYCLE_ID,
      year: 2026,
      month: 9,
      status: 'active',
      goals: [
        ...selected.map((option, index) => ({ goal_id: `64200000-0000-4000-8000-00000000000${index + 1}`, display_text: option!.display_text, current_value: 0, target_value: option!.target_value, completed: false, source: 'employee_choice' })),
        { goal_id: '64200000-0000-4000-8000-000000000003', display_text: systemOption.display_text, current_value: 0, target_value: systemOption.target_value, completed: false, source: 'system_assigned' },
      ],
      closed_at: null,
    });
    return true;
  }

  return false;
}

async function handleStage6(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  const path = requestUrl.pathname;
  const method = request.method ?? 'GET';
  const scenario = readScenario(requestUrl);

  const get = method === 'GET';
  if (get && [
    '/v1/history/tasks', '/v1/history/events', '/v1/goals/current', '/v1/goals/history',
    '/v1/ratings/employees', '/v1/ratings/directorates', '/v1/analytics/company', '/v1/me',
    '/v1/me/dashboard', '/v1/me/achievements', '/v1/scoring-info', '/v1/notifications',
  ].includes(path)) {
    await wait(90);
    if (stage6ReadError(requestUrl, response)) return true;
  }

  if (get && path === '/v1/history/tasks') {
    const search = (requestUrl.searchParams.get('search') ?? '').trim().toLowerCase();
    const complexities = requestUrl.searchParams.getAll('complexity');
    const items = scenario === 'empty' ? [] : stage6Tasks.filter((item) => !deletedTaskIds.has(item.task_id) && (!search || (item.normalized_description ?? '').toLowerCase().includes(search)) && (!complexities.length || (item.complexity_level !== null && complexities.includes(item.complexity_level))));
    sendJson(response, 200, { items, next_cursor: null }); return true;
  }
  if (get && path === '/v1/history/events') {
    sendJson(response, 200, { items: scenario === 'empty' ? [] : stage6HistoryEvents, next_cursor: null }); return true;
  }
  if (get && path === '/v1/goals/current') {
    sendJson(response, 200, scenario === 'empty' ? { ...currentGoalCycle, goals: [] } : currentGoalCycle); return true;
  }
  if (get && path === '/v1/goals/history') {
    sendJson(response, 200, { items: scenario === 'empty' ? [] : [previousGoalCycle], next_cursor: null }); return true;
  }
  if (get && path === '/v1/ratings/employees') {
    const search = (requestUrl.searchParams.get('search') ?? '').trim().toLowerCase();
    const directorateId = requestUrl.searchParams.get('directorate_id') ?? '';
    const items = scenario === 'empty' ? [] : employeeLeaderboard.filter((item) => (!search || item.full_name.toLowerCase().includes(search)) && (!directorateId || item.directorate_id === directorateId));
    sendJson(response, 200, { items, own_rank: scenario === 'empty' ? null : 18, next_cursor: null }); return true;
  }
  if (get && path === '/v1/ratings/directorates') {
    const sort = requestUrl.searchParams.get('sort') ?? 'rank:asc';
    const items = [...directorateLeaderboard];
    if (sort === 'average_score:desc') items.sort((a, b) => b.average_score - a.average_score);
    else if (sort === 'total_score:desc') items.sort((a, b) => b.total_score - a.total_score);
    else if (sort === 'name:asc') items.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    else items.sort((a, b) => a.rank - b.rank);
    sendJson(response, 200, { items: scenario === 'empty' ? [] : items, next_cursor: null }); return true;
  }
  if (get && path === '/v1/analytics/company') {
    const periodFrom = requestUrl.searchParams.get('period_from') ?? companyAnalytics.period_from;
    const periodTo = requestUrl.searchParams.get('period_to') ?? companyAnalytics.period_to;
    const analytics = { ...companyAnalytics, period_from: periodFrom, period_to: periodTo };
    sendJson(response, 200, scenario === 'empty' ? { ...analytics, task_count: 0, active_employee_count: 0, complexity_distribution: [], top_tools: [], top_categories: [] } : analytics); return true;
  }
  if (get && path === '/v1/me') {
    sendJson(response, 200, { ...meResponse, privacy_level: currentPrivacy }); return true;
  }
  if (get && path === '/v1/me/dashboard') {
    sendJson(response, 200, scenario === 'empty' ? { ...personalDashboard, task_count: 0, active_days: 0, current_goals: [] } : { ...personalDashboard, pet: { ...personalDashboard.pet, in_vacation: vacationState.enabled } }); return true;
  }
  if (get && path === '/v1/me/achievements') {
    sendJson(response, 200, { items: scenario === 'empty' ? [] : achievements, next_cursor: null }); return true;
  }
  if (get && path === '/v1/scoring-info') {
    sendJson(response, 200, scoringInfo); return true;
  }
  if (get && path === '/v1/notifications') {
    const items = scenario === 'empty' ? [] : notifications.map((item) => readNotificationIds.has(item.notification_id) ? { ...item, read_at: item.read_at ?? '2026-09-01T07:00:00.000Z' } : item);
    sendJson(response, 200, { items, next_cursor: null }); return true;
  }

  const directorateMatch = path.match(/^\/v1\/directorates\/([^/]+)$/);
  if (get && directorateMatch) {
    await wait(90); if (stage6ReadError(requestUrl, response)) return true;
    const directorate = directorateLeaderboard.find((item) => item.directorate_id === directorateMatch[1]);
    if (!directorate) { sendJson(response, 404, apiError('NOT_FOUND', 'Дирекция не найдена.')); return true; }
    const employees = scenario === 'empty' ? [] : employeeLeaderboard.filter((item) => item.directorate_id === directorate.directorate_id);
    sendJson(response, 200, { directorate, employees }); return true;
  }

  const profileMatch = path.match(/^\/v1\/profiles\/([^/]+)$/);
  if (get && profileMatch) {
    await wait(90); if (stage6ReadError(requestUrl, response)) return true;
    const profile = publicProfiles[profileMatch[1]];
    if (!profile) { sendJson(response, 404, apiError('NOT_FOUND', 'Публичный профиль не найден.')); return true; }
    sendJson(response, 200, scenario === 'empty' ? { ...profile, task_count: null, current_streak: null, complexity_distribution: [], tools: [], open_cases: [] } : profile); return true;
  }

  const taskVersionsMatch = path.match(/^\/v1\/tasks\/([^/]+)\/versions$/);
  if (get && taskVersionsMatch) {
    await wait(90); if (stage6ReadError(requestUrl, response)) return true;
    const task = stage6Tasks.find((item) => item.task_id === taskVersionsMatch[1]);
    if (!task || deletedTaskIds.has(task.task_id)) { sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.')); return true; }
    const items = task.task_id === stage6TaskDetail.task.task_id ? stage6TaskVersions : [{
      task_version_id: `${task.task_id.slice(0, -3)}901`, version_no: 1,
      raw_input: `Демонстрационное исходное описание: ${task.normalized_description ?? 'AI-кейс'}`,
      input_channel: 'text', normalized_description: task.normalized_description,
      complexity_level: task.complexity_level, score: task.score, plausibility_status: 'valid',
      created_at: task.registered_at, finalized_at: task.registered_at,
    }];
    sendJson(response, 200, { items: scenario === 'empty' ? [] : items, next_cursor: null }); return true;
  }
  const taskDetailMatch = path.match(/^\/v1\/tasks\/([^/]+)$/);
  if (get && taskDetailMatch) {
    await wait(90); if (stage6ReadError(requestUrl, response)) return true;
    const task = stage6Tasks.find((item) => item.task_id === taskDetailMatch[1]);
    if (!task || deletedTaskIds.has(task.task_id)) { sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.')); return true; }
    if (task.task_id === stage6TaskDetail.task.task_id) { sendJson(response, 200, stage6TaskDetail); return true; }
    sendJson(response, 200, {
      task,
      current_version: {
        task_version_id: `${task.task_id.slice(0, -3)}901`, version_no: 1,
        raw_input: `Демонстрационное исходное описание: ${task.normalized_description ?? 'AI-кейс'}`,
        input_channel: 'text', normalized_description: task.normalized_description,
        complexity_level: task.complexity_level, score: task.score, plausibility_status: 'valid',
        created_at: task.registered_at, finalized_at: task.registered_at,
      },
      links: [], tags: [], directorate_id_at_task_time: meResponse.user.directorate_id,
    }); return true;
  }

  const taskMutationMatch = path.match(/^\/v1\/tasks\/([^/]+)$/);
  if (method === 'PATCH' && taskMutationMatch) {
    const task = stage6Tasks.find((item) => item.task_id === taskMutationMatch[1]);
    if (!task || deletedTaskIds.has(task.task_id)) { sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.')); return true; }
    const idempotencyKey = getHeader(request, 'Idempotency-Key');
    if (!idempotencyKey) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для редактирования требуется Idempotency-Key.')); return true; }
    const existing = acceptedByIdempotency.get(idempotencyKey);
    if (existing) { sendJson(response, 202, existing); return true; }

    let payload: TaskEditRequest;
    try {
      payload = taskEditRequestSchema.parse(await readJson<unknown>(request));
    } catch {
      sendJson(response, 400, apiError('VALIDATION_ERROR', 'Проверьте исходное описание и номер текущей версии.')); return true;
    }
    const currentVersionNo = task.task_id === stage6TaskDetail.task.task_id ? stage6TaskDetail.current_version.version_no : 1;
    if (payload.expected_version_no !== currentVersionNo) {
      sendJson(response, 409, apiError('CONFLICT', 'Текущая версия изменилась. Обновите AI-кейс перед повторным сохранением.')); return true;
    }

    const identity = {
      taskId: task.task_id,
      taskVersionId: '80000000-0000-4000-8000-000000000001',
      versionNo: currentVersionNo + 1,
      processingRunId: '80000000-0000-4000-8000-000000000002',
    };
    activeTask = {
      request: payload,
      idempotencyKey,
      ...identity,
      targetClarifications: safeClarificationTarget(getHeader(request, 'X-Prototype-Clarifications')),
      answeredClarifications: 0,
      resultLevel: (task.complexity_level ?? 'C2') as ComplexityLevel,
      scenario: parseScenario(getHeader(request, 'X-Prototype-AI-Scenario')),
      processingRetryCount: 0,
      resultNormalizedDescription: task.normalized_description ?? payload.raw_input,
      resultToolName: task.tools[0]?.name ?? 'ChatGPT',
      resultEvolutionXpAwarded: 0,
      resultGoalProgressDelta: 0,
    };
    const accepted = acceptedResponse('accepted', identity);
    acceptedByIdempotency.set(idempotencyKey, accepted);
    sendJson(response, 202, accepted); return true;
  }
  if (method === 'DELETE' && taskMutationMatch) {
    const task = stage6Tasks.find((item) => item.task_id === taskMutationMatch[1]);
    if (!task) { sendJson(response, 404, apiError('NOT_FOUND', 'AI-кейс не найден.')); return true; }
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для soft delete требуется Idempotency-Key.')); return true; }
    deletedTaskIds.add(task.task_id);
    response.statusCode = 204; response.setHeader('X-Prototype-Mock', 'true'); response.end(); return true;
  }

  if (method === 'PATCH' && path === '/v1/me/privacy') {
    const payload = await readJson<{ privacy_level?: string }>(request).catch(() => ({}));
    if (payload.privacy_level !== 'closed' && payload.privacy_level !== 'standard' && payload.privacy_level !== 'open') {
      sendJson(response, 400, apiError('VALIDATION_ERROR', 'Недопустимый privacy_level.')); return true;
    }
    currentPrivacy = payload.privacy_level;
    sendJson(response, 200, { privacy_level: currentPrivacy }); return true;
  }
  if (method === 'PUT' && path === '/v1/me/vacation') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Для отпуска требуется Idempotency-Key.')); return true; }
    const payload = await readJson<{ enabled?: unknown }>(request).catch(() => ({}));
    if (typeof payload.enabled !== 'boolean') { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Поле enabled обязательно.')); return true; }
    vacationState = { enabled: payload.enabled, started_at: payload.enabled ? '2026-09-01T07:10:00.000Z' : null };
    sendJson(response, 200, vacationState); return true;
  }
  const notificationReadMatch = path.match(/^\/v1\/notifications\/([^/]+)\/read$/);
  if (method === 'POST' && notificationReadMatch) {
    readNotificationIds.add(notificationReadMatch[1]); response.statusCode = 204; response.end(); return true;
  }

  return false;
}


function stage7Role(request: IncomingMessage): string {
  return getHeader(request, 'X-Prototype-Role') ?? '';
}

function stage7Authorize(request: IncomingMessage, response: ServerResponse, allowed: readonly string[]): boolean {
  const role = stage7Role(request);
  if (!allowed.includes(role)) {
    sendJson(response, 403, apiError('FORBIDDEN', 'Контролируемый Stage-7 RBAC denial.'));
    return false;
  }
  return true;
}

function stage7ReadError(requestUrl: URL, response: ServerResponse): boolean {
  const scenario = readScenario(requestUrl);
  if (scenario === 'forbidden') {
    sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Контролируемое Stage-7 forbidden-состояние.'));
    return true;
  }
  if (scenario === 'error') {
    sendJson(response, 500, apiError('INTERNAL_ERROR', 'Контролируемая ошибка Stage-7 mock API.'));
    return true;
  }
  return false;
}

function page<T>(items: readonly T[]) { return { items, next_cursor: null }; }

async function handleStage7(request: IncomingMessage, requestUrl: URL, response: ServerResponse): Promise<boolean> {
  const path = requestUrl.pathname;
  const method = request.method ?? 'GET';
  const scenario = readScenario(requestUrl);

  if (path === '/v1/director/dashboard' && method === 'GET') {
    if (!stage7Authorize(request, response, ['Director'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    sendJson(response, 200, scenario === 'empty' ? { ...directorDashboard, authorized_headcount: 0, total_score: 0, average_score: 0, rank: null, task_count: 0, employees: [] } : directorDashboard); return true;
  }
  if (path === '/v1/director/employees' && method === 'GET') {
    if (!stage7Authorize(request, response, ['Director'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    const search = (requestUrl.searchParams.get('search') ?? '').toLowerCase();
    const items = mutableAdminEmployees.filter((item) => item.directorate_id === directorDashboard.directorate_id && (!search || item.full_name.toLowerCase().includes(search) || item.personnel_number.toLowerCase().includes(search)));
    sendJson(response, 200, page(scenario === 'empty' ? [] : items)); return true;
  }
  const directorEmployeeMatch = path.match(/^\/v1\/director\/employees\/([^/]+)$/);
  if (directorEmployeeMatch && method === 'GET') {
    if (!stage7Authorize(request, response, ['Director'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    const target = mutableAdminEmployees.find((item) => item.employee_id === directorEmployeeMatch[1]);
    if (!target) { sendJson(response, 404, apiError('NOT_FOUND', 'Сотрудник не найден.')); return true; }
    if (target.directorate_id !== directorDashboard.directorate_id) { sendJson(response, 403, apiError('OBJECT_SCOPE_FORBIDDEN', 'Director может открыть только сотрудника своей дирекции.')); return true; }
    sendJson(response, 200, scenario === 'empty' ? { ...managementEmployeeDashboard(0), task_count: 0, active_days: 0, current_goals: [] } : managementEmployeeDashboard(0)); return true;
  }

  if (path === '/v1/executive/dashboard' && method === 'GET') {
    if (!stage7Authorize(request, response, ['Executive'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    sendJson(response, 200, scenario === 'empty' ? { ...executiveDashboard, authorized_headcount: 0, task_count: 0, average_score_per_employee: 0, directorates: [] } : executiveDashboard); return true;
  }
  const executiveDirectorateMatch = path.match(/^\/v1\/executive\/directorates\/([^/]+)$/);
  if (executiveDirectorateMatch && method === 'GET') {
    if (!stage7Authorize(request, response, ['Executive'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    const d = directorateLeaderboard.find((item) => item.directorate_id === executiveDirectorateMatch[1]);
    if (!d) { sendJson(response, 404, apiError('NOT_FOUND', 'Дирекция не найдена.')); return true; }
    const employees = employeeLeaderboard.filter((item) => item.directorate_id === d.directorate_id);
    const result = { directorate_id: d.directorate_id, authorized_headcount: d.authorized_headcount, total_score: d.total_score, average_score: d.average_score, rank: d.rank, task_count: Math.max(employees.length * 28, 0), employees };
    sendJson(response, 200, scenario === 'empty' ? { ...result, authorized_headcount: 0, total_score: 0, average_score: 0, rank: null, task_count: 0, employees: [] } : result); return true;
  }
  const executiveEmployeeMatch = path.match(/^\/v1\/executive\/employees\/([^/]+)$/);
  if (executiveEmployeeMatch && method === 'GET') {
    if (!stage7Authorize(request, response, ['Executive'])) return true;
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    const known = mutableAdminEmployees.find((item) => item.employee_id === executiveEmployeeMatch[1]) || employeeLeaderboard.find((item) => item.employee_id === executiveEmployeeMatch[1]);
    if (!known) { sendJson(response, 404, apiError('NOT_FOUND', 'Сотрудник не найден.')); return true; }
    sendJson(response, 200, scenario === 'empty' ? { ...managementEmployeeDashboard(1), task_count: 0, active_days: 0, current_goals: [] } : managementEmployeeDashboard(1)); return true;
  }

  if (path.startsWith('/v1/admin/')) {
    if (!stage7Authorize(request, response, ['Admin'])) return true;
  }

  if (path === '/v1/admin/employees' && method === 'GET') {
    await wait(95); if (stage7ReadError(requestUrl, response)) return true;
    const search = (requestUrl.searchParams.get('search') ?? '').toLowerCase();
    const directorateId = requestUrl.searchParams.get('directorate_id') ?? '';
    const role = requestUrl.searchParams.get('role') ?? '';
    const accountStatus = requestUrl.searchParams.get('account_status') ?? '';
    const items = mutableAdminEmployees.filter((item) => (!search || item.full_name.toLowerCase().includes(search) || item.personnel_number.toLowerCase().includes(search)) && (!directorateId || item.directorate_id === directorateId) && (!role || item.role === role) && (!accountStatus || item.account_status === accountStatus));
    sendJson(response, 200, page(scenario === 'empty' ? [] : items)); return true;
  }
  const adminEmployeeMatch = path.match(/^\/v1\/admin\/employees\/([^/]+)$/);
  if (adminEmployeeMatch && method === 'PATCH') {
    const index = mutableAdminEmployees.findIndex((item) => item.employee_id === adminEmployeeMatch[1]);
    if (index < 0) { sendJson(response, 404, apiError('NOT_FOUND', 'Сотрудник не найден.')); return true; }
    const payload = await readJson<Record<string, unknown>>(request).catch(() => ({}));
    const allowed = new Set(['full_name','phone','directorate_id','role','account_status','profile_hidden']);
    const keys = Object.keys(payload);
    if (!keys.length || keys.some((key) => !allowed.has(key)) || 'score' in payload || 'complexity_level' in payload) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'AdminEmployeePatch не допускает Score/Complexity override.')); return true; }
    const current = mutableAdminEmployees[index]!;
    mutableAdminEmployees[index] = { ...current, ...payload } as AdminEmployee;
    sendJson(response, 200, mutableAdminEmployees[index]); return true;
  }

  if (path === '/v1/admin/directorates' && method === 'GET') {
    await wait(90); if (stage7ReadError(requestUrl, response)) return true;
    sendJson(response, 200, page(scenario === 'empty' ? [] : mutableDirectorates)); return true;
  }
  if (path === '/v1/admin/directorates' && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<{ name?: unknown }>(request).catch(() => ({}));
    if (typeof payload.name !== 'string' || !payload.name.trim()) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Название дирекции обязательно.')); return true; }
    if (mutableDirectorates.some((item) => item.name.toLowerCase() === payload.name!.trim().toLowerCase())) { sendJson(response, 409, apiError('CONFLICT', 'Дирекция с таким названием уже существует.')); return true; }
    const created: Directorate = { directorate_id: `75000000-0000-4000-8000-${String(mutableDirectorates.length + 1).padStart(12,'0')}`, name: payload.name.trim(), director_employee_id: null, active: true };
    mutableDirectorates = [...mutableDirectorates, created]; sendJson(response, 201, created); return true;
  }
  const adminDirectorateMatch = path.match(/^\/v1\/admin\/directorates\/([^/]+)$/);
  if (adminDirectorateMatch && method === 'PATCH') {
    const index = mutableDirectorates.findIndex((item) => item.directorate_id === adminDirectorateMatch[1]);
    if (index < 0) { sendJson(response, 404, apiError('NOT_FOUND', 'Дирекция не найдена.')); return true; }
    const payload = await readJson<Record<string, unknown>>(request).catch(() => ({}));
    if (!Object.keys(payload).length) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Нужно изменить хотя бы одно поле.')); return true; }
    mutableDirectorates[index] = { ...mutableDirectorates[index]!, ...payload } as Directorate; sendJson(response, 200, mutableDirectorates[index]); return true;
  }

  if (path === '/v1/admin/calendar' && method === 'GET') {
    await wait(90); if (stage7ReadError(requestUrl, response)) return true;
    sendJson(response, 200, { items: scenario === 'empty' ? [] : mutableCalendarDays }); return true;
  }
  const calendarMatch = path.match(/^\/v1\/admin\/calendar\/(\d{4}-\d{2}-\d{2})$/);
  if (calendarMatch && method === 'PUT') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<{ is_working_day?: unknown; reason?: unknown }>(request).catch(() => ({}));
    if (typeof payload.is_working_day !== 'boolean' || typeof payload.reason !== 'string' || !payload.reason.trim()) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'is_working_day и reason обязательны.')); return true; }
    const updated: CalendarDay = { date: calendarMatch[1]!, is_working_day: payload.is_working_day, reason: payload.reason.trim() };
    const index = mutableCalendarDays.findIndex((item) => item.date === updated.date);
    if (index >= 0) mutableCalendarDays[index] = updated; else mutableCalendarDays = [...mutableCalendarDays, updated];
    sendJson(response, 200, updated); return true;
  }

  if (path === '/v1/admin/taxonomy/versions' && method === 'GET') {
    await wait(90); if (stage7ReadError(requestUrl, response)) return true;
    sendJson(response, 200, { items: scenario === 'empty' ? [] : mutableTaxonomyVersions }); return true;
  }
  if (path === '/v1/admin/taxonomy/versions' && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<{ version_code?: unknown }>(request).catch(() => ({}));
    if (typeof payload.version_code !== 'string' || !payload.version_code.trim()) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'version_code обязателен.')); return true; }
    if (mutableTaxonomyVersions.some((v) => v.version_code === payload.version_code)) { sendJson(response, 409, apiError('CONFLICT', 'Такая taxonomy version уже существует.')); return true; }
    const created: TaxonomyVersion = { taxonomy_version_id: `76000000-0000-4000-8000-${String(mutableTaxonomyVersions.length + 1).padStart(12,'0')}`, version_code: payload.version_code.trim(), status: 'draft', categories: [], subcategories: [] };
    mutableTaxonomyVersions = [...mutableTaxonomyVersions, created]; sendJson(response, 201, created); return true;
  }
  const taxonomyVersionMatch = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)$/);
  if (taxonomyVersionMatch && method === 'GET') {
    await wait(80); if (stage7ReadError(requestUrl, response)) return true;
    const version = mutableTaxonomyVersions.find((v) => v.taxonomy_version_id === taxonomyVersionMatch[1]); if (!version) { sendJson(response, 404, apiError('NOT_FOUND', 'Taxonomy version не найдена.')); return true; } sendJson(response, 200, version); return true;
  }
  const taxonomyActivateMatch = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)\/activate$/);
  if (taxonomyActivateMatch && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const index = mutableTaxonomyVersions.findIndex((v) => v.taxonomy_version_id === taxonomyActivateMatch[1]); if (index < 0) { sendJson(response, 404, apiError('NOT_FOUND', 'Taxonomy version не найдена.')); return true; }
    mutableTaxonomyVersions = mutableTaxonomyVersions.map((v, i) => ({ ...v, status: i === index ? 'active' : v.status === 'active' ? 'retired' : v.status })); sendJson(response, 200, mutableTaxonomyVersions[index]); return true;
  }
  const taxonomyCategoryCollection = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)\/categories$/);
  if (taxonomyCategoryCollection && method === 'POST') {
    if (!getHeader(request, 'Idempotency-Key')) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Idempotency-Key обязателен.')); return true; }
    const payload = await readJson<{ name?: unknown }>(request).catch(() => ({})); const index = mutableTaxonomyVersions.findIndex((v) => v.taxonomy_version_id === taxonomyCategoryCollection[1]);
    if (index < 0) { sendJson(response, 404, apiError('NOT_FOUND', 'Taxonomy version не найдена.')); return true; } if (typeof payload.name !== 'string' || !payload.name.trim()) { sendJson(response, 400, apiError('VALIDATION_ERROR', 'Название категории обязательно.')); return true; }
    const version = mutableTaxonomyVersions[index]!; const created = { category_id: `76100000-0000-4000-8000-${String(version.categories.length + 1).padStart(12,'0')}`, name: payload.name.trim(), active: true }; mutableTaxonomyVersions[index] = { ...version, categories: [...version.categories, created] }; sendJson(response, 201, created); return true;
  }
  const taxonomyCategoryMatch = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)\/categories\/([^/]+)$/);
  if (taxonomyCategoryMatch && method === 'PATCH') {
    const index = mutableTaxonomyVersions.findIndex((v) => v.taxonomy_version_id === taxonomyCategoryMatch[1]); if (index < 0) { sendJson(response, 404, apiError('NOT_FOUND', 'Taxonomy version не найдена.')); return true; } const payload = await readJson<Record<string,unknown>>(request).catch(() => ({})); const version=mutableTaxonomyVersions[index]!; const catIndex=version.categories.findIndex((c)=>c.category_id===taxonomyCategoryMatch[2]); if(catIndex<0){sendJson(response,404,apiError('NOT_FOUND','Категория не найдена.'));return true;} const categories=[...version.categories]; categories[catIndex]={...categories[catIndex]!,...payload}; mutableTaxonomyVersions[index]={...version,categories}; sendJson(response,200,categories[catIndex]); return true;
  }
  const taxonomySubcategoryCollection = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)\/subcategories$/);
  if (taxonomySubcategoryCollection && method === 'POST') {
    if (!getHeader(request,'Idempotency-Key')){sendJson(response,400,apiError('VALIDATION_ERROR','Idempotency-Key обязателен.'));return true;} const payload=await readJson<{category_id?:unknown;name?:unknown}>(request).catch(()=>({})); const index=mutableTaxonomyVersions.findIndex((v)=>v.taxonomy_version_id===taxonomySubcategoryCollection[1]); if(index<0){sendJson(response,404,apiError('NOT_FOUND','Taxonomy version не найдена.'));return true;} if(typeof payload.category_id!=='string'||typeof payload.name!=='string'||!payload.name.trim()){sendJson(response,400,apiError('VALIDATION_ERROR','category_id и name обязательны.'));return true;} const version=mutableTaxonomyVersions[index]!; if(!version.categories.some((c)=>c.category_id===payload.category_id)){sendJson(response,409,apiError('CONFLICT','Родительская категория не найдена.'));return true;} const created={subcategory_id:`76200000-0000-4000-8000-${String(version.subcategories.length+1).padStart(12,'0')}`,category_id:payload.category_id,name:payload.name.trim(),active:true}; mutableTaxonomyVersions[index]={...version,subcategories:[...version.subcategories,created]}; sendJson(response,201,created);return true;
  }
  const taxonomySubcategoryMatch = path.match(/^\/v1\/admin\/taxonomy\/versions\/([^/]+)\/subcategories\/([^/]+)$/);
  if (taxonomySubcategoryMatch && method === 'PATCH') {
    const index=mutableTaxonomyVersions.findIndex((v)=>v.taxonomy_version_id===taxonomySubcategoryMatch[1]); if(index<0){sendJson(response,404,apiError('NOT_FOUND','Taxonomy version не найдена.'));return true;} const payload=await readJson<Record<string,unknown>>(request).catch(()=>({})); const version=mutableTaxonomyVersions[index]!; const subIndex=version.subcategories.findIndex((x)=>x.subcategory_id===taxonomySubcategoryMatch[2]); if(subIndex<0){sendJson(response,404,apiError('NOT_FOUND','Подкатегория не найдена.'));return true;} const subcategories=[...version.subcategories]; subcategories[subIndex]={...subcategories[subIndex]!,...payload}; mutableTaxonomyVersions[index]={...version,subcategories}; sendJson(response,200,subcategories[subIndex]);return true;
  }

  if (path === '/v1/admin/tools' && method === 'GET') {
    await wait(90); if (stage7ReadError(requestUrl, response)) return true; const search=(requestUrl.searchParams.get('search')??'').toLowerCase(); const active=requestUrl.searchParams.get('active'); let items=mutableTools.filter((t)=>!search||t.tool_name.toLowerCase().includes(search)||t.aliases.some((a)=>a.toLowerCase().includes(search))); if(active==='true')items=items.filter((t)=>t.active); if(active==='false')items=items.filter((t)=>!t.active); sendJson(response,200,page(scenario==='empty'?[]:items));return true;
  }
  if (path === '/v1/admin/tools' && method === 'POST') {
    if(!getHeader(request,'Idempotency-Key')){sendJson(response,400,apiError('VALIDATION_ERROR','Idempotency-Key обязателен.'));return true;} const payload=await readJson<Record<string,unknown>>(request).catch(()=>({})); if(typeof payload.tool_name!=='string'||!payload.tool_name.trim()){sendJson(response,400,apiError('VALIDATION_ERROR','tool_name обязателен.'));return true;} if(mutableTools.some((t)=>t.tool_name.toLowerCase()===String(payload.tool_name).toLowerCase())){sendJson(response,409,apiError('CONFLICT','AI tool уже существует.'));return true;} const created:Tool={tool_id:`77000000-0000-4000-8000-${String(mutableTools.length+1).padStart(12,'0')}`,tool_name:payload.tool_name.trim(),provider:typeof payload.provider==='string'?payload.provider:null,tool_type:typeof payload.tool_type==='string'?payload.tool_type:null,aliases:Array.isArray(payload.aliases)?payload.aliases.filter((x):x is string=>typeof x==='string'):[],active:true}; mutableTools=[...mutableTools,created];sendJson(response,201,created);return true;
  }
  const toolMatch=path.match(/^\/v1\/admin\/tools\/([^/]+)$/);
  if(toolMatch&&method==='PATCH'){const index=mutableTools.findIndex((t)=>t.tool_id===toolMatch[1]);if(index<0){sendJson(response,404,apiError('NOT_FOUND','AI tool не найден.'));return true;} const payload=await readJson<Record<string,unknown>>(request).catch(()=>({}));if(!Object.keys(payload).length){sendJson(response,400,apiError('VALIDATION_ERROR','Нужно изменить хотя бы одно поле.'));return true;} mutableTools[index]={...mutableTools[index]!,...payload} as Tool;sendJson(response,200,mutableTools[index]);return true;}
  if(path==='/v1/admin/unrecognized-tools'&&method==='GET'){await wait(90);if(stage7ReadError(requestUrl,response))return true;sendJson(response,200,page(scenario==='empty'?[]:unrecognizedTools));return true;}

  if(path==='/v1/admin/audit'&&method==='GET'){await wait(90);if(stage7ReadError(requestUrl,response))return true;sendJson(response,200,page(scenario==='empty'?[]:auditEvents));return true;}
  const traceMatch=path.match(/^\/v1\/admin\/tasks\/([^/]+)\/scoring-trace$/);
  if(traceMatch&&method==='GET'){await wait(90);if(stage7ReadError(requestUrl,response))return true;if(traceMatch[1]!==scoringTrace.task_id){sendJson(response,404,apiError('NOT_FOUND','Technical trace не найден.'));return true;}sendJson(response,200,scoringTrace);return true;}

  if(path==='/v1/exports'&&method==='POST'){
    if(!stage7Authorize(request,response,['Director','Executive','Admin']))return true; if(!getHeader(request,'Idempotency-Key')){sendJson(response,400,apiError('VALIDATION_ERROR','Idempotency-Key обязателен.'));return true;} const payload=await readJson<ExportCreateRequest>(request).catch(()=>null); if(!payload||!['task_current','task_audit','aggregate'].includes(payload.export_type)||!['csv','xlsx'].includes(payload.format)||!['directorate','company'].includes(payload.scope_type)){sendJson(response,400,apiError('VALIDATION_ERROR','Некорректный ExportCreateRequest.'));return true;} const role=stage7Role(request); if(role==='Director'&&payload.scope_type!=='directorate'){sendJson(response,403,apiError('OBJECT_SCOPE_FORBIDDEN','Director может экспортировать только свою дирекцию.'));return true;} exportCounter+=1; const exportId=`78000000-0000-4000-8000-${String(exportCounter).padStart(12,'0')}`; exportJobs.set(exportId,{request:payload,role,polls:0,createdAt:'2026-09-01T08:00:00.000Z'});sendJson(response,202,{export_id:exportId,status:'pending'});return true;
  }
  const exportStatusMatch=path.match(/^\/v1\/exports\/([^/]+)$/);
  if(exportStatusMatch&&method==='GET'){if(!stage7Authorize(request,response,['Director','Executive','Admin']))return true;await wait(100);if(stage7ReadError(requestUrl,response))return true;const job=exportJobs.get(exportStatusMatch[1]);if(!job){sendJson(response,404,apiError('NOT_FOUND','Экспорт не найден.'));return true;}if(job.role!==stage7Role(request)){sendJson(response,403,apiError('OBJECT_SCOPE_FORBIDDEN','Экспорт принадлежит другому role-scoped mock context.'));return true;}job.polls+=1;const failed=scenario==='error';const completed=!failed&&job.polls>=1;sendJson(response,200,{export_id:exportStatusMatch[1],status:failed?'failed':completed?'completed':'running',format:job.request.format,created_at:job.createdAt,completed_at:completed?'2026-09-01T08:00:03.000Z':null,file_size_bytes:completed?2480:null,sha256:completed?'4d1f44a66f5b2ad0e3c68e6f0b4e0b9b0a3d2aa47d7c14231711fbe43ed56c01':null,failure_code:failed?'DEMO_EXPORT_FAILED':null});return true;}
  const exportDownloadMatch=path.match(/^\/v1\/exports\/([^/]+)\/download$/);
  if(exportDownloadMatch&&method==='GET'){if(!stage7Authorize(request,response,['Director','Executive','Admin']))return true;const job=exportJobs.get(exportDownloadMatch[1]);if(!job){sendJson(response,404,apiError('NOT_FOUND','Экспорт не найден.'));return true;}if(job.role!==stage7Role(request)){sendJson(response,403,apiError('OBJECT_SCOPE_FORBIDDEN','Экспорт принадлежит другому scope.'));return true;} const csv='scope_type,export_type,format,prototype\n'+`${job.request.scope_type},${job.request.export_type},${job.request.format},true\n`;sendText(response,200,csv,'text/csv; charset=utf-8');return true;}

  return false;
}

async function handleMockRequest(request: IncomingMessage, response: ServerResponse): Promise<boolean> {
  const requestUrl = new URL(request.url ?? '/', 'http://prototype.local');
  if (await handleHealth(requestUrl, response)) return true;
  if (await handleHome(requestUrl, response)) return true;
  if (await handleTranscription(request, requestUrl, response)) return true;
  if (await handleCreateTask(request, requestUrl, response)) return true;
  if (await handleProcessing(request, requestUrl, response)) return true;
  if (await handleClarificationAnswer(request, requestUrl, response)) return true;
  if (await handleResult(request, requestUrl, response)) return true;
  if (await handleEntryFlow(request, requestUrl, response)) return true;
  if (await handleStage6(request, requestUrl, response)) return true;
  if (await handleStage7(request, requestUrl, response)) return true;
  return false;
}

export function prototypeMockApiPlugin(): Plugin {
  return {
    name: 'prototype-deterministic-mock-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!(await handleMockRequest(request, response))) next();
      });
    },
  };
}
