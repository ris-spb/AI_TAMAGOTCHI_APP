# TEST AUTOMATION ARCHITECTURE

Frozen tools from Stage 3:
- Vitest;
- Testing Library;
- Playwright;
- Testcontainers.

SAFE_ENGINEERING_DEFAULT test-only additions:
- axe-compatible accessibility scanner;
- k6 or equivalent performance harness.

Recommended tree:

```text
tests/
  unit/
  integration/{api,database,jobs}/
  contract/{openapi,personnel,llm,stt,weather,object-storage}/
  e2e/{employee,director,executive,admin}/
  security/
  accessibility/
  visual/
  pwa/
  3d/
  performance/
  recovery/
  fixtures/
```

Stable test IDs:
- `REQT-<requirement_id>`
- `API-<operationId>-...`
- `E2E-<SCR_ID>`
- `A11Y-<SCR_ID>`
- `VIS-<SCR_ID>`
- `SEC-<THR_ID>-...`

Core CI uses deterministic mocks and no production credentials/real employee data.
