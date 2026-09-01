# TECH STACK FINAL — AI‑Тамагочи / Любознайка

**Stage:** 3 — TECH STACK FREEZE  
**Status:** `PASS_WITH_NONBLOCKING_GAPS`  
**Generated:** 2026-08-31T12:33:49.897486+00:00

## 1. Decision

Selected stack: **TypeScript end-to-end monorepo with React/Vite PWA + NestJS modular monolith + PostgreSQL + Redis/BullMQ + isolated Three.js runtime**.

Decision class: `TECH_DECISION` / `SAFE_ENGINEERING_DEFAULT` where source documents do not prescribe a specific technology.

This decision does **not** change Product semantics. It implements the already frozen MVP and current visual/3D contract.

## 2. Why a stack decision is required now

The source set freezes:
- mobile-first PWA + desktop web;
- strict typed API to be created later;
- deterministic backend Score/HP/XP/Goals;
- audit/version/ledger semantics;
- asynchronous AI processing and non-blocking large exports;
- provider-neutral Personnel / LLM / STT / weather boundaries;
- Hybrid 3D with Three.js/WebGL2/glTF2/GLB;
- functional UI independent of realtime 3D success;
- Russian localization-ready UI;
- strong RBAC/object authorization and auditability;
- structured logging/metrics/tracing;
- coding-AI implementation after this package is complete.

The sources do **not** mandate a programming language, cloud, hosting provider, managed database, SSO vendor or LLM/STT vendor.

## 3. Compared options

The score below is a **design-decision heuristic**, not a runtime benchmark.

| Criterion | Weight | A — TS monorepo: React/Vite + NestJS | B — React/Vite + Python FastAPI | C — Next.js full-stack |
|---|---:|---:|---:|---:|
| One coding-AI / one-language maintainability | 20 | 5 | 3 | 5 |
| Fit for strict backend domain/game logic | 15 | 5 | 5 | 3 |
| PWA + heavy client-side 3D fit | 15 | 5 | 5 | 3 |
| Background jobs / AI orchestration / exports | 15 | 5 | 5 | 3 |
| Contract/type sharing | 10 | 5 | 3 | 5 |
| Provider-neutral deployment portability | 10 | 5 | 5 | 3 |
| Testability of modular monolith | 10 | 5 | 5 | 3 |
| Reduced framework coupling | 5 | 4 | 4 | 2 |
| **Weighted decision score / 5** | **100** | **4.95** | **4.30** | **3.55** |

### Option A — selected
**React/Vite + NestJS, TypeScript end-to-end**

Advantages:
- one language across PWA, API, workers, provider adapters and test tooling;
- shared API-generated types without sharing authoritative business calculations with the frontend;
- strong modular-monolith boundaries;
- natural BullMQ/Redis integration for AI, export and scheduled jobs;
- source-approved Three.js path fits a client-heavy React/Vite application;
- avoids server-rendering coupling for Home/3D;
- straightforward OpenAPI-first client generation;
- lower context-switch cost for the future coding AI.

Risks:
- Node ecosystem requires strict dependency/version pinning;
- TypeScript types do not replace runtime validation;
- ORM/query abstractions must not hide SQL semantics needed by ledger/audit/reporting.

Controls:
- strict TS;
- runtime schema validation;
- SQL remains explicit in Stage 5;
- contract tests around OpenAPI;
- server-only deterministic domain modules;
- exact dependency versions pinned in repository lockfile during Build Stage 1.

### Option B — rejected as primary stack
**React/Vite + FastAPI/Python backend**

Advantages:
- excellent AI/ML ecosystem;
- Pydantic/FastAPI provide clear runtime typing;
- strong fit if backend AI logic required substantial local Python ML.

Why not selected:
- current product needs provider-orchestrated LLM/STT more than local ML research;
- two languages duplicate contracts/tooling and increase coding-AI context switching;
- deterministic game, API and background-job logic gain little from Python specifically;
- frontend 3D still remains TypeScript/JavaScript, so Python cannot simplify the whole repo.

Python remains allowed only as an isolated external service in the future if a concrete model/tool requires it; no such service is source-required now.

### Option C — rejected as primary stack
**Next.js full-stack**

Advantages:
- productive React ecosystem;
- integrated routing/build/deployment;
- strong typing potential.

Why not selected:
- product is a PWA with a heavy client-side 3D runtime and a separately substantial backend domain;
- queue workers, long AI processing, exports, scheduled day-close jobs and provider adapters deserve a backend lifecycle independent of web rendering;
- serverless/edge assumptions would reduce provider neutrality;
- functional UI/3D isolation is clearer with a dedicated SPA/PWA + API boundary.

## 4. Frozen technology families

### Runtime / language
- **Node.js 24 LTS baseline** for application runtime.
- **TypeScript** in strict mode for frontend, backend, worker and shared tooling.
- Exact patch versions are pinned during repository bootstrap and committed in the lockfile/toolchain file.

`Node.js 24 LTS` is a Stage-3 engineering baseline, not a Product requirement. If an actual corporate runtime constraint is supplied later, this ADR must be revisited before implementation.

### Monorepo / package management
- **pnpm workspaces**.
- **Turborepo** for task graph/caching.
- Corepack/pinned package-manager version in repository metadata.
- Single lockfile.

