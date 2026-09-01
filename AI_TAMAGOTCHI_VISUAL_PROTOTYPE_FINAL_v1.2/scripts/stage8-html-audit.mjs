import fs from 'node:fs';

const html = fs.readFileSync('docs/STAGE_8_MOTION_3D_PREVIEW.html', 'utf8');
const checks = [
  ['preview title', html.includes('Stage 8 — Motion / 3D / Ambient QA Preview')],
  ['3D requested QA state', html.includes('3D requested · final GLB external')],
  ['WebGL off state', html.includes('WebGL off / unsupported')],
  ['WebGL error state', html.includes('WebGL error')],
  ['loading preview state', html.includes('scene loading preview')],
  ['all six health states', ['happy','normal','bored','tired','very_weak','coma'].every((v) => html.includes(`<option>${v}</option>`))],
  ['reduced motion control', html.includes('Reduced motion') && html.includes("classList.toggle('reduced'" )],
  ['exact Home CTA', html.includes('Добавить AI-задачу')],
  ['exact mobile nav', ['Главная','История','Рейтинг','Профиль'].every((v) => html.includes(v))],
  ['Tier F diagnostics', html.includes('Tier F')],
  ['coma survives off/error fallback', html.includes("if(m==='off'||m==='error'){base.src=A.unavail;if(s==='coma'){mascot.src=A.coma;mascot.hidden=false}" )],
  ['healthy day branch does not add standalone mascot', html.includes("if(s==='happy'){base.src=A.home;cue.hidden=true;glow.hidden=false" )],
];
for (const [label, ok] of checks) {
  if (!ok) throw new Error(`FAIL ${label}`);
  console.log(`PASS ${label}`);
}
console.log(`STAGE8_HTML_AUDIT=PASS checks=${checks.length}`);
