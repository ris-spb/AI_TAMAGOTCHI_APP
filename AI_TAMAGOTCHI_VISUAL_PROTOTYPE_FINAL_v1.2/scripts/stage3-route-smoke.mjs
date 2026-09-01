import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/routes/routeCatalog.ts'), 'utf8');
const entryRe = /\{ screenId: '([^']+)', screenName: '([^']+)', path: '([^']+)', roles: \[([^\]]+)\], routeClass: '([^']+)', platform: '([^']+)', shell: '([^']+)' \}/g;
const entries = [];
for (const m of source.matchAll(entryRe)) {
  const roles = [...m[4].matchAll(/'([^']+)'/g)].map((r) => r[1]);
  entries.push({ screenId: m[1], screenName: m[2], path: m[3], roles, routeClass: m[5], platform: m[6], shell: m[7] });
}
if (entries.length !== 36) throw new Error(`Route parser expected 36 entries, got ${entries.length}`);

const roles = ['employee', 'director', 'executive', 'admin'];
const accessible = Object.fromEntries(roles.map((role) => [role, []]));
for (const entry of entries) {
  if (entry.roles.includes('public')) continue;
  for (const role of roles) {
    if (entry.roles.includes('authenticated') || entry.roles.includes(role)) accessible[role].push(entry.screenId);
  }
}

for (const role of roles) {
  if (accessible[role].length === 0) throw new Error(`No routes for role ${role}`);
}
if (!accessible.employee.includes('SCR_HOME')) throw new Error('Employee cannot reach Home');
if (accessible.director.includes('SCR_HOME')) throw new Error('Director must not receive employee Home route');
if (!accessible.director.includes('SCR_DIRECTOR_DASH')) throw new Error('Director dashboard missing');
if (!accessible.executive.includes('SCR_EXEC_DASH')) throw new Error('Executive dashboard missing');
if (!accessible.admin.includes('SCR_ADMIN_PANEL')) throw new Error('Admin shell missing');
if (accessible.employee.includes('SCR_ADMIN_PANEL')) throw new Error('Employee must not reach Admin shell');

console.log('STAGE3_ROUTE_SMOKE=PASS');
console.log(`ROUTES=${entries.length}`);
for (const role of roles) console.log(`${role.toUpperCase()}_ACCESSIBLE=${accessible[role].length}`);
