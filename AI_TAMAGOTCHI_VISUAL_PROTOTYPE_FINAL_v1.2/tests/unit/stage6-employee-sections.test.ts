import { describe, expect, it } from 'vitest';

import {
  achievements,
  companyAnalytics,
  currentGoalCycle,
  publicProfiles,
  scoringInfo,
  stage6TaskVersions,
} from '../../src/features/employee-sections/fixtures';

describe('Stage 6 employee surfaces contract fixtures', () => {
  it('keeps exactly three active goals with one system-assigned goal', () => {
    expect(currentGoalCycle.goals).toHaveLength(3);
    expect(currentGoalCycle.goals.filter((goal) => goal.source === 'system_assigned')).toHaveLength(1);
  });

  it('keeps immutable task versions newest-first', () => {
    expect(stage6TaskVersions.map((item) => item.version_no)).toEqual([2, 1]);
  });

  it('covers all three peer privacy projections without leaking raw input fields', () => {
    const levels = new Set(Object.values(publicProfiles).map((profile) => profile.privacy_level));
    expect(levels).toEqual(new Set(['closed', 'standard', 'open']));
    expect(JSON.stringify(publicProfiles)).not.toMatch(/raw_input|clarification|https?:\/\//i);
  });

  it('does not pretend a final achievement catalog exists', () => {
    expect(achievements.every((item) => item.code.startsWith('DEMO_CONTENT_PLACEHOLDER_'))).toBe(true);
  });

  it('keeps scoring fixed and non-overridable', () => {
    expect(scoringInfo.levels.map((level) => level.points)).toEqual([1, 5, 15, 40, 100]);
    expect(scoringInfo.manual_override_allowed).toBe(false);
  });

  it('keeps company analytics aggregate-only', () => {
    expect(companyAnalytics).not.toHaveProperty('employees');
    expect(companyAnalytics).not.toHaveProperty('directorates');
  });
});
