import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(`STAGE4_STATIC_AUDIT_FAIL: ${message}`);
};

const home = read('src/features/home/HomeScreen.tsx');
const scene = read('src/features/home/SceneHostBoundary.tsx');
const assets = read('src/assets/productionAssets.ts');
const router = read('src/routes/router.tsx');
const nav = read('src/routes/routeCatalog.ts');
const panel = read('src/demo-controls/DemoControlPanel.tsx');
const shell = read('src/app/shell/AppShell.tsx');
const mock = read('mock-server/viteMockApiPlugin.ts');
const fixture = read('src/fixtures/home.ts');

assert(router.includes("case 'SCR_HOME': return <HomeScreen />") || router.includes("contract.screenId === 'SCR_HOME'"), 'SCR_HOME must route to content-aware HomeScreen');
assert(router.includes('<HomeScreen />'), 'HomeScreen must be materialized');
assert(nav.includes("label: 'Добавить AI-задачу'"), 'exact Home CTA is missing');
assert(nav.includes("['Главная',") === false, 'route catalog should stay data-based, not duplicate a new nav array');
for (const label of ['Главная', 'История', 'Рейтинг', 'Профиль']) assert(nav.includes(`label: '${label}'`), `mobile nav label ${label} missing`);
assert(!nav.includes("label: 'Добавить', to:"), 'legacy Add navigation tab reintroduced');
assert(!nav.includes("label: 'Задачи', to:"), 'legacy Tasks navigation tab reintroduced');

assert(home.includes('Цели месяца'), 'compact Monthly Goals surface missing');
assert(home.includes('HOME_PRIMARY_CTA.label'), 'Home CTA must consume contract constant');
assert(!home.includes('annual_score'), 'Annual Score must not be rendered on Home');
assert(!home.includes('evolution_xp'), 'Evolution XP must not be rendered on Home');
assert(!home.includes('rank'), 'rank must not be rendered on Home');
assert(home.includes('HealthDetailDialog'), 'detail-on-demand HP surface missing');
assert(home.includes('hp={home.pet.hp}'), 'HP should be consumed only by detail-on-demand dialog');
assert(!home.includes('game-action'), 'permanent game action row detected');

for (const exact of [
  'IMG_Loading_Preview_390x844_v1.0.webp',
  'IMG_3D_Unavailable_390x844_v1.0.webp',
  'BG_Home_Pulkovo_Default_1024x1536_v2.2.webp',
  'MSC_Lyuboznayka_Happy_1254_v2.2.webp',
  'MSC_Lyuboznayka_Normal_1254_v2.2.webp',
  'MSC_Lyuboznayka_Bored_1254_v2.2.webp',
  'MSC_Lyuboznayka_Tired_1254_v2.2.webp',
  'MSC_Lyuboznayka_VeryWeak_1254_v2.2.webp',
  'MSC_Lyuboznayka_Coma_1254_v2.2.webp',
]) assert(assets.includes(exact), `approved layered Home path missing: ${exact}`);
assert(!scene.toLowerCase().includes('.glb'), 'Home scene must not reference fake/final GLB');
assert(scene.includes('productionAssets.approvedHome.background'), 'one constant approved Home background is required');
assert(scene.includes('stateMascots[healthState]'), 'health-state switch must change mascot asset');
for (const state of ['happy', 'normal', 'bored', 'tired', 'very_weak', 'coma']) assert(assets.includes(`${state}:`), `state-specific mascot mapping missing: ${state}`);
assert(scene.includes('No proxy/fake GLB is introduced'), 'static fallback boundary must explicitly reject fake GLB');

for (const requiredControl of ['Роль', 'Home data state', 'HP / mascot state', 'Monthly Goals progress', 'Streak', '3D requested mode', 'Viewport preset', 'Reduced motion simulation']) assert(panel.includes(requiredControl), `Demo Control Panel missing ${requiredControl}`);
assert(panel.includes('DEV-ONLY'), 'Demo panel must be visibly dev-only');
assert(shell.includes("data-demo-reduced-motion"), 'reduced-motion simulation is not connected to shell');
assert(shell.includes("demo390") && shell.includes("demo430") && shell.includes("demoDesktop"), 'viewport presets not connected');

assert(mock.includes("const HOME_PATH = '/v1/home'"), 'mock /v1/home endpoint missing');
for (const field of ['pet', 'today_task_count', 'goals', 'unread_notification_count', 'ambient_message']) assert(fixture.includes(field), `HomeResponse fixture field missing: ${field}`);
for (const errorCode of ['OBJECT_SCOPE_FORBIDDEN', 'INTERNAL_ERROR']) assert(mock.includes(errorCode), `controlled API scenario missing ${errorCode}`);

console.log('STAGE4_STATIC_AUDIT=PASS');
console.log('HOME_FORBIDDEN_PERSISTENT_METRICS=PASS');
console.log('HOME_APPROVED_FALLBACK_PATHS=PASS');
console.log('HOME_WEBGL_INDEPENDENCE_STATIC=PASS');
console.log('DEMO_CONTROL_PANEL_CONTRACT=PASS');
