import { z } from 'zod';

export const inputChannelSchema = z.enum(['text', 'voice']);
export const processingStatusSchema = z.enum(['accepted', 'pending', 'running', 'waiting_clarification', 'completed', 'failed', 'stale']);
export const complexityLevelSchema = z.enum(['C1', 'C2', 'C3', 'C4', 'C5']);

export const taskCreateRequestSchema = z.object({
  input_channel: inputChannelSchema,
  raw_input: z.string().trim().min(1, 'Опишите уже выполненную AI-задачу.'),
  links: z.array(z.string().url('Введите корректную ссылку.')).optional(),
});

export const taskEditRequestSchema = z.object({
  expected_version_no: z.number().int().min(1),
  raw_input: z.string().trim().min(1, 'Опишите уже выполненную AI-задачу.'),
  input_channel: inputChannelSchema,
  links: z.array(z.string().url('Введите корректную ссылку.')).optional(),
});

export const taskAcceptedResponseSchema = z.object({
  task_id: z.string().uuid(),
  task_version_id: z.string().uuid(),
  version_no: z.number().int().min(1),
  processing_run_id: z.string().uuid(),
  status: processingStatusSchema,
});

export const transcriptionResponseSchema = z.object({
  transcript: z.string().min(1),
  provider_attempt_id: z.string().uuid(),
});

export const clarificationSchema = z.object({
  clarification_id: z.string().uuid(),
  sequence_no: z.number().int().min(1).max(3),
  reason: z.enum(['plausibility', 'duplicate', 'complexity', 'missing_data']),
  question_text: z.string().min(1),
});

export const processingStateSchema = z.object({
  task_id: z.string().uuid(),
  task_version_id: z.string().uuid(),
  processing_run_id: z.string().uuid(),
  status: processingStatusSchema,
  clarification_count: z.number().int().min(0).max(3),
  pending_clarification: clarificationSchema.nullable(),
  failure_code: z.string().nullable(),
});

export const clarificationAnswerRequestSchema = z.object({
  answer_text: z.string().trim().min(1, 'Введите ответ.'),
  answer_channel: inputChannelSchema,
});

export const taskToolSchema = z.object({
  name: z.string().min(1),
  recognized: z.boolean(),
  is_primary: z.boolean(),
  role_description: z.string().nullable(),
  sequence_no: z.number().int().min(1).nullable(),
});

export const taskResultSchema = z.object({
  task_id: z.string().uuid(),
  task_version_id: z.string().uuid(),
  normalized_description: z.string().min(1),
  complexity_level: complexityLevelSchema,
  score: z.union([z.literal(1), z.literal(5), z.literal(15), z.literal(40), z.literal(100)]),
  evolution_xp_awarded: z.number().int().min(0),
  goal_contributions: z.array(z.object({
    goal_id: z.string().uuid(),
    progress_delta: z.number().min(0),
    completed: z.boolean(),
  })),
  tools: z.array(taskToolSchema),
});