### Frontend
- **React 19 family**.
- **Vite** SPA/PWA build.
- **React Router** for route composition.
- **TanStack Query** for server state.
- **Zustand** for small client-only UI/session state; no authoritative game calculations in client store.
- **React Hook Form + Zod** for forms/client validation.
- **CSS Modules + CSS Custom Properties** generated/consumed from current Design Tokens.
- No Tailwind requirement; the visual package is token/component-contract driven.
- **Workbox-compatible Vite PWA service worker** for installability/static shell/assets only.
- No offline mutation/background-sync product logic.

### 3D
- **Three.js** is the underlying approved runtime.
- **React Three Fiber** may be used as the isolated React renderer around Three.js.
- R3F is confined to the 3D package/SceneHost boundary; core UI must not depend on it.
- glTF 2.0 / GLB.
- WebGL2-capable path with approved static fallback.
- No final proxy GLB promotion.
- KTX2 support remains optional behind current Stage-2 flag.

### Backend
- **NestJS** modular monolith.
- **Fastify adapter** as HTTP runtime.
- One server codebase with two process entrypoints:
  - API process;
  - worker/scheduler process.
- Domain modules remain server-authoritative.
- LLM never writes directly to DB.
- Score/HP/XP/Goals are pure deterministic backend code using versioned configuration/rules.

### Database
- **PostgreSQL** as primary transactional database.
- **Drizzle ORM/query layer** for typed TypeScript data access.
- Stage-5 executable SQL schema/migrations remain explicit and reviewable; ORM mappings must match SQL, not replace it.
- Advanced reporting/ledger queries may use explicit SQL where it is clearer and safer.

### Queue / cache / jobs
- **Redis**.
- **BullMQ** for asynchronous AI processing, exports, notifications and scheduled/background work.
- Redis is not the source of truth for durable business data.
- Stage 4 defines outbox/idempotency/job semantics.

### API contract
- **OpenAPI 3.x contract-first**.
- `openapi_final_v1.yaml` becomes the API source of truth at Stage 6.
- **openapi-typescript** generates shared client types.
- **openapi-fetch** (or thin generated wrapper) is the frontend transport baseline.
- **Redocly CLI** (or equivalent deterministic linter fixed in repo) validates OpenAPI.
- Runtime DTO/request validation remains mandatory; TypeScript compile-time types alone are insufficient.

### Providers / external systems
Provider-neutral interfaces for:
- Personnel;
- LLM;
- STT;
- weather;
- object storage;
- future external notification channels.

No vendor endpoint, tenant, credential or employee key is selected at Stage 3.

### Object storage
- **S3-compatible interface contract** as engineering abstraction.
- No production vendor selected.
- Local development may use a compatible emulator/implementation selected in DevOps stage.
- Object storage is primarily for generated exports/runtime files that need externalized storage; Product file attachments remain out of scope.

### Observability
- **OpenTelemetry** for traces/metrics context.
- **Pino** structured JSON logging.
- Concrete telemetry backend/vendor remains provider-neutral until deployment stage.

### Testing/tooling
- **Vitest** for unit/component/backend service tests.
- **Testing Library** for React behavior tests.
- **Playwright** for E2E/visual/accessibility browser automation.
- **Testcontainers** for PostgreSQL/Redis integration tests where the execution environment supports containers.
- **ESLint + typescript-eslint + Prettier**.
- OpenAPI lint/parse in CI.
- SQL/migration validation in CI.

## 5. Non-selected technologies / constraints

Not part of the baseline unless a later ADR changes it:
- no native mobile framework;
- no microservices decomposition for MVP;
- no GraphQL;
- no Firebase/Supabase/BaaS as the authoritative architecture;
- no serverless-only backend requirement;
- no frontend-computed authoritative Score/HP/XP/Goals;
- no client-only authorization;
- no Python service by default;
- no vendor-specific LLM/STT lock-in;
- no production SSO vendor selected;
- no feature-flag SaaS selected;
- no Tailwind requirement;
- no mandatory KTX2.

## 6. Version policy

Stage 3 freezes **technology families and compatibility baseline**, not every transient patch number.

Build Stage 1 must:
1. resolve mutually compatible exact versions;
2. pin them in `package.json`, package-manager metadata and lockfile;
3. record Node exact version in toolchain metadata;
4. run install/build/typecheck/tests;
5. fail rather than silently upgrading major versions.

Major-version changes after repository bootstrap require an ADR update.

## 7. Corporate infrastructure unknowns

Not currently supplied:
- required cloud/on-prem target;
- mandatory corporate language/framework;
- managed vs self-hosted database/Redis policy;
- registry/container platform;
- production SSO provider;
- network egress restrictions for external LLM/STT.

These are owner/external constraints, but they **do not block Stage 4** because the selected stack is containerizable and provider-neutral and all external services are isolated behind adapters.

If a real corporate mandate later contradicts this stack, Stage 3 must be explicitly reopened before coding.

## 8. Stage-3 conclusion

**Recommended / frozen stack:** Option A — TypeScript monorepo.

Human decision required before Stage 4: **none**.

The owner approves this engineering stack by authorizing progression to Stage 4. A later corporate mandate is a change request, not an implicit assumption.
