import { create } from 'zustand';

import type { ClarificationScenario, ComplexityLevel } from '../features/ai-case/contracts';
import type { DataScenario, DemoRole, MascotState } from '../mock-api/contracts';

export const threeModes = ['on', 'off', 'error'] as const;
export type ThreeMode = (typeof threeModes)[number];

export const viewportPresets = ['responsive', '390x844', '430-mobile', 'desktop'] as const;
export type ViewportPreset = (typeof viewportPresets)[number];

export const aiCaseScenarios = ['success', 'processing_error', 'stt_error', 'network_error', 'microphone_denied'] as const;
export type AiCaseScenario = (typeof aiCaseScenarios)[number];

export type DemoControlState = {
  role: DemoRole;
  dataScenario: DataScenario;
  mascotState: MascotState;
  streak: number;
  goalProgress: readonly [number, number, number];
  threeMode: ThreeMode;
  reducedMotion: boolean;
  viewportPreset: ViewportPreset;
  aiCaseScenario: AiCaseScenario;
  aiCaseClarifications: ClarificationScenario;
  aiCaseResultLevel: ComplexityLevel;
  setRole: (role: DemoRole) => void;
  setDataScenario: (scenario: DataScenario) => void;
  setMascotState: (state: MascotState) => void;
  setStreak: (streak: number) => void;
  setGoalProgress: (progress: readonly [number, number, number]) => void;
  setThreeMode: (mode: ThreeMode) => void;
  setReducedMotion: (enabled: boolean) => void;
  setViewportPreset: (preset: ViewportPreset) => void;
  setAiCaseScenario: (scenario: AiCaseScenario) => void;
  setAiCaseClarifications: (count: ClarificationScenario) => void;
  setAiCaseResultLevel: (level: ComplexityLevel) => void;
};

export const useDemoControlStore = create<DemoControlState>((set) => ({
  role: 'Employee',
  dataScenario: 'success',
  mascotState: 'happy',
  streak: 7,
  goalProgress: [1, 2, 0],
  threeMode: 'on',
  reducedMotion: false,
  viewportPreset: 'responsive',
  aiCaseScenario: 'success',
  aiCaseClarifications: 2,
  aiCaseResultLevel: 'C3',
  setRole: (role) => set({ role }),
  setDataScenario: (dataScenario) => set({ dataScenario }),
  setMascotState: (mascotState) => set({ mascotState }),
  setStreak: (streak) => set({ streak: Math.max(0, Math.trunc(streak)) }),
  setGoalProgress: (goalProgress) => set({ goalProgress }),
  setThreeMode: (threeMode) => set({ threeMode }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setViewportPreset: (viewportPreset) => set({ viewportPreset }),
  setAiCaseScenario: (aiCaseScenario) => set({ aiCaseScenario }),
  setAiCaseClarifications: (aiCaseClarifications) => set({ aiCaseClarifications }),
  setAiCaseResultLevel: (aiCaseResultLevel) => set({ aiCaseResultLevel }),
}));
