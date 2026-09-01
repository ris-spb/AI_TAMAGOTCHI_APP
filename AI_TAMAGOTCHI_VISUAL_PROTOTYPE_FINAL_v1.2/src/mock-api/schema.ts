import { z } from 'zod';

import {
  clarificationSchema,
  processingStateSchema,
  taskAcceptedResponseSchema,
  taskResultSchema,
  transcriptionResponseSchema,
} from '../features/ai-case/schemas';
import { errorCodes } from './contracts';

export const mockHealthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.literal('prototype-mock-api'),
  deterministic: z.literal(true),
  source: z.literal('PROTOTYPE_STAGE_1'),
  timestamp: z.literal('2026-09-01T00:00:00.000Z'),
});

export const mascotStateSchema = z.enum(['happy', 'normal', 'bored', 'tired', 'very_weak', 'coma']);

export const goalSummarySchema = z.object({
  goal_id: z.string().uuid(),
  display_text: z.string().min(1),
  current_value: z.number().min(0),
  target_value: z.number().min(0),
  completed: z.boolean(),
  source: z.enum(['employee_choice', 'system_assigned']),
});

export const petStateSchema = z.object({
  hp: z.number().int().min(0).max(100),
  health_state: mascotStateSchema,
  in_vacation: z.boolean(),
  current_streak: z.number().int().min(0),
  best_streak: z.number().int().min(0),
  evolution_xp: z.number().int().min(0),
  evolution_stage: z.string().min(1),
  evolution_branch: z.string().nullable(),
  coma_recovery_active_days: z.number().int().min(0),
});

export const homeResponseSchema = z.object({
  pet: petStateSchema,
  today_task_count: z.number().int().min(0),
  goals: z.array(goalSummarySchema).max(3),
  unread_notification_count: z.number().int().min(0),
  ambient_message: z.string().nullable(),
});

export const errorResponseSchema = z.object({
  code: z.enum(errorCodes),
  message: z.string().min(1),
  trace_id: z.string().min(1),
  field_errors: z.array(z.object({
    field: z.string().min(1),
    code: z.string().min(1),
    message: z.string().min(1),
  })).optional(),
});

export {
  clarificationSchema,
  processingStateSchema,
  taskAcceptedResponseSchema,
  taskResultSchema,
  transcriptionResponseSchema,
};

export type ParsedMockHealthResponse = z.infer<typeof mockHealthResponseSchema>;
export type ParsedHomeResponse = z.infer<typeof homeResponseSchema>;
export type ParsedErrorResponse = z.infer<typeof errorResponseSchema>;
export type ParsedTaskAcceptedResponse = z.infer<typeof taskAcceptedResponseSchema>;
export type ParsedTranscriptionResponse = z.infer<typeof transcriptionResponseSchema>;
export type ParsedProcessingState = z.infer<typeof processingStateSchema>;
export type ParsedTaskResult = z.infer<typeof taskResultSchema>;
