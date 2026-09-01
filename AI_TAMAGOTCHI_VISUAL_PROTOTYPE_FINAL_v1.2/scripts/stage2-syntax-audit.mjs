import fs from 'node:fs';
import path from 'node:path';
import ts from '/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js';

const root = path.resolve(import.meta.dirname, '..');
const roots = ['src', 'tests/unit'];
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) files.push(full);
  }
}
for (const rel of roots) walk(path.join(root, rel));
let diagnostics = [];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const result = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      isolatedModules: true,
    },
  });
  diagnostics.push(...(result.diagnostics ?? []).map((d) => ({ file, d })));
}
if (diagnostics.length) {
  for (const { file, d } of diagnostics) {
    console.error(`${path.relative(root, file)}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
  }
  process.exit(1);
}
console.log('STAGE2_TS_SYNTAX_AUDIT=PASS');
console.log(`FILES=${files.length}`);
