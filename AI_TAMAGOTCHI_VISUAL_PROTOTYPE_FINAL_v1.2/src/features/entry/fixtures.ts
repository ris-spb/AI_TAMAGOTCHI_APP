import type { GoalOption } from './contracts';

export const DEMO_PERSONNEL_NUMBER = 'DEMO-1001';
export const DEMO_PHONE = '+7 900 000-00-01';
export const ONBOARDING_CONTENT_VERSION = 'prototype-onboarding-v1';
export const GOAL_SETUP_CYCLE_ID = '64000000-0000-4000-8000-000000000009';

export const goalSetupOptions: readonly GoalOption[] = [
  { option_id: '64100000-0000-4000-8000-000000000001', display_text: 'Выполни 3 AI-кейса уровня C3+', target_value: 3 },
  { option_id: '64100000-0000-4000-8000-000000000002', display_text: 'Используй ИИ минимум в 8 рабочих днях', target_value: 8 },
  { option_id: '64100000-0000-4000-8000-000000000003', display_text: 'Примени ИИ минимум в 3 задачах по работе с данными', target_value: 3 },
  { option_id: '64100000-0000-4000-8000-000000000004', display_text: 'Попробуй минимум 2 разных AI-инструмента', target_value: 2 },
  { option_id: '64100000-0000-4000-8000-000000000005', display_text: 'Выполни 2 AI-кейса из новой для тебя категории', target_value: 2 },
];
