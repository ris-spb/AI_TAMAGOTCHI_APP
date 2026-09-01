import { AI_CASE_TASK_ID } from '../../fixtures/aiCase';
import { buildHomeFixture } from '../../fixtures/home';
import type {
  Achievement,
  CompanyAnalytics,
  DirectorateLeaderboardItem,
  EmployeeLeaderboardItem,
  GoalCycle,
  HistoryEvent,
  MeResponse,
  ScoringInfo,
  NotificationItem,
  PersonalDashboard,
  PublicProfile,
  TaskDetail,
  TaskSummary,
  TaskVersion,
} from './contracts';

export const SELF_EMPLOYEE_ID = '61000000-0000-4000-8000-000000000001';
export const DIRECTORATE_IDS = {
  commercial: '62000000-0000-4000-8000-000000000001',
  digital: '62000000-0000-4000-8000-000000000002',
  finance: '62000000-0000-4000-8000-000000000003',
  operations: '62000000-0000-4000-8000-000000000004',
} as const;

const tools = (name: string, primary = true) => [{ name, recognized: true, is_primary: primary, role_description: null, sequence_no: 1 }];

export const stage6Tasks: readonly TaskSummary[] = [
  {
    task_id: AI_CASE_TASK_ID,
    registered_at: '2026-09-01T06:35:00.000Z',
    normalized_description: 'Проанализирован синтетический массив пассажиропотока, рассчитаны отклонения и подготовлен воспроизводимый Python-анализ.',
    complexity_level: 'C3',
    score: 15,
    status: 'active',
    tools: tools('ChatGPT'),
  },
  {
    task_id: '50000000-0000-4000-8000-000000000101',
    registered_at: '2026-08-29T11:20:00.000Z',
    normalized_description: 'Подготовлена структурированная справка по результатам внутреннего исследования с помощью ИИ.',
    complexity_level: 'C2',
    score: 5,
    status: 'active',
    tools: tools('ChatGPT'),
  },
  {
    task_id: '50000000-0000-4000-8000-000000000102',
    registered_at: '2026-08-27T08:10:00.000Z',
    normalized_description: 'Собран reusable workflow для автоматической подготовки регулярного отчёта из нескольких источников.',
    complexity_level: 'C4',
    score: 40,
    status: 'active',
    tools: tools('n8n'),
  },
];

export const stage6TaskVersions: readonly TaskVersion[] = [
  {
    task_version_id: '50000000-0000-4000-8000-000000000202',
    version_no: 2,
    raw_input: 'Я проанализировал синтетический массив пассажиропотока, написал с ИИ Python-код, проверил отклонения и собрал воспроизводимый анализ.',
    input_channel: 'text',
    normalized_description: stage6Tasks[0]!.normalized_description,
    complexity_level: 'C3',
    score: 15,
    plausibility_status: 'valid',
    created_at: '2026-09-01T06:35:00.000Z',
    finalized_at: '2026-09-01T06:35:22.000Z',
  },
  {
    task_version_id: '50000000-0000-4000-8000-000000000201',
    version_no: 1,
    raw_input: 'Проанализировал таблицу пассажиропотока с ChatGPT и выписал отклонения.',
    input_channel: 'text',
    normalized_description: 'Проанализирована таблица пассажиропотока и выделены отклонения.',
    complexity_level: 'C2',
    score: 5,
    plausibility_status: 'valid',
    created_at: '2026-09-01T06:27:00.000Z',
    finalized_at: '2026-09-01T06:27:16.000Z',
  },
];

export const stage6TaskDetail: TaskDetail = {
  task: stage6Tasks[0]!,
  current_version: stage6TaskVersions[0]!,
  links: ['https://example.invalid/demo-reference'],
  tags: ['данные', 'python', 'анализ'],
  directorate_id_at_task_time: DIRECTORATE_IDS.commercial,
};

export const stage6HistoryEvents: readonly HistoryEvent[] = [
  {
    event_id: '63000000-0000-4000-8000-000000000001',
    event_type: 'score_xp_awarded',
    event_date_spb: '2026-09-01',
    title: 'AI-кейс оценён как C3: +15 Score',
    related_entity_type: 'task',
    related_entity_id: AI_CASE_TASK_ID,
    created_at: '2026-09-01T06:35:23.000Z',
  },
  {
    event_id: '63000000-0000-4000-8000-000000000002',
    event_type: 'goal_progress',
    event_date_spb: '2026-09-01',
    title: 'Прогресс Monthly Goal обновлён',
    related_entity_type: 'goal',
    related_entity_id: '42000000-0000-4000-8000-000000000001',
    created_at: '2026-09-01T06:35:24.000Z',
  },
  {
    event_id: '63000000-0000-4000-8000-000000000003',
    event_type: 'streak_milestone',
    event_date_spb: '2026-08-28',
    title: 'AI Streak: 10 активных рабочих дней',
    related_entity_type: 'streak',
    related_entity_id: null,
    created_at: '2026-08-28T15:00:00.000Z',
  },
];

