import type { HomeResponse, MascotState } from '../mock-api/contracts';
import { deterministicMascotHp } from './demo';

const GOAL_IDS = [
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
  '33333333-3333-4333-8333-333333333333',
] as const;

const goalTargets = [3, 2, 1] as const;

export type HomeFixtureOptions = {
  readonly healthState: MascotState;
  readonly streak: number;
  readonly goalProgress: readonly [number, number, number];
  readonly empty?: boolean;
};

export function buildHomeFixture({ healthState, streak, goalProgress, empty = false }: HomeFixtureOptions): HomeResponse {
  const safeStreak = Math.max(0, Math.trunc(streak));
  const hp = deterministicMascotHp[healthState];

  return {
    pet: {
      hp,
      health_state: healthState,
      in_vacation: false,
      current_streak: safeStreak,
      best_streak: Math.max(14, safeStreak),
      // These are part of the final DTO but must not be rendered persistently on Home.
      evolution_xp: 325,
      evolution_stage: 'E2',
      evolution_branch: null,
      coma_recovery_active_days: healthState === 'coma' ? 0 : 0,
    },
    today_task_count: empty ? 0 : 2,
    goals: empty
      ? []
      : [
          {
            goal_id: GOAL_IDS[0],
            display_text: 'Используй ИИ для работы с данными — 3 кейса',
            current_value: Math.min(Math.max(0, goalProgress[0]), goalTargets[0]),
            target_value: goalTargets[0],
            completed: goalProgress[0] >= goalTargets[0],
            source: 'employee_choice',
          },
          {
            goal_id: GOAL_IDS[1],
            display_text: 'Попробуй 2 разных AI-инструмента',
            current_value: Math.min(Math.max(0, goalProgress[1]), goalTargets[1]),
            target_value: goalTargets[1],
            completed: goalProgress[1] >= goalTargets[1],
            source: 'employee_choice',
          },
          {
            goal_id: GOAL_IDS[2],
            display_text: 'Выполни 1 AI-кейс уровня C3+',
            current_value: Math.min(Math.max(0, goalProgress[2]), goalTargets[2]),
            target_value: goalTargets[2],
            completed: goalProgress[2] >= goalTargets[2],
            source: 'system_assigned',
          },
        ],
    unread_notification_count: empty ? 0 : 2,
    ambient_message: empty ? null : 'Санкт-Петербург · утро. В терминале светло.',
  };
}
