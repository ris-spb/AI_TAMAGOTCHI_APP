import { describe, expect, it } from 'vitest';

import { goalSetupOptions } from '../../src/features/entry/fixtures';
import { screenRouteCatalog } from '../../src/routes/routeCatalog';

describe('Stage 9 repaired entry/gate screens', () => {
  it('keeps exactly five deterministic goal options', () => {
    expect(goalSetupOptions).toHaveLength(5);
    expect(new Set(goalSetupOptions.map((option) => option.option_id)).size).toBe(5);
  });

  it('keeps Login, Onboarding and Goal Setup in the active 36-screen contract', () => {
    const ids = new Set(screenRouteCatalog.map((screen) => screen.screenId));
    expect(ids.has('SCR_AUTH_LOGIN')).toBe(true);
    expect(ids.has('SCR_ONBOARDING')).toBe(true);
    expect(ids.has('SCR_GOAL_SETUP')).toBe(true);
    expect(screenRouteCatalog).toHaveLength(36);
  });
});
