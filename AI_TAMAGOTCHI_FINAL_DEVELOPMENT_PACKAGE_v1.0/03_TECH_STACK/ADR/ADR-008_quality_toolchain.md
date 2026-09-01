# ADR-008 — Use unified TypeScript quality and test toolchain

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The final coding AI must run formatter, lint, typecheck and relevant automated tests after each build stage. The product also requires E2E, visual, accessibility and integration coverage.

## Decision
Use ESLint/typescript-eslint + Prettier, Vitest, React Testing Library, Playwright and Testcontainers where supported. CI must also validate OpenAPI and SQL/migrations. Exact test cases remain Stage 15.

## Consequences
One primary unit/integration test runner reduces tooling complexity. Playwright covers browser/E2E/visual/accessibility automation. Testcontainers provides real DB/Redis integration where the environment permits.

## Alternatives considered
Jest-only/Nest defaults were not selected because Vitest allows a more unified frontend/backend TS test workflow. Browser manual testing alone is insufficient.
