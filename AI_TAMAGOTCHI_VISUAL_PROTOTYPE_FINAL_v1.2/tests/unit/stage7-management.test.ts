import { describe, expect, it } from 'vitest';

import { adminEmployees, directorDashboard, executiveDashboard, scoringTrace, taxonomyVersions, tools } from '../../src/features/management/fixtures';

const SCORE_FIELDS = new Set(['score', 'complexity_level']);

describe('Stage 7 management/admin contract fixtures', () => {
  it('keeps Director scoped to exactly one directorate', () => {
    expect(directorDashboard.directorate_id).toBeTruthy();
    expect(directorDashboard.employees.every((item) => item.directorate_id === directorDashboard.directorate_id)).toBe(true);
  });

  it('keeps Executive dataset company-wide and without admin configuration fields', () => {
    expect(executiveDashboard.directorates.length).toBeGreaterThan(1);
    expect(executiveDashboard).not.toHaveProperty('taxonomy');
    expect(executiveDashboard).not.toHaveProperty('users');
    expect(executiveDashboard).not.toHaveProperty('calendar');
  });

  it('keeps admin employee DTO free of manual score override', () => {
    for (const employee of adminEmployees) {
      for (const key of Object.keys(employee)) expect(SCORE_FIELDS.has(key)).toBe(false);
    }
  });

  it('technical trace is read-only evidence with fixed score semantics', () => {
    expect(['C1','C2','C3','C4','C5']).toContain(scoringTrace.complexity_level);
    expect([1,5,15,40,100]).toContain(scoringTrace.score);
    expect(scoringTrace.clarification_count).toBeLessThanOrEqual(3);
  });

  it('provides versioned taxonomy and canonical tools without inventing retro-reclassification', () => {
    expect(taxonomyVersions.some((version) => version.status === 'active')).toBe(true);
    expect(taxonomyVersions.some((version) => version.status === 'draft')).toBe(true);
    expect(tools.every((tool) => typeof tool.active === 'boolean')).toBe(true);
  });
});
