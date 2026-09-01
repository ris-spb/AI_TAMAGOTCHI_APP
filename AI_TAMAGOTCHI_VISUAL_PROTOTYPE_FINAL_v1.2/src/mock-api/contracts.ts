export const demoRoles = ['Employee', 'Director', 'Executive', 'Admin'] as const;
export type DemoRole = (typeof demoRoles)[number];

export const dataScenarios = ['success', 'loading', 'empty', 'error', 'forbidden'] as const;
export type DataScenario = (typeof dataScenarios)[number];

export const mascotStates = [
  'happy',
  'normal',
  'bored',
  'tired',
  'very_weak',
  'coma',
] as const;
export type MascotState = (typeof mascotStates)[number];

export type GoalSummary = {
  readonly goal_id: string;
  readonly display_text: string;
  readonly current_value: number;
  readonly target_value: number;
  readonly completed: boolean;
  readonly source: 'employee_choice' | 'system_assigned';
};

export type PetState = {
  readonly hp: number;
  readonly health_state: MascotState;
  readonly in_vacation: boolean;
  readonly current_streak: number;
  readonly best_streak: number;
  readonly evolution_xp: number;
  readonly evolution_stage: string;
  readonly evolution_branch: string | null;
  readonly coma_recovery_active_days: number;
};

export type HomeResponse = {
  readonly pet: PetState;
  readonly today_task_count: number;
  readonly goals: readonly GoalSummary[];
  readonly unread_notification_count: number;
  readonly ambient_message: string | null;
};

export const errorCodes = [
  'VALIDATION_ERROR',
  'AUTH_REQUIRED',
  'AUTH_VERIFICATION_FAILED',
  'ACCOUNT_BLOCKED',
  'FORBIDDEN',
  'OBJECT_SCOPE_FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'IDEMPOTENCY_KEY_REUSED',
  'VERSION_CONFLICT',
  'INVALID_CURSOR',
  'GOAL_SETUP_REQUIRED',
  'GOAL_SETUP_NOT_REQUIRED',
  'GOAL_SELECTION_INVALID',
  'CLARIFICATION_NOT_PENDING',
  'CLARIFICATION_LIMIT_REACHED',
  'PROCESSING_NOT_READY',
  'PROCESSING_FAILED',
  'TASK_DELETED',
  'DEPENDENCY_UNAVAILABLE',
  'RATE_LIMITED',
  'EXPORT_NOT_READY',
  'EXPORT_EXPIRED',
  'INTERNAL_ERROR',
] as const;
export type ErrorCode = (typeof errorCodes)[number];

export type ErrorResponse = {
  readonly code: ErrorCode;
  readonly message: string;
  readonly trace_id: string;
  readonly field_errors?: readonly {
    readonly field: string;
    readonly code: string;
    readonly message: string;
  }[];
};

export type MockHealthResponse = {
  readonly status: 'ok';
  readonly service: 'prototype-mock-api';
  readonly deterministic: true;
  readonly source: 'PROTOTYPE_STAGE_1';
  readonly timestamp: '2026-09-01T00:00:00.000Z';
};
