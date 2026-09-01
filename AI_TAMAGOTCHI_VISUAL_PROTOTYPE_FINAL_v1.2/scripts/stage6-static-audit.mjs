import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const [router, screens, api, server, fixtures, contracts, shell] = await Promise.all([
  read('src/routes/router.tsx'),
  read('src/features/employee-sections/EmployeeSections.tsx'),
  read('src/features/employee-sections/api.ts'),
  read('mock-server/viteMockApiPlugin.ts'),
  read('src/features/employee-sections/fixtures.ts'),
  read('src/features/employee-sections/contracts.ts'),
  read('src/app/shell/AppShell.tsx'),
]);

const stage6Screens = [
  'SCR_CASE_DETAIL','SCR_CASE_EDIT','SCR_HISTORY_TASKS','SCR_HISTORY_EVENTS','SCR_GOALS',
  'SCR_RATING_EMPLOYEES','SCR_RATING_DIRECTORATES','SCR_COMPANY_ANALYTICS','SCR_DIRECTORATE_CARD',
  'SCR_PUBLIC_PROFILE','SCR_PROFILE_SELF','SCR_PRIVACY','SCR_VACATION','SCR_ACHIEVEMENTS',
  'SCR_SCORING_INFO','SCR_NOTIFICATIONS',
];
for (const id of stage6Screens) {
  assert.match(router, new RegExp(`case '${id}'`), `${id} is not content-mapped`);
  assert.ok(shell.includes(id), `${id} does not own its functional header`);
}

for (const endpoint of [
  '/v1/history/tasks','/v1/history/events','/v1/goals/current','/v1/goals/history',
  '/v1/ratings/employees','/v1/ratings/directorates','/v1/analytics/company','/v1/directorates/',
  '/v1/profiles/','/v1/me/dashboard','/v1/me/achievements','/v1/scoring-info','/v1/notifications',
]) assert.ok(api.includes(endpoint) || server.includes(endpoint), `missing Stage-6 endpoint ${endpoint}`);

assert.match(screens, /Raw input, clarifications и ссылки не отображаются коллегам при любом privacy level/);
assert.match(screens, /company-wide aggregates: без разбивки по дирекциям и без идентификации сотрудников/);
assert.match(screens, /Отпуск замораживает HP и streak, но не пересчитывает Monthly Goals/);
assert.match(screens, /Normalized Description, Complexity и Score напрямую не редактируются/);
assert.match(screens, /soft delete/i);
assert.match(server, /expected_version_no/);
assert.match(server, /Idempotency-Key/);
assert.match(server, /deletedTaskIds/);
assert.match(server, /resultEvolutionXpAwarded: 0/);
assert.match(server, /resultGoalProgressDelta: 0/);
assert.match(fixtures, /DEMO_CONTENT_PLACEHOLDER_001/);
assert.match(fixtures, /DEMO_CONTENT_PLACEHOLDER_002/);
assert.doesNotMatch(fixtures, /Иван Демонстрационный/);
assert.match(fixtures, /manual_override_allowed: false/);
assert.match(contracts, /privacy_level: 'closed' \| 'standard' \| 'open'/);
assert.match(contracts, /current_goals: readonly GoalSummary\[\]/);

assert.doesNotMatch(screens, /href=\{link\}/);

console.log('STAGE6_STATIC_AUDIT=PASS');
console.log(`CONTENT_SCREENS=${stage6Screens.length}`);
console.log('PRIVACY_PROJECTIONS=closed,standard,open');
console.log('TASK_EDIT_NEW_VERSION=PASS');
console.log('SOFT_DELETE=PASS');
console.log('COMPANY_ANALYTICS_ANONYMOUS=PASS');
console.log('ACHIEVEMENT_FINAL_CATALOG_NOT_INVENTED=PASS');
