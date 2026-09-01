export const inputChannels = ['text', 'voice'] as const;
export type InputChannel = (typeof inputChannels)[number];

export const processingStatuses = ['accepted', 'pending', 'running', 'waiting_clarification', 'completed', 'failed', 'stale'] as const;
export type ProcessingStatus = (typeof processingStatuses)[number];

export const complexityLevels = ['C1', 'C2', 'C3', 'C4', 'C5'] as const;
export type ComplexityLevel = (typeof complexityLevels)[number];

export type TaskCreateRequest = {
  readonly input_channel: InputChannel;
  readonly raw_input: string;
  readonly links?: readonly string[];
};

export type TaskEditRequest = {
  readonly expected_version_no: number;
  readonly raw_input: string;
  readonly input_channel: InputChannel;
  readonly links?: readonly string[];
};

export type TaskAcceptedResponse = {
  readonly task_id: string;
  readonly task_version_id: string;
  readonly version_no: number;
  readonly processing_run_id: string;
  readonly status: ProcessingStatus;
};

export type TranscriptionResponse = {
  readonly transcript: string;
  readonly provider_attempt_id: string;
};

export type Clarification = {
  readonly clarification_id: string;
  readonly sequence_no: 1 | 2 | 3;
  readonly reason: 'plausibility' | 'duplicate' | 'complexity' | 'missing_data';
  readonly question_text: string;
};

export type ProcessingState = {
  readonly task_id: string;
  readonly task_version_id: string;
  readonly processing_run_id: string;
  readonly status: ProcessingStatus;
  readonly clarification_count: number;
  readonly pending_clarification: Clarification | null;
  readonly failure_code: string | null;
};

export type ClarificationAnswerRequest = {
  readonly answer_text: string;
  readonly answer_channel: InputChannel;
};

export type GoalContribution = {
  readonly goal_id: string;
  readonly progress_delta: number;
  readonly completed: boolean;
};

export type TaskTool = {
  readonly name: string;
  readonly recognized: boolean;
  readonly is_primary: boolean;
  readonly role_description: string | null;
  readonly sequence_no: number | null;
};

export type TaskResult = {
  readonly task_id: string;
  readonly task_version_id: string;
  readonly normalized_description: string;
  readonly complexity_level: ComplexityLevel;
  readonly score: 1 | 5 | 15 | 40 | 100;
  readonly evolution_xp_awarded: number;
  readonly goal_contributions: readonly GoalContribution[];
  readonly tools: readonly TaskTool[];
};

export const clarificationScenarioValues = [0, 1, 2, 3] as const;
export type ClarificationScenario = (typeof clarificationScenarioValues)[number];
