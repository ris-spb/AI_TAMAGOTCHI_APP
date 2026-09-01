import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = JSON.parse(await readFile(new URL('../src/fixtures/mock-health.json', import.meta.url), 'utf8'));
const port = Number(process.env.PORT ?? 4181);

function json(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Prototype-Mock': 'true',
  });
  response.end(JSON.stringify(payload));
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://prototype.local');

  if (url.pathname === '/__prototype/mock-health') {
    json(response, 200, fixture);
    return;
  }

  if (url.pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html><html lang="ru"><meta charset="utf-8"><title>Stage 1 offline smoke</title><body><h1>Stage 1 offline verification harness</h1><p>Repository: ${root}</p><p>This harness is not the React/Vite product UI.</p></body></html>`);
    return;
  }

  response.writeHead(404).end();
});

server.listen(port, '127.0.0.1', () => {
  console.log(`stage1-offline-server http://127.0.0.1:${port}`);
});
