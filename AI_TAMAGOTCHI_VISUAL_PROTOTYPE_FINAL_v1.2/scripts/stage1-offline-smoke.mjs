import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.app.json',
  'src/main.tsx',
  'src/app/App.tsx',
  'src/routes/router.tsx',
  'src/app/queryClient.ts',
  'src/demo-controls/store.ts',
  'src/mock-api/schema.ts',
  'src/fixtures/mock-health.json',
  'tests/unit/mock-schema.test.ts',
  'tests/e2e/stage1-smoke.spec.ts',
];

for (const file of requiredFiles) {
  const info = await stat(new URL(`../${file}`, import.meta.url));
  assert.equal(info.isFile(), true, `${file} must exist`);
}

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
assert.equal(pkg.dependencies.react, '19.2.8');
assert.equal(pkg.dependencies['@tanstack/react-query'], '5.102.8');
assert.equal(pkg.dependencies.zustand, '5.0.15');
assert.equal(pkg.dependencies['react-hook-form'], '7.87.0');
assert.equal(pkg.dependencies.zod, '4.5.4');
assert.equal(pkg.devDependencies.vite, '7.3.6');

const fixture = JSON.parse(
  await readFile(new URL('../src/fixtures/mock-health.json', import.meta.url), 'utf8'),
);
assert.deepEqual(fixture, {
  status: 'ok',
  service: 'prototype-mock-api',
  deterministic: true,
  source: 'PROTOTYPE_STAGE_1',
  timestamp: '2026-09-01T00:00:00.000Z',
});

const child = spawn(process.execPath, ['scripts/stage1-offline-server.mjs'], {
  cwd: new URL('../', import.meta.url),
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, PORT: '4181' },
});

try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('offline server start timeout')), 3_000);
    child.stdout.on('data', (chunk) => {
      if (String(chunk).includes('stage1-offline-server')) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.on('error', reject);
  });

  const response = await fetch('http://127.0.0.1:4181/__prototype/mock-health');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('x-prototype-mock'), 'true');
  assert.deepEqual(await response.json(), fixture);
} finally {
  child.kill('SIGTERM');
}

console.log('STAGE1_OFFLINE_SMOKE=PASS');
