import type { DirectorateLeaderboardItem, EmployeeLeaderboardItem, PersonalDashboard } from '../employee-sections/contracts';

export type DirectorDashboard = {
  readonly directorate_id: string;
  readonly authorized_headcount: number;
  readonly total_score: number;
  readonly average_score: number;
  readonly rank: number | null;
  readonly task_count: number;
  readonly employees: readonly EmployeeLeaderboardItem[];
};

export type ExecutiveDashboard = {
  readonly authorized_headcount: number;
  readonly task_count: number;
  readonly average_score_per_employee: number;
  readonly directorates: readonly DirectorateLeaderboardItem[];
};

export type AppRole = 'employee' | 'director' | 'executive' | 'admin';
export type AccountStatus = 'active' | 'blocked' | 'terminated';
export type PrivacyLevel = 'closed' | 'standard' | 'open';

export type AdminEmployee = {
  readonly employee_id: string;
  readonly personnel_number: string;
  readonly full_name: string;
  readonly phone: string;
  readonly directorate_id: string;
  readonly role: AppRole;
  readonly account_status: AccountStatus;
  readonly profile_hidden: boolean;
  readonly privacy_level: PrivacyLevel;
};

export type AdminEmployeePatch = Partial<Pick<AdminEmployee, 'full_name' | 'phone' | 'directorate_id' | 'role' | 'account_status' | 'profile_hidden'>>;

export type Directorate = {
  readonly directorate_id: string;
  readonly name: string;
  readonly director_employee_id: string | null;
  readonly active: boolean;
};

export type CalendarDay = {
  readonly date: string;
  readonly is_working_day: boolean;
  readonly reason: string;
};

export type TaxonomyCategory = { readonly category_id: string; readonly name: string; readonly active: boolean };
export type TaxonomySubcategory = { readonly subcategory_id: string; readonly category_id: string; readonly name: string; readonly active: boolean };
export type TaxonomyVersion = {
  readonly taxonomy_version_id: string;
  readonly version_code: string;
  readonly status: 'draft' | 'active' | 'retired';
  readonly categories: readonly TaxonomyCategory[];
  readonly subcategories: readonly TaxonomySubcategory[];
};

export type Tool = {
  readonly tool_id: string;
  readonly tool_name: string;
  readonly provider: string | null;
  readonly tool_type: string | null;
  readonly active: boolean;
  readonly aliases: readonly string[];
};

export type UnrecognizedTool = { readonly name: string; readonly task_count: number; readonly last_seen_at: string };
export type AuditChange = { readonly field: string; readonly old_value: string | null; readonly new_value: string | null };
export type AuditEvent = {
  readonly audit_id: string;
  readonly actor_type: 'employee' | 'admin' | 'system' | 'ai';
  readonly actor_id: string | null;
  readonly action: string;
  readonly entity_type: string;
  readonly entity_id: string;
  readonly changes: readonly AuditChange[];
  readonly reason: string | null;
  readonly created_at: string;
};

export type ScoringTrace = {
  readonly task_id: string;
  readonly task_version_id: string;
  readonly processing_run_id: string;
  readonly model_provider: string;
  readonly model_id: string;
  readonly prompt_bundle_version: string;
  readonly scoring_rubric_version: string;
  readonly taxonomy_version_code: string;
  readonly complexity_level: 'C1' | 'C2' | 'C3' | 'C4' | 'C5';
  readonly score: 1 | 5 | 15 | 40 | 100;
  readonly clarification_count: 0 | 1 | 2 | 3;
  readonly evidence_flags: readonly string[];
};

export type ExportCreateRequest = {
  readonly export_type: 'task_current' | 'task_audit' | 'aggregate';
  readonly format: 'csv' | 'xlsx';
  readonly scope_type: 'directorate' | 'company';
  readonly directorate_id?: string | null;
  readonly period_from?: string | null;
  readonly period_to?: string | null;
};
export type ExportAccepted = { readonly export_id: string; readonly status: ExportStatus };
export type ExportStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type ExportStatusResponse = {
  readonly export_id: string;
  readonly status: ExportStatus;
  readonly format: 'csv' | 'xlsx';
  readonly created_at: string;
  readonly completed_at: string | null;
  readonly file_size_bytes: number | null;
  readonly sha256: string | null;
  readonly failure_code: string | null;
};

export type Page<T> = { readonly items: readonly T[]; readonly next_cursor: string | null };
export type EmployeePage = Page<AdminEmployee>;
export type DirectoratePage = Page<Directorate>;
export type ToolPage = Page<Tool>;
export type UnrecognizedToolPage = Page<UnrecognizedTool>;
export type AuditPage = Page<AuditEvent>;
export type CalendarPage = { readonly items: readonly CalendarDay[] };
export type TaxonomyVersionList = { readonly items: readonly TaxonomyVersion[] };
export type ManagementEmployeeDetail = PersonalDashboard;
