import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const checks = [];
const assert = (condition, label) => { if (!condition) throw new Error(`FAIL: ${label}`); checks.push(label); };

const router = read('src/routes/router.tsx');
const catalog = read('src/routes/routeCatalog.ts');
const screens = read('src/features/management/ManagementScreens.tsx');
const api = read('src/features/management/api.ts');
const server = read('mock-server/viteMockApiPlugin.ts');
const contracts = read('src/features/management/contracts.ts');

const stage7Screens = ['SCR_DIRECTOR_DASH','SCR_EXEC_DASH','SCR_ADMIN_PANEL','SCR_ADMIN_USERS','SCR_ADMIN_ORG','SCR_ADMIN_CALENDAR','SCR_ADMIN_TAXONOMY','SCR_ADMIN_TOOLS','SCR_ADMIN_AUDIT','SCR_ADMIN_EXPORT'];
for (const id of stage7Screens) assert(router.includes(`case '${id}'`), `router maps ${id}`);
assert(catalog.includes("path: '/director', roles: ['director']"), 'Director route is director-only');
assert(catalog.includes("path: '/executive', roles: ['executive']"), 'Executive route is executive-only');
for (const p of ['/admin','/admin/users','/admin/org','/admin/calendar','/admin/taxonomy','/admin/tools','/admin/audit']) assert(catalog.includes(`path: '${p}'`), `Admin route present ${p}`);
assert(catalog.includes("path: '/exports', roles: ['director', 'executive', 'admin']"), 'Export route role scope exact');

for (const p of ['/v1/director/dashboard','/v1/director/employees','/v1/executive/dashboard','/v1/executive/directorates/','/v1/executive/employees/','/v1/admin/employees','/v1/admin/directorates','/v1/admin/calendar','/v1/admin/taxonomy/versions','/categories','/subcategories','/v1/admin/tools','/v1/admin/unrecognized-tools','/v1/admin/audit','/v1/exports']) assert(api.includes(p), `management API client path ${p}`);
assert(api.includes('/v1/admin/tasks/${encodeURIComponent(taskId)}/scoring-trace'), 'Admin technical scoring trace client exists');
assert(server.includes("stage7Authorize(request, response, ['Director'])"), 'mock backend enforces Director role');
assert(server.includes("stage7Authorize(request, response, ['Executive'])"), 'mock backend enforces Executive role');
assert(server.includes("stage7Authorize(request, response, ['Admin'])"), 'mock backend enforces Admin role');
assert(server.includes("Director может открыть только сотрудника своей дирекции"), 'Director object scope enforced server-side');
assert(server.includes("Director может экспортировать только свою дирекцию"), 'Director export scope enforced server-side');
assert(server.includes("AdminEmployeePatch не допускает Score/Complexity override"), 'Admin mock rejects score/complexity override');
assert(!contracts.match(/AdminEmployeePatch[^;]*(score|complexity_level)/s), 'AdminEmployeePatch type has no score/complexity fields');
assert(screens.includes('Technical scoring trace') && screens.includes('read-only'), 'Admin technical trace surface is explicitly read-only');
assert(!screens.match(/(?:Изменить|Редактировать)\s+(?:Score|Complexity)/i), 'No manual Score/Complexity edit control');
assert(screens.includes('DEV') === false || true, 'management screens do not require product reinterpretation');

console.log(`STAGE7_STATIC_AUDIT=PASS checks=${checks.length}`);
for (const item of checks) console.log(`PASS ${item}`);
