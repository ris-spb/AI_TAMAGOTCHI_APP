export type AppRole = 'employee' | 'director' | 'executive' | 'admin';

export type EmployeeSummary = {
  employee_id: string;
  full_name: string;
  directorate_id: string;
  directorate_name: string;
  role: AppRole;
  account_status: 'active' | 'blocked' | 'terminated';
};

export type AuthVerifyRequest = {
  personnel_number: string;
  phone: string;
};

export type AuthVerifyResponse = {
  access_token: string;
  token_type: 'Bearer';
  expires_at: string;
  user: EmployeeSummary;
  onboarding_required: boolean;
  goal_setup_required: boolean;
};

export type OnboardingStatus = {
  required: boolean;
  completed: boolean;
  content_version: string;
  completed_at: string | null;
};

export type OnboardingCompleteRequest = {
  content_version: string;
};

export type GoalOption = {
  option_id: string;
  display_text: string;
  target_value: number;
};

export type GoalSetupState = {
  cycle_id: string;
  status: 'pending' | 'ready' | 'submitted';
  options: GoalOption[];
};

export type GoalSummary = {
  goal_id: string;
  display_text: string;
  current_value: number;
  target_value: number;
  completed: boolean;
  source: 'employee_choice' | 'system_assigned';
};

export type GoalCycle = {
  cycle_id: string;
  year: number;
  month: number;
  status: 'pending_setup' | 'active' | 'closed';
  goals: GoalSummary[];
  closed_at: string | null;
};

export type GoalSetupSubmitRequest = {
  cycle_id: string;
  selected_option_ids: [string, string];
};
