import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const src = await readFile(new URL('../src/features/employee-sections/fixtures.ts', import.meta.url), 'utf8');
const screen = await readFile(new URL('../src/features/employee-sections/EmployeeSections.tsx', import.meta.url), 'utf8');

const goalBlock = src.match(/export const currentGoalCycle:[\s\S]*?closed_at: null,\n};/)?.[0] ?? '';
assert.ok(goalBlock, 'currentGoalCycle fixture missing');
assert.equal((goalBlock.match(/goal_id:/g) ?? []).length, 3, 'current goal cycle must contain exactly 3 goals');
assert.equal((goalBlock.match(/system_assigned/g) ?? []).length, 1, 'exactly one system-assigned goal expected');

const versionBlock = src.match(/export const stage6TaskVersions:[\s\S]*?\n];/)?.[0] ?? '';
assert.ok(versionBlock.indexOf('version_no: 2') < versionBlock.indexOf('version_no: 1'), 'fixture versions must be newest first');
assert.match(src, /privacy_level: 'closed'/);
assert.match(src, /privacy_level: 'standard'/);
assert.match(src, /privacy_level: 'open'/);
assert.equal((src.match(/DEMO_CONTENT_PLACEHOLDER_/g) ?? []).length, 2);
assert.match(src, /C1', points: 1/);
assert.match(src, /C2', points: 5/);
assert.match(src, /C3', points: 15/);
assert.match(src, /C4', points: 40/);
assert.match(src, /C5', points: 100/);
assert.match(src, /manual_override_allowed: false/);
assert.match(screen, /sort\(\(a, b\) => b\.version_no - a\.version_no\)/);
assert.match(screen, /Неполученные достижения заранее не показываются/);

console.log('STAGE6_FIXTURE_AUDIT=PASS');
console.log('CURRENT_GOALS=3');
console.log('SYSTEM_ASSIGNED_GOALS=1');
console.log('VERSIONS_NEWEST_FIRST=PASS');
console.log('PRIVACY_FIXTURES=3_LEVELS');
console.log('SCORING_FIXED=1,5,15,40,100');
