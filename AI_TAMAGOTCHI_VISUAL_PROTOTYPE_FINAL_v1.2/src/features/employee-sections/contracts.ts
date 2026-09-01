import type { GoalSummary, PetState } from '../../mock-api/contracts';
import type { ComplexityLevel } from '../ai-case/contracts';

export type TaskTool = {
  readonly name: string;
  readonly recognized: boolean;
  readonly is_primary: boolean;
  readonly role_description: string | null;
  readonly sequence_no: number | null;
};

export type TaskSummary = {
  readonly task_id: string;
  readonly registered_at: string;
  readonly normalized_description: string | null;
  readonly complexity_level: ComplexityLevel | null;
  readonly score: 1 | 5 | 15 | 40 | 100 | null;
  readonly status: 'active' | 'deleted' | 'processing' | 'waiting_clarification' | 'failed';
  readonly tools: readonly TaskTool[];
};

export type TaskVersion = {
  readonly task_version_id: string;
  readonly version_no: number;
  readonly raw_input: string;
  readonly input_channel: 'text' | 'voice';
  readonly normalized_description: string | null;
  readonly complexity_level: ComplexityLevel | null;
  readonly score: 1 | 5 | 15 | 40 | 100 | null;
  readonly plausibility_status: 'valid' | 'ambiguous' | 'capability_conflict' | 'internal_contradiction' | 'insufficient_data' | null;
  readonly created_at: string;
  readonly finalized_at: string | null;
};

export type TaskDetail = {
  readonly task: TaskSummary;
  readonly current_version: TaskVersion;
  readonly links: readonly string[];
  readonly tags: readonly string[];
  readonly directorate_id_at_task_time: string;
};

export type HistoryEvent = {
  readonly event_id: string;
  readonly event_type: string;
  readonly event_date_spb: string;
  readonly title: string;
  readonly related_entity_type: string | null;
  readonly related_entity_id: string | null;
  readonly created_at: string;
};

export type GoalCycle = {
  readonly cycle_id: string;
  readonly year: number;
  readonly month: number;
  readonly status: 'pending_setup' | 'active' | 'closed';
  readonly goals: readonly GoalSummary[];
  readonly closed_at: string | null;
};

export type EmployeeLeaderboardItem = {
  readonly employee_id: string;
  readonly rank: number;
  readonly full_name: string;
  readonly annual_score: number;
  readonly directorate_id: string;
  readonly previous_year_status: string | null;
};

export type DirectorateLeaderboardItem = {
  readonly directorate_id: string;
  readonly name: string;
  readonly rank: number;
  readonly average_score: number;
  readonly total_score: number;
  readonly authorized_headcount: number;
};

export type PublicCaseSummary = {
  readonly task_id: string;
  readonly normalized_description: string;
  readonly complexity_level: ComplexityLevel;
  readonly score: 1 | 5 | 15 | 40 | 100;
  readonly tools: readonly string[];
};

export type PublicProfile = {
  readonly employee: EmployeeLeaderboardItem;
  readonly privacy_level: 'closed' | 'standard' | 'open';
  readonly task_count: number | null;
  readonly current_streak: number | null;
  readonly complexity_distribution: readonly { readonly level: ComplexityLevel; readonly count: number }[];
  readonly tools: readonly string[];
  readonly open_cases: readonly PublicCaseSummary[];
};

export type PersonalDashboard = {
  readonly annual_score: number;
  readonly lifetime_task_score: number;
  readonly evolution_xp: number;
  readonly task_count: number;
  readonly average_complexity: number | null;
  readonly active_days: number;
  readonly current_streak: number;
  readonly best_streak: number;
  readonly pet: PetState;
  readonly current_goals: readonly GoalSummary[];
};

export type Achievement = {
  readonly achievement_id: string;
  readonly code: string;
  readonly title: string;
  readonly earned_at: string;
  readonly cosmetic_id: string | null;
};

export type NotificationItem = {
  readonly notification_id: string;
  readonly type: 'pet_health' | 'goal' | 'streak' | 'progress' | 'ranking';
  readonly title: string;
  readonly body: string;
  readonly related_entity_type: string | null;
  readonly related_entity_id: string | null;
  readonly read_at: string | null;
  readonly created_at: string;
};

export type CompanyAnalytics = {
  readonly period_from: string;
  readonly period_to: string;
  readonly authorized_headcount: number;
  readonly task_count: number;
  readonly average_score_per_employee: number;
  readonly active_employee_count: number;
  readonly complexity_distribution: readonly { readonly level: ComplexityLevel; readonly count: number }[];
  readonly top_tools: readonly { readonly name: string; readonly task_count: number }[];
  readonly top_categories: readonly { readonly name: string; readonly task_count: number }[];
};

export type EmployeeSummary = {
  readonly employee_id: string;
  readonly full_name: string;
  readonly directorate_id: string;
  readonly directorate_name: string;
  readonly role: 'employee' | 'director' | 'executive' | 'admin';
  readonly account_status: 'active' | 'blocked' | 'terminated';
};

export type MeResponse = {
  readonly user: EmployeeSummary;
  readonly privacy_level: 'closed' | 'standard' | 'open';
  readonly profile_hidden: boolean;
  readonly onboarding_completed: boolean;
  readonly goal_setup_required: boolean;
};

export type PrivacyResponse = { readonly privacy_level: 'closed' | 'standard' | 'open' };
export type VacationState = { readonly enabled: boolean; readonly started_at: string | null };

export type ScoringInfo = {
  readonly levels: readonly {
    readonly level: ComplexityLevel;
    readonly points: 1 | 5 | 15 | 40 | 100;
    readonly label: string;
    readonly description: string;
  }[];
  readonly manual_override_allowed: false;
};

export type DirectorateCard = {
  readonly directorate: DirectorateLeaderboardItem;
  readonly employees: readonly EmployeeLeaderboardItem[];
};
