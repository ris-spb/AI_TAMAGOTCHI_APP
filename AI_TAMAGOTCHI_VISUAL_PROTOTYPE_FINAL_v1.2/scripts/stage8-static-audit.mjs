import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const assertions = [];
const check = (label, condition) => { if (!condition) throw new Error(`FAIL: ${label}`); assertions.push(label); };

const tokens = read('src/design-system/tokens.css');
for (const [name, value] of [
  ['navigation','200ms'], ['navigation-fast','180ms'], ['button-press','140ms'], ['case-completion','360ms'],
  ['mascot-short','600ms'], ['mascot-base','700ms'], ['mascot-strong','900ms'], ['major-achievement','1600ms'],
  ['modal-enter','240ms'], ['modal-exit','200ms']
]) check(`motion token ${name}=${value}`, tokens.includes(`--motion-${name}: ${value}`));
check('functional easing', tokens.includes('--ease-functional: cubic-bezier(0.2, 0, 0, 1)'));
check('reduced motion branch', tokens.includes('@media (prefers-reduced-motion: reduce)'));

const runtime = read('src/three/runtimeContract.ts');
check('final production 3D false', runtime.includes('FINAL_PRODUCTION_3D_AVAILABLE = false'));
check('Tier F fallback', runtime.includes("tier: 'F'"));
check('no business mutation in runtime contract', !/score|evolution_xp|goal.*delta|hp.*delta/i.test(runtime));

const scene = read('src/features/home/SceneHostBoundary.tsx');
check('scene lifecycle exposed', scene.includes('data-scene-lifecycle'));
check('runtime tier exposed', scene.includes('data-runtime-tier'));
check('approved ambient layer', scene.includes('<AmbientLayer'));
check('no Three canvas without final binary', !scene.includes('<Canvas'));
check('one constant approved Pulkovo background', scene.includes('productionAssets.approvedHome.background'));
check('state-specific mascot lookup', scene.includes('stateMascots[healthState]'));
check('layered static scene explicitly approved', scene.includes('Approved layered static Home v2.2'));
check('no legacy happy/coma state-only overlay gate', !scene.includes('useHealthyComposite') && !scene.includes('useComaOverlay'));
const demoStore = read('src/demo-controls/store.ts');
check('default demo requests realtime and truthfully falls back to Tier F', demoStore.includes("threeMode: 'on'"));

const home = read('src/features/home/HomeScreen.tsx');
check('exact Home CTA remains external contract', home.includes('HOME_PRIMARY_CTA'));
for (const forbidden of ['Annual Score', 'Evolution XP']) check(`forbidden Home persistent ${forbidden} absent`, !home.includes(`>${forbidden}<`));

const resultCss = read('src/features/ai-case/AiCaseFlow.module.css');
check('AI-case completion 360ms token used', resultCss.includes('var(--motion-case-completion)'));
const shellCss = read('src/app/shell/AppShell.module.css');
check('navigation route motion uses token', shellCss.includes('var(--motion-navigation)'));
check('demo reduced motion supported', shellCss.includes("data-demo-reduced-motion='true'"));

console.log(`STAGE8_STATIC_AUDIT=PASS assertions=${assertions.length}`);
for (const a of assertions) console.log(`PASS ${a}`);
