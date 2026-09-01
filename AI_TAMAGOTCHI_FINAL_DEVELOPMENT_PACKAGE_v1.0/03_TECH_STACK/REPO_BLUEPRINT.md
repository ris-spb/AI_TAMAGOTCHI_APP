# REPO BLUEPRINT

**Stage:** 3  
**Repository model:** TypeScript monorepo / modular monolith backend / separate PWA frontend.

```text
repo/
├── apps/
│   ├── web/                         # React/Vite PWA
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── routes/
│   │   │   ├── features/
│   │   │   ├── screens/
│   │   │   ├── widgets/
│   │   │   ├── api/
│   │   │   ├── i18n/
│   │   │   └── styles/
│   │   └── public/
│   │
│   └── backend/                     # NestJS modular monolith
│       ├── src/
│       │   ├── bootstrap/
│       │   │   ├── api.ts
│       │   │   └── worker.ts
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── personnel/
│       │   │   ├── tasks/
│       │   │   ├── ai-processing/
│       │   │   ├── taxonomy/
│       │   │   ├── tools/
│       │   │   ├── game/
│       │   │   ├── goals/
│       │   │   ├── rankings/
│       │   │   ├── analytics/
│       │   │   ├── notifications/
│       │   │   ├── exports/
│       │   │   ├── admin/
│       │   │   └── audit/
│       │   ├── infrastructure/
│       │   │   ├── db/
│       │   │   ├── queue/
│       │   │   ├── providers/
│       │   │   ├── storage/
│       │   │   └── observability/
│       │   └── shared-server/
│       └── test/
│
├── packages/
│   ├── api-client/                  # generated OpenAPI client/types
│   ├── contracts/                   # shared non-authoritative DTO/value types
│   ├── ui/                          # token-driven UI components
│   ├── 3d-runtime/                  # isolated Three/R3F SceneHost
│   ├── visual-assets/               # verified current runtime asset mapping
│   ├── config/                      # typed public/shared config schemas
│   ├── i18n/                        # Russian strings + localization plumbing
│   └── test-utils/
│
├── database/
│   ├── schema.sql
│   ├── migrations/
│   └── seed/
│
├── openapi/
│   └── openapi_final_v1.yaml
│
├── scripts/
│   ├── sync-visual-assets.ts
│   ├── verify-visual-manifest.ts
│   ├── generate-api-client.ts
│   └── validate-contracts.ts
│
├── tooling/
│   ├── eslint/
│   ├── typescript/
│   └── test/
│
├── docs/
│   └── adr/
│
├── docker/                          # populated at Build/DevOps stages
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── pnpm-lock.yaml
```

## Ownership rules

### `apps/web`
May:
- render product/UI state;
- call generated API client;
- derive non-authoritative presentation state;
- run Three.js through `packages/3d-runtime`;
- use approved visual fallbacks.

Must not:
- calculate authoritative Score/HP/XP/Goals;
- bypass API authorization;
- write directly to PostgreSQL/Redis;
- depend on realtime 3D for functional navigation/forms.

### `apps/backend`
Owns:
- domain/business rules;
- RBAC/object authorization;
- task versioning;
- ledgers and audit;
- AI orchestration;
- goal matching;
- ranking/analytics semantics;
- provider interfaces;
- scheduled/background jobs.

The API and worker are **two entrypoints of one modular-monolith codebase**, not independent microservices.

### `packages/contracts`
Contains:
- generated/shared transport types;
- enums/value representations that are safe to share;
- no authoritative game-engine implementation.

### `packages/ui`
Consumes:
- current Stage-20 design tokens;
- current component/state handoff;
- no deprecated visual package source.

### `packages/3d-runtime`
Owns:
- Three/R3F scene lifecycle;
- asset loading/disposal;
- context-loss handling;
- reduced-motion/quality path integration;
- static-fallback switch.

It exposes a small UI-facing interface and does not own business state.

### `packages/visual-assets`
Build-time/runtime mapping only:
- runtime-direct assets copied only from allowed `08_PRODUCTION_EXPORTS/`;
- canonical references used for QA/specification, not silently shipped as runtime files;
- Stage-16 proxy GLBs excluded from production mapping.

## Dependency direction

```text
web ──> api-client/contracts
web ──> ui
web ──> 3d-runtime
ui  ──> contracts (presentation-safe types only)

backend ──> contracts
backend ──> PostgreSQL
backend ──> Redis/BullMQ
backend ──> provider interfaces

3d-runtime -X-> backend domain
web        -X-> database/redis
ui         -X-> server domain
```

## Build boundary

A repository bootstrap must fail if:
- frontend imports server-only modules;
- deprecated visual assets are copied into runtime output;
- generated API client is stale relative to final OpenAPI;
- TypeScript strict/typecheck fails;
- SQL migration validation fails;
- required test gates fail.

Exact module boundaries are finalized in Stage 4; this file freezes the repository topology and dependency direction only.
