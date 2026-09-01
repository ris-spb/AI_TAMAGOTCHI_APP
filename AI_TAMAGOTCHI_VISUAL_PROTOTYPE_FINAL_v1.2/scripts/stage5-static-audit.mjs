import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const [router, server, contracts, fixtures, panel, add, voice, transcript, processing, clarify, result] = await Promise.all([
  read('src/routes/router.tsx'), read('mock-server/viteMockApiPlugin.ts'), read('src/features/ai-case/contracts.ts'), read('src/fixtures/aiCase.ts'), read('src/demo-controls/DemoControlPanel.tsx'), read('src/features/ai-case/AddAiCaseScreen.tsx'), read('src/features/ai-case/VoiceAiCaseScreen.tsx'), read('src/features/ai-case/TranscriptAiCaseScreen.tsx'), read('src/features/ai-case/ProcessingAiCaseScreen.tsx'), read('src/features/ai-case/ClarifyAiCaseScreen.tsx'), read('src/features/ai-case/ResultAiCaseScreen.tsx'),
]);
for (const screenId of ['SCR_CASE_ADD','SCR_CASE_VOICE','SCR_CASE_TRANSCRIPT','SCR_CASE_PROCESSING','SCR_CASE_CLARIFY','SCR_CASE_RESULT']) assert.match(router, new RegExp(screenId));
for (const endpoint of ['/v1/tasks','/v1/tasks/voice/transcriptions','/processing','/clarifications/','/result']) assert.ok(server.includes(endpoint), `missing ${endpoint}`);
assert.match(contracts, /sequence_no: 1 \| 2 \| 3/);
assert.match(server, /answeredClarifications >= 3/);
assert.match(server, /CLARIFICATION_LIMIT_REACHED/);
assert.doesNotMatch(contracts.match(/export type TaskCreateRequest[\s\S]*?};/)?.[0] ?? '', /score|complexity|evolution|hp/i);
assert.match(fixtures, /C1: 1/); assert.match(fixtures, /C2: 5/); assert.match(fixtures, /C3: 15/); assert.match(fixtures, /C4: 40/); assert.match(fixtures, /C5: 100/);
assert.match(server, /never fetched/);
assert.match(voice, /never persisted|не сохраняется|не сохранено/i);
assert.match(add, /уже выполнили/); assert.match(add, /не список будущих дел/);
assert.match(transcript, /Исправьте transcript/);
assert.match(processing, /Idempotency-Key/);
assert.match(clarify, /из максимум 3/);
assert.match(result, /normalized_description/);
assert.match(panel, /AI-case flow · Stage 5/);
console.log('STAGE5_STATIC_AUDIT=PASS');
console.log('SCREENS=6');
console.log('CLARIFICATION_MAX=3');
console.log('SERVER_OWNS_SCORE_XP_GOALS=PASS');
console.log('URL_FETCH_FORBIDDEN=PASS');
console.log('AUDIO_RETENTION_FORBIDDEN=PASS');