export const currentGoalCycle: GoalCycle = {
  cycle_id: '64000000-0000-4000-8000-000000000001',
  year: 2026,
  month: 9,
  status: 'active',
  goals: [
    { goal_id: '42000000-0000-4000-8000-000000000001', display_text: 'Выполни 3 AI-кейса уровня C3+', current_value: 1, target_value: 3, completed: false, source: 'employee_choice' },
    { goal_id: '42000000-0000-4000-8000-000000000002', display_text: 'Используй ИИ в 8 рабочих днях', current_value: 2, target_value: 8, completed: false, source: 'employee_choice' },
    { goal_id: '42000000-0000-4000-8000-000000000003', display_text: 'Примени минимум 2 разных AI-инструмента', current_value: 2, target_value: 2, completed: true, source: 'system_assigned' },
  ],
  closed_at: null,
};

export const previousGoalCycle: GoalCycle = {
  cycle_id: '64000000-0000-4000-8000-000000000002',
  year: 2026,
  month: 8,
  status: 'closed',
  goals: [
    { goal_id: '42000000-0000-4000-8000-000000000011', display_text: 'Выполни 3 AI-кейса уровня C3+', current_value: 3, target_value: 3, completed: true, source: 'employee_choice' },
    { goal_id: '42000000-0000-4000-8000-000000000012', display_text: 'Используй ИИ в 8 рабочих днях', current_value: 8, target_value: 8, completed: true, source: 'employee_choice' },
    { goal_id: '42000000-0000-4000-8000-000000000013', display_text: 'Примени минимум 2 разных AI-инструмента', current_value: 2, target_value: 2, completed: true, source: 'system_assigned' },
  ],
  closed_at: '2026-09-01T05:00:00.000Z',
};

export const employeeLeaderboard: readonly EmployeeLeaderboardItem[] = [
  { employee_id: '61000000-0000-4000-8000-000000000011', rank: 1, full_name: 'Марина Орлова', annual_score: 486, directorate_id: DIRECTORATE_IDS.digital, previous_year_status: null },
  { employee_id: '61000000-0000-4000-8000-000000000012', rank: 2, full_name: 'Алексей Ветров', annual_score: 452, directorate_id: DIRECTORATE_IDS.commercial, previous_year_status: null },
  { employee_id: '61000000-0000-4000-8000-000000000013', rank: 3, full_name: 'Дарья Лукина', annual_score: 421, directorate_id: DIRECTORATE_IDS.finance, previous_year_status: null },
  { employee_id: SELF_EMPLOYEE_ID, rank: 18, full_name: 'Дмитрий Примеров', annual_score: 186, directorate_id: DIRECTORATE_IDS.commercial, previous_year_status: null },
];

export const directorateLeaderboard: readonly DirectorateLeaderboardItem[] = [
  { directorate_id: DIRECTORATE_IDS.digital, name: 'Цифровые решения', rank: 1, average_score: 214.4, total_score: 5360, authorized_headcount: 25 },
  { directorate_id: DIRECTORATE_IDS.commercial, name: 'Коммерческая дирекция', rank: 2, average_score: 196.8, total_score: 6298, authorized_headcount: 32 },
  { directorate_id: DIRECTORATE_IDS.finance, name: 'Финансы', rank: 3, average_score: 173.1, total_score: 3635, authorized_headcount: 21 },
  { directorate_id: DIRECTORATE_IDS.operations, name: 'Операционная дирекция', rank: 4, average_score: 159.7, total_score: 6388, authorized_headcount: 40 },
];

export const publicProfiles: Readonly<Record<string, PublicProfile>> = {
  [SELF_EMPLOYEE_ID]: {
    employee: employeeLeaderboard[3]!, privacy_level: 'standard', task_count: 47, current_streak: 12,
    complexity_distribution: [{ level: 'C1', count: 9 }, { level: 'C2', count: 21 }, { level: 'C3', count: 12 }, { level: 'C4', count: 5 }, { level: 'C5', count: 0 }],
    tools: ['ChatGPT', 'Perplexity', 'n8n'], open_cases: [],
  },
  [employeeLeaderboard[0]!.employee_id]: {
    employee: employeeLeaderboard[0]!, privacy_level: 'closed', task_count: null, current_streak: null,
    complexity_distribution: [], tools: [], open_cases: [],
  },
  [employeeLeaderboard[1]!.employee_id]: {
    employee: employeeLeaderboard[1]!, privacy_level: 'standard', task_count: 42, current_streak: 12,
    complexity_distribution: [{ level: 'C1', count: 6 }, { level: 'C2', count: 18 }, { level: 'C3', count: 13 }, { level: 'C4', count: 5 }, { level: 'C5', count: 0 }],
    tools: ['ChatGPT', 'Perplexity', 'n8n'], open_cases: [],
  },
  [employeeLeaderboard[2]!.employee_id]: {
    employee: employeeLeaderboard[2]!, privacy_level: 'open', task_count: 38, current_streak: 8,
    complexity_distribution: [{ level: 'C1', count: 8 }, { level: 'C2', count: 16 }, { level: 'C3', count: 10 }, { level: 'C4', count: 4 }, { level: 'C5', count: 0 }],
    tools: ['ChatGPT', 'Claude'],
    open_cases: [{ task_id: '50000000-0000-4000-8000-000000000301', normalized_description: 'Подготовлен сравнительный анализ нескольких вариантов с использованием ИИ.', complexity_level: 'C2', score: 5, tools: ['ChatGPT'] }],
  },
};

