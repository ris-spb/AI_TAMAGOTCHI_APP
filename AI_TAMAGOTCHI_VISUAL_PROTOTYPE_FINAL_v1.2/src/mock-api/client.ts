import type {
  ClarificationAnswerRequest,
  ComplexityLevel,
  TaskCreateRequest,
} from '../features/ai-case/contracts';
import type { DataScenario, MascotState } from './contracts';
import {
  errorResponseSchema,
  homeResponseSchema,
  mockHealthResponseSchema,
  processingStateSchema,
  taskAcceptedResponseSchema,
  taskResultSchema,
  transcriptionResponseSchema,
  type ParsedErrorResponse,
  type ParsedHomeResponse,
  type ParsedMockHealthResponse,
  type ParsedProcessingState,
  type ParsedTaskAcceptedResponse,
  type ParsedTaskResult,
  type ParsedTranscriptionResponse,
} from './schema';

export class PrototypeApiError extends Error {
  readonly status: number;
  readonly payload: ParsedErrorResponse;

  constructor(status: number, payload: ParsedErrorResponse) {
    super(payload.message);
    this.name = 'PrototypeApiError';
    this.status = status;
    this.payload = payload;
  }
}

async function parseApiResponse<T>(response: Response, parser: { parse: (value: unknown) => T }): Promise<T> {
  const payload = await response.json();
  if (!response.ok) {
    throw new PrototypeApiError(response.status, errorResponseSchema.parse(payload));
  }
  return parser.parse(payload);
}

export async function fetchMockHealth(signal?: AbortSignal): Promise<ParsedMockHealthResponse> {
  const response = await fetch('/__prototype/mock-health?latency=80', { signal });

  if (!response.ok) {
    throw new Error(`Prototype mock health failed with HTTP ${response.status}`);
  }

  return mockHealthResponseSchema.parse(await response.json());
}

export type FetchHomeOptions = {
  readonly scenario: Exclude<DataScenario, 'loading'>;
  readonly healthState: MascotState;
  readonly streak: number;
  readonly goalProgress: readonly [number, number, number];
  readonly signal?: AbortSignal;
};

export async function fetchHome({ scenario, healthState, streak, goalProgress, signal }: FetchHomeOptions): Promise<ParsedHomeResponse> {
  const params = new URLSearchParams({
    scenario,
    health_state: healthState,
    streak: String(streak),
    goals: goalProgress.join(','),
    latency: '140',
  });
  const response = await fetch(`/v1/home?${params.toString()}`, { signal });
  return parseApiResponse(response, homeResponseSchema);
}

export type PrototypeAiCaseScenario = 'success' | 'processing_error' | 'stt_error' | 'network_error' | 'microphone_denied';

export type CreateTaskOptions = {
  readonly request: TaskCreateRequest;
  readonly clarificationCount: 0 | 1 | 2 | 3;
  readonly resultLevel: ComplexityLevel;
  readonly scenario: PrototypeAiCaseScenario;
  readonly idempotencyKey: string;
  readonly signal?: AbortSignal;
};

export async function createTask({ request, clarificationCount, resultLevel, scenario, idempotencyKey, signal }: CreateTaskOptions): Promise<ParsedTaskAcceptedResponse> {
  const response = await fetch('/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
      // Prototype-only controls. They are not production API fields.
      'X-Prototype-Clarifications': String(clarificationCount),
      'X-Prototype-Result-Level': resultLevel,
      'X-Prototype-AI-Scenario': scenario,
    },
    body: JSON.stringify(request),
    signal,
  });
  return parseApiResponse(response, taskAcceptedResponseSchema);
}

export type TranscribeTaskAudioOptions = {
  readonly audio: Blob;
  readonly scenario: PrototypeAiCaseScenario;
  readonly idempotencyKey: string;
  readonly signal?: AbortSignal;
};

export async function transcribeTaskAudio({ audio, scenario, idempotencyKey, signal }: TranscribeTaskAudioOptions): Promise<ParsedTranscriptionResponse> {
  const body = new FormData();
  body.append('audio', audio, 'prototype-ephemeral.webm');
  const response = await fetch('/v1/tasks/voice/transcriptions', {
    method: 'POST',
    headers: {
      'Idempotency-Key': idempotencyKey,
      'X-Prototype-STT-Scenario': scenario,
    },
    body,
    signal,
  });
  return parseApiResponse(response, transcriptionResponseSchema);
}

export async function getTaskProcessingState(taskId: string, signal?: AbortSignal): Promise<ParsedProcessingState> {
  const response = await fetch(`/v1/tasks/${encodeURIComponent(taskId)}/processing`, { signal });
  return parseApiResponse(response, processingStateSchema);
}

export async function answerTaskClarification(
  taskId: string,
  clarificationId: string,
  request: ClarificationAnswerRequest,
  idempotencyKey: string,
  signal?: AbortSignal,
): Promise<ParsedProcessingState> {
  const response = await fetch(`/v1/tasks/${encodeURIComponent(taskId)}/clarifications/${encodeURIComponent(clarificationId)}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(request),
    signal,
  });
  return parseApiResponse(response, processingStateSchema);
}

export async function getTaskResult(taskId: string, signal?: AbortSignal): Promise<ParsedTaskResult> {
  const response = await fetch(`/v1/tasks/${encodeURIComponent(taskId)}/result`, { signal });
  return parseApiResponse(response, taskResultSchema);
}
