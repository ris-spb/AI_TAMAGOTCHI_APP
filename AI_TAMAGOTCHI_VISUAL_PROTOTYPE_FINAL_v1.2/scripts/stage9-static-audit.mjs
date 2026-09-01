import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const checks = [];
function check(label, condition) { checks.push([label, Boolean(condition)]); }

const router = read('src/routes/router.tsx');
const catalog = read('src/routes/routeCatalog.ts');
const shell = read('src/app/shell/AppShell.tsx');
const shellCss = read('src/app/shell/AppShell.module.css');
const navCss = read('src/app/shell/MobileBottomNavigation.module.css');
const home = read('src/features/home/HomeScreen.tsx');
const homeCss = read('src/features/home/HomeScreen.module.css');
const employeeCss = read('src/features/employee-sections/EmployeeSections.module.css');
const managementCss = read('src/features/management/ManagementScreens.module.css');
const demoCss = read('src/demo-controls/DemoControlPanel.module.css');
const tokens = read('src/design-system/tokens.css');
const index = read('index.html');
const result = read('src/features/ai-case/ResultAiCaseScreen.tsx');
const management = read('src/features/management/ManagementScreens.tsx');
const entry = read('src/features/entry/EntryScreens.tsx');

const activeIds = [...catalog.matchAll(/screenId:\s*'(SCR_[A-Z0-9_]+)'/g)].map((m) => m[1]);
const uniqueIds = [...new Set(activeIds)];
const implementedIds = [...router.matchAll(/case '(SCR_[A-Z0-9_]+)'/g)].map((m) => m[1]);
const implemented = new Set(implementedIds);

check('36 active semantic screens represented', uniqueIds.length === 36);
check('all 36 active screens have content implementation', uniqueIds.every((id) => implemented.has(id)));
check('Login implemented', router.includes("case 'SCR_AUTH_LOGIN': return <LoginScreen />"));
check('Onboarding implemented', router.includes("case 'SCR_ONBOARDING': return <OnboardingScreen />"));
check('Goal Setup implemented', router.includes("case 'SCR_GOAL_SETUP': return <GoalSetupScreen />"));
check('viewport-fit cover', index.includes('viewport-fit=cover'));
check('minimum hit token 44px', tokens.includes('--size-hit-min: 44px'));
check('visible focus baseline', tokens.includes(':focus-visible') && tokens.includes('outline-offset: 2px'));
check('skip link exists', shell.includes('Перейти к основному содержимому') && shellCss.includes('.skipLink:focus-visible'));
check('mobile nav target uses hit token', navCss.includes('min-height: var(--size-hit-min)'));
check('demo mobile nav contained in preset frame', navCss.includes('.nav.forceMobile { display: grid; position: absolute; }'));
check('segmented navigation >=44', employeeCss.includes('.segmented a{min-height:var(--size-hit-min)'));
check('Home goals surface >=44', homeCss.includes('.goalsSurface {') && homeCss.includes('min-height: 62px'));
check('Demo controls >=44', demoCss.includes('.close { min-width: var(--size-hit-min); min-height: var(--size-hit-min)') && demoCss.includes('min-height: var(--size-hit-min)'));
check('management inline action >=44', managementCss.includes('.mutedAction{min-height:var(--size-hit-min)'));
check('management table link >=44', managementCss.includes('.table a{min-height:var(--size-hit-min)'));
check('safe-area bottom navigation', navCss.includes('env(safe-area-inset-bottom)'));
check('safe-area main padding', shellCss.includes('env(safe-area-inset-bottom)'));
check('responsive mobile baseline 430', employeeCss.includes('@media(max-width:430px)'));
check('desktop management strategy', managementCss.includes('.tableWrap{overflow:auto') && managementCss.includes('.table{width:100%;border-collapse:collapse;min-width:720px}'));
check('reduced-motion native', tokens.includes('@media (prefers-reduced-motion: reduce)'));
check('reduced-motion demo branch', shell.includes('data-demo-reduced-motion'));
check('health dialog modal semantics', home.includes('aria-modal="true"') && home.includes('aria-describedby="health-detail-note"'));
check('health dialog Escape', home.includes("event.key === 'Escape'"));
check('health dialog focus trap', home.includes("event.key !== 'Tab'") && home.includes('previousFocus?.focus()'));
check('AI result announced', result.includes('role="status"') && result.includes('aria-live="polite"'));
check('export state announced', management.includes('className={styles.exportStatus} role="status" aria-live="polite"'));
check('forms retain explicit labels', entry.includes('<TextField label="Табельный номер"') && entry.includes('<TextField label="Номер телефона"'));
check('goal setup exactly two selection UI', entry.includes('selected.length === 2') && entry.includes('Выбрано: {selected.length} из 2'));
check('onboarding five steps', (entry.match(/title:/g) ?? []).length >= 5 && entry.includes('1 /') === false);
check('exact Home CTA preserved', catalog.includes("label: 'Добавить AI-задачу'"));
check('exact four-tab nav preserved', ['Главная','История','Рейтинг','Профиль'].every((label) => catalog.includes(`label: '${label}'`)));

const failed = checks.filter(([, ok]) => !ok);
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
if (failed.length) {
  console.error(`STAGE9_STATIC_AUDIT=FAIL failed=${failed.length}/${checks.length}`);
  process.exit(1);
}
console.log(`STAGE9_STATIC_AUDIT=PASS checks=${checks.length}`);