const home = buildHomeFixture({ healthState: 'happy', streak: 12, goalProgress: [33, 25, 100], empty: false });
export const personalDashboard: PersonalDashboard = {
  annual_score: 186,
  lifetime_task_score: 612,
  evolution_xp: 684,
  task_count: 47,
  average_complexity: 2.8,
  active_days: 31,
  current_streak: 12,
  best_streak: 20,
  pet: home.pet,
  current_goals: currentGoalCycle.goals,
};

export const achievements: readonly Achievement[] = [
  { achievement_id: '65000000-0000-4000-8000-000000000001', code: 'DEMO_CONTENT_PLACEHOLDER_001', title: 'Полученное достижение', earned_at: '2026-08-28T15:00:00.000Z', cosmetic_id: null },
  { achievement_id: '65000000-0000-4000-8000-000000000002', code: 'DEMO_CONTENT_PLACEHOLDER_002', title: 'Полученное достижение', earned_at: '2026-08-18T10:00:00.000Z', cosmetic_id: null },
];

export const notifications: readonly NotificationItem[] = [
  { notification_id: '66000000-0000-4000-8000-000000000001', type: 'goal', title: 'Цель продвинулась', body: 'Новый AI-кейс учтён в Monthly Goal.', related_entity_type: 'goal', related_entity_id: currentGoalCycle.goals[0]!.goal_id, read_at: null, created_at: '2026-09-01T06:35:24.000Z' },
  { notification_id: '66000000-0000-4000-8000-000000000002', type: 'streak', title: 'AI Streak продолжается', body: 'Сегодняшняя активность засчитана в серию рабочих дней.', related_entity_type: 'streak', related_entity_id: null, read_at: '2026-09-01T06:36:00.000Z', created_at: '2026-09-01T06:35:25.000Z' },
];

export const companyAnalytics: CompanyAnalytics = {
  period_from: '2026-08-01', period_to: '2026-08-31', authorized_headcount: 118, task_count: 1264,
  average_score_per_employee: 184.6, active_employee_count: 94,
  complexity_distribution: [{ level: 'C1', count: 356 }, { level: 'C2', count: 514 }, { level: 'C3', count: 294 }, { level: 'C4', count: 88 }, { level: 'C5', count: 12 }],
  top_tools: [{ name: 'ChatGPT', task_count: 728 }, { name: 'Perplexity', task_count: 205 }, { name: 'Claude', task_count: 144 }],
  top_categories: [{ name: 'Аналитика и работа с данными', task_count: 334 }, { name: 'Research / поиск информации', task_count: 248 }, { name: 'Тексты и деловая коммуникация', task_count: 221 }],
};


export const meResponse: MeResponse = {
  user: {
    employee_id: SELF_EMPLOYEE_ID,
    full_name: 'Дмитрий Примеров',
    directorate_id: DIRECTORATE_IDS.commercial,
    directorate_name: 'Коммерческая дирекция',
    role: 'employee',
    account_status: 'active',
  },
  privacy_level: 'standard',
  profile_hidden: false,
  onboarding_completed: true,
  goal_setup_required: false,
};

export const scoringInfo: ScoringInfo = {
  levels: [
    { level: 'C1', points: 1, label: 'Basic', description: 'Простое единичное применение AI с минимальной сложностью workflow.' },
    { level: 'C2', points: 5, label: 'Standard', description: 'Полноценная типовая рабочая задача с содержательным применением AI.' },
    { level: 'C3', points: 15, label: 'Advanced', description: 'Сложная многоэтапная интеллектуальная задача.' },
    { level: 'C4', points: 40, label: 'Expert', description: 'Сложное решение, интеграция или продвинутый reusable workflow.' },
    { level: 'C5', points: 100, label: 'System / AI Engineering', description: 'Комплексное системное AI-решение или end-to-end agentic automation.' },
  ],
  manual_override_allowed: false,
};
