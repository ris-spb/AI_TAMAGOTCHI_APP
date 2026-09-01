import { describe, expect, it } from 'vitest';

import healthFixture from '../../src/fixtures/mock-health.json';
import { mockHealthResponseSchema } from '../../src/mock-api/schema';

describe('deterministic mock fixture', () => {
  it('matches its runtime schema', () => {
    expect(mockHealthResponseSchema.parse(healthFixture)).toEqual(healthFixture);
  });
});
