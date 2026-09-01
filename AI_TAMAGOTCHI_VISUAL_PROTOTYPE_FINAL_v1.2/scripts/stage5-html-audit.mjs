import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../docs/STAGE_5_AI_CASE_PREVIEW.html', import.meta.url), 'utf8');
for (const text of ['Добавить AI-задачу','Записать голосом','Проверьте текст','Обрабатываем AI-задачу','Нужно короткое уточнение','AI-задача учтена']) assert.ok(html.includes(text));
assert.ok(html.includes('SELF_TEST=PASS'));
assert.ok(html.includes('из максимум 3'));
assert.ok(!html.includes('C6'));
console.log('STAGE5_HTML_AUDIT=PASS');
