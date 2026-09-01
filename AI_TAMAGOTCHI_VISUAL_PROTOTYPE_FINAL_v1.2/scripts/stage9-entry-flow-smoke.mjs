import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const screens=fs.readFileSync(path.join(root,'src/features/entry/EntryScreens.tsx'),'utf8');
const fixtures=fs.readFileSync(path.join(root,'src/features/entry/fixtures.ts'),'utf8');
const server=fs.readFileSync(path.join(root,'mock-server/viteMockApiPlugin.ts'),'utf8');
const checks=[
  ['auth endpoint',server.includes("path === '/v1/auth/verify'")],
  ['onboarding GET',server.includes("path === '/v1/me/onboarding' && method === 'GET'")],
  ['onboarding complete',server.includes("path === '/v1/me/onboarding/complete' && method === 'POST'")],
  ['goal setup GET/POST',(server.match(/path === '\/v1\/goals\/setup'/g)||[]).length>=2],
  ['auth no self registration',screens.includes('Самостоятельной регистрации аккаунта в MVP нет')],
  ['onboarding five topics',['AI-Тамагочи','выполненные AI-задачи','C1–C5','Любознайка','Monthly Goals'].every(x=>screens.includes(x))],
  ['five goal fixtures',(fixtures.match(/option_id:/g)||[]).length===5],
  ['exactly two selection',screens.includes('selected.length === 2')],
  ['server assigns third',server.includes("source: 'system_assigned'")],
  ['idempotency onboarding',screens.includes('prototype-onboarding-complete-v1') && server.includes("Idempotency-Key обязателен")],
  ['idempotency goals',screens.includes('prototype-goal-setup-')],
];
for(const [label,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${label}`);
if(checks.some(([,ok])=>!ok)) process.exit(1);
console.log(`STAGE9_ENTRY_FLOW_SMOKE=PASS checks=${checks.length}`);
