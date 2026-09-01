import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const mustExist = [
  'src/routes/contracts.ts',
  'src/routes/routeCatalog.ts',
  'src/routes/router.tsx',
  'src/app/RouteGate.tsx',
  'src/app/roleAdapter.ts',
  'src/app/error-boundary/FatalBootstrapBoundary.tsx',
  'src/app/shell/AppShell.tsx',
  'src/app/shell/MobileBottomNavigation.tsx',
  'src/app/shell/DesktopNavigation.tsx',
  'src/app/shell/ScreenStateBoundary.tsx',
  'src/app/shell/RouteStates.tsx',
  'src/screens/SkeletonScreen.tsx',
  'src/screens/PublicSkeletonScreen.tsx',
  'tests/unit/stage3-routing.test.tsx',
  'docs/STAGE_3_SHELL_PREVIEW.html',
];
for (const rel of mustExist) {
  if (!fs.existsSync(path.join(root, rel))) throw new Error(`Missing ${rel}`);
}

const catalog = fs.readFileSync(path.join(root, 'src/routes/routeCatalog.ts'), 'utf8');
const routeEntryRe = /\{ screenId: '([^']+)', screenName: '[^']+', path: '[^']+', roles: \[[^\]]+\], routeClass: '[^']+', platform: '[^']+', shell: '[^']+' \}/g;
const screens = [...catalog.matchAll(routeEntryRe)].map((m) => m[1]);
if (screens.length !== 36) throw new Error(`Expected 36 active screens, got ${screens.length}`);
if (new Set(screens).size !== 36) throw new Error('Duplicate semantic screen IDs');
if (catalog.includes('SCR_TASKS_DESIGN_CANDIDATE')) throw new Error('Deprecated task candidate must not be routed');

for (const label of ['Главная', 'История', 'Рейтинг', 'Профиль']) {
  if (!catalog.includes(`label: '${label}'`)) throw new Error(`Missing mobile nav label: ${label}`);
}
const navSlice = catalog.slice(catalog.indexOf('export const MOBILE_PRIMARY_NAV'), catalog.indexOf('export const HOME_PRIMARY_CTA'));
for (const forbidden of ["label: 'Добавить'", "label: 'Задачи'"]) {
  if (navSlice.includes(forbidden)) throw new Error(`Superseded mobile nav item found: ${forbidden}`);
}
if (!catalog.includes("label: 'Добавить AI-задачу', to: '/ai-cases/new'")) throw new Error('Exact Home CTA contract missing');

const expectedRoutes = [
  '/login','/onboarding','/goals/setup','/','/ai-cases/new','/ai-cases/new/voice','/ai-cases/new/transcript',
  '/ai-cases/:taskId/processing','/ai-cases/:taskId/clarify','/ai-cases/:taskId/result','/ai-cases/:taskId','/ai-cases/:taskId/edit',
  '/history','/history/events','/goals','/rating','/rating/directorates','/rating/analytics','/rating/directorates/:directorateId',
  '/profiles/:employeeId','/profile','/profile/privacy','/profile/vacation','/profile/achievements','/profile/scoring','/notifications',
  '/director','/executive','/admin','/admin/users','/admin/org','/admin/calendar','/admin/taxonomy','/admin/tools','/admin/audit','/exports',
];
for (const route of expectedRoutes) {
  if (!catalog.includes(`path: '${route}'`)) throw new Error(`Missing route: ${route}`);
}

const shell = fs.readFileSync(path.join(root, 'src/app/shell/AppShell.tsx'), 'utf8');
if (!shell.includes("contract.routeClass === 'PRIMARY_TAB' || contract.routeClass === 'PRIMARY_OR_SELF'")) throw new Error('Employee primary-tab bottom-nav gate missing');
if (!shell.includes('MobileBottomNavigation')) throw new Error('Mobile shell navigation missing');
if (!shell.includes('DesktopNavigation')) throw new Error('Desktop responsive navigation missing');
if (!shell.includes('ScreenStateBoundary')) throw new Error('Screen state boundary missing');

const routeGate = fs.readFileSync(path.join(root, 'src/app/RouteGate.tsx'), 'utf8');
if (!routeGate.includes('roles.includes(currentRole)')) throw new Error('Role-aware UX gate missing');
if (!routeGate.includes('<ForbiddenState')) throw new Error('Forbidden route state missing');

const app = fs.readFileSync(path.join(root, 'src/app/App.tsx'), 'utf8');
if (!app.includes('FatalBootstrapBoundary')) throw new Error('Fatal bootstrap boundary missing');

const states = fs.readFileSync(path.join(root, 'src/app/shell/ScreenStateBoundary.tsx'), 'utf8');
for (const scenario of ["scenario === 'loading'", "scenario === 'error'", "scenario === 'empty'"]) {
  if (!states.includes(scenario)) throw new Error(`Data state branch missing: ${scenario}`);
}

const navCss = fs.readFileSync(path.join(root, 'src/app/shell/MobileBottomNavigation.module.css'), 'utf8');
if (!navCss.includes('grid-template-columns: repeat(4')) throw new Error('Mobile navigation must have four equal columns');
if (!navCss.includes('@media (min-width: 768px)')) throw new Error('Responsive bottom-nav switch missing');
const desktopCss = fs.readFileSync(path.join(root, 'src/app/shell/DesktopNavigation.module.css'), 'utf8');
if (!desktopCss.includes('@media (min-width: 768px)')) throw new Error('Responsive desktop navigation missing');

const source = [catalog, shell, routeGate, navCss, desktopCss].join('\n');
for (const forbidden of ['linear-gradient(', 'radial-gradient(', 'glassmorphism']) {
  if (source.includes(forbidden)) throw new Error(`Forbidden shell visual pattern: ${forbidden}`);
}

console.log('STAGE3_STATIC_AUDIT=PASS');
console.log(`ACTIVE_SCREENS=${screens.length}`);
console.log('MOBILE_NAV=Главная|История|Рейтинг|Профиль');
console.log('HOME_CTA=Добавить AI-задачу');
console.log('ROLE_GUARD=PASS');
console.log('RESPONSIVE_SHELL=PASS');
console.log('BOUNDARIES=BOOTSTRAP|SCREEN|DATA');
