import { describe, expect, it } from 'vitest';

import { processingStateSchema, taskResultSchema } from '../../src/features/ai-case/schemas';
import { buildTaskResult, clarificationFixtures, scoreByComplexity } from '../../src/fixtures/aiCase';

describe('Stage 5 AI-case contract', () => {
  it('keeps the fixed C1-C5 score mapping server-side', () => {
    expect(scoreByComplexity).toEqual({ C1: 1, C2: 5, C3: 15, C4: 40, C5: 100 });
    for (const level of ['C1', 'C2', 'C3', 'C4', 'C5'] as const) {
      expect(taskResultSchema.parse(buildTaskResult(level)).score).toBe(scoreByComplexity[level]);
    }
  });

  it('contains only three deterministic clarification slots', () => {
    expect(clarificationFixtures).toHaveLength(3);
    expect(clarificationFixtures.map((item) => item.sequence_no)).toEqual([1, 2, 3]);
  });

  it('rejects a fourth clarification sequence in ProcessingState', () => {
    const invalid = {
      task_id: '50000000-0000-4000-8000-000000000001',
      task_version_id: '50000000-0000-4000-8000-000000000002',
      processing_run_id: '50000000-0000-4000-8000-000000000003',
      status: 'waiting_clarification',
      clarification_count: 4,
      pending_clarification: null,
      failure_code: null,
    };
    expect(processingStateSchema.safeParse(invalid).success).toBe(false);
  });
});
