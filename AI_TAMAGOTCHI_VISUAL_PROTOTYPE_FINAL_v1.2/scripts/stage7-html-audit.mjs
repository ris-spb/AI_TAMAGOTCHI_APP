import fs from 'node:fs';
const html = fs.readFileSync(new URL('../docs/STAGE_7_MANAGEMENT_PREVIEW.html', import.meta.url), 'utf8');
const required = ['Director Dashboard','Executive Dashboard','Admin Panel','Пользователи и роли','Оргструктура','Корпоративный календарь','Taxonomy','AI Tools Directory','Audit / Technical Trace','Экспорт','403 · RBAC','DEMO · NONPRODUCTION'];
for (const item of required) if (!html.includes(item)) throw new Error(`missing preview content: ${item}`);
if (/Изменить Score|Редактировать Score|Override Score/i.test(html)) throw new Error('manual score override leaked into preview');
console.log('STAGE7_HTML_AUDIT=PASS');
console.log(`SURFACES=${required.length}`);
