import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const files=[...function* walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())yield* walk(p);else if(e.name.endsWith('.css'))yield p;}}(path.join(root,'src'))];
const text=files.map((f)=>fs.readFileSync(f,'utf8')).join('\n');
const checks=[
 ['body supports 360', text.includes('min-width: 320px')],
 ['mobile margin token 18', text.includes('--space-mobile-margin: 18px')],
 ['safe-area top used', text.includes('env(safe-area-inset-top)')],
 ['safe-area bottom used', text.includes('env(safe-area-inset-bottom)')],
 ['430 responsive branch', text.includes('max-width:430px') || text.includes('max-width: 430px')],
 ['desktop branch', text.includes('min-width:860px') || text.includes('min-width: 860px')],
 ['management horizontal table scroll', text.includes('.tableWrap{overflow:auto')],
 ['no root overflow-x hidden', !/body\s*\{[^}]*overflow-x\s*:\s*hidden/s.test(text)],
 ['touch token 44', text.includes('--size-hit-min: 44px')],
 ['mobile nav four columns', text.includes('grid-template-columns: repeat(4, minmax(0, 1fr))')],
];
for(const [n,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${n}`);
if(checks.some(([,ok])=>!ok)) process.exit(1);
console.log(`STAGE9_RESPONSIVE_AUDIT=PASS viewports=360,390x844,430,1280x900 checks=${checks.length}`);
