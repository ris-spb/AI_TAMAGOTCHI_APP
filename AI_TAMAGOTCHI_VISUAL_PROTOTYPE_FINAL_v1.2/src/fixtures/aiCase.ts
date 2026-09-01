import type { Clarification, ClarificationScenario, ComplexityLevel, TaskResult } from '../features/ai-case/contracts';

export const AI_CASE_TASK_ID = '50000000-0000-4000-8000-000000000001';
export const AI_CASE_VERSION_ID = '50000000-0000-4000-8000-000000000002';
export const AI_CASE_PROCESSING_ID = '50000000-0000-4000-8000-000000000003';
export const AI_CASE_PROVIDER_ATTEMPT_ID = '50000000-0000-4000-8000-000000000004';
export const AI_CASE_GOAL_ID = '50000000-0000-4000-8000-000000000005';

export const deterministicTranscript = 'Проанализировал данные по пассажиропотоку, сравнил динамику по месяцам и с помощью ИИ подготовил выводы для рабочей справки.';

export const clarificationFixtures: readonly Clarification[] = [
  {
    clarification_id: '50000000-0000-4000-8000-000000000011',
    sequence_no: 1,
    reason: 'complexity',
    question_text: 'Вы использовали ИИ только для текста или также для анализа самих данных?',
  },
  {
    clarification_id: '50000000-0000-4000-8000-000000000012',
    sequence_no: 2,
    reason: 'missing_data',
    question_text: 'Были ли в работе расчёты, таблицы или код, созданные с помощью ИИ?',
  },
  {
    clarification_id: '50000000-0000-4000-8000-000000000013',
    sequence_no: 3,
    reason: 'duplicate',
    question_text: 'Это отдельное выполнение, а не повтор ранее зарегистрированной задачи?',
  },
] as const;

export const scoreByComplexity = {
  C1: 1,
  C2: 5,
  C3: 15,
  C4: 40,
  C5: 100,
} as const satisfies Record<ComplexityLevel, 1 | 5 | 15 | 40 | 100>;

export function buildTaskResult(
  level: ComplexityLevel,
  taskId = AI_CASE_TASK_ID,
  taskVersionId = AI_CASE_VERSION_ID,
  options?: {
    readonly normalizedDescription?: string | undefined;
    readonly toolName?: string | undefined;
    readonly evolutionXpAwarded?: number | undefined;
    readonly goalProgressDelta?: number | undefined;
  },
): TaskResult {
  const score = scoreByComplexity[level];
  const goalProgressDelta = options?.goalProgressDelta ?? 1;
  return {
    task_id: taskId,
    task_version_id: taskVersionId,
    normalized_description: options?.normalizedDescription ?? 'Проведён анализ данных по пассажиропотоку с использованием ИИ и подготовлены структурированные выводы для рабочей справки.',
    complexity_level: level,
    score,
    evolution_xp_awarded: options?.evolutionXpAwarded ?? score,
    goal_contributions: [{
      goal_id: AI_CASE_GOAL_ID,
      progress_delta: goalProgressDelta,
      completed: goalProgressDelta > 0 && (level === 'C4' || level === 'C5'),
    }],
    tools: [{
      name: options?.toolName ?? 'ChatGPT',
      recognized: true,
      is_primary: true,
      role_description: 'Анализ и структурирование результатов',
      sequence_no: 1,
    }],
  };
}

export function safeClarificationTarget(value: unknown): ClarificationScenario {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1 || parsed === 2 || parsed === 3) return parsed;
  return 2;
}
