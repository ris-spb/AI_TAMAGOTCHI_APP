# MASTER PROMPT — AI APPLICATION DEVELOPMENT
# AI-Тамагочи / Любознайка

## SYSTEM ROLE
You are the coding AI responsible for implementing the application from the supplied final self-contained Development Package. Do not regenerate requirements or redesign product semantics.

## PACKAGE-FIRST RULE
Before code, read the entire package: source/decisions, normalized requirements/scope, stack/repo, architecture, DB, final OpenAPI, AI runtime/prompts/eval, game rules/config, auth/RBAC/Personnel, frontend/visual, 3D/fallback, integrations/config/secrets, security/observability/recovery, QA, DevOps, Stage-17 backlog/DoR/DoD/coding standards. Missing mandatory non-external final contract => BLOCKED at Build Stage 0.

## EXECUTION
Exact Build Stages 0–28. One per cycle. Gate + report + STOP. Continue only on explicit approval. Keep Development Package read-only; create application repository separately (`./application/` if no repo root supplied).

## TRACEABILITY
Use Feature Matrix + Stage-17 backlog/acceptance + Stage-15 QA. Maintain requirement -> IMP -> files/modules -> tests -> result. No untracked features.

## TEST/P0 RULE
Tests are written throughout. After every applicable stage run formatter, lint, typecheck, unit, relevant integration/contract/component/E2E and migrations validation. Before introduction use N_A_NOT_INTRODUCED, never fake PASS. Failed affected P0/P0-* => BLOCKED.

## NON-HALLUCINATION / MOCKS
Never invent mechanics, corporate APIs, credentials, production provider values, final binaries, approval, restore evidence or performance results. Mocks must implement success and failure contracts, not fake success.

## AUTHORITY
Backend deterministic versioned rules own Score/HP/XP/Streak/Goals/ranking. LLM/frontend/3D do not. Final OpenAPI is authoritative; PostgreSQL is truth; Redis is non-authoritative.

## UI/3D/SECURITY
Preserve current Home/nav/CTA invariants; online-only mutations; approved current visual assets; no proxy final GLB/fake KTX2; functional fallback. No secrets in repo/frontend/telemetry. Backend default-deny authorization.

## STAGE 26/27
Stage 26 produces immutable production-mode release-candidate artifacts only. Stage 27 audits exact digests. No production-ready/promotion claim before Stage-27 PASS.

## REPORT
Use `18_AI_BUILD_AGENT/BUILD_STAGE_REPORT_TEMPLATE.md`.

---
# BUILD STAGES 0–28

## BUILD STAGE 0 — package ingestion / source verification

### Objective
Read/verify entire Development Package before code. Create internal current-contract and requirement/backlog/test map.

### Files / modules
- Development Package read-only
- 00_START_HERE through 17_IMPLEMENTATION current final contracts

### Dependencies
- Final Development Package extracted

### Tests / validation
- mandatory files/external-dependency verification
- JSON/YAML/CSV/OpenAPI parse
- 294 requirements/backlog/QA mapping; 274 critical verification
- repo checks = N_A_NOT_INTRODUCED

### Done condition
Package is unambiguous enough to code; no application code written.

### Gate
Missing mandatory non-external final contract => BLOCKED.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 1 — repository + tooling

### Objective
Create strict TypeScript monorepo and stable developer/test command surface.

### Files / modules
- repository root
- apps/web
- apps/backend
- packages/*
- pnpm/Turbo/TS/ESLint/Prettier config
- repo-local traceability

### Dependencies
- Stage 0 PASS
- Stage-3 stack/repo blueprint
- Stage-17 coding standards

### Tests / validation
- frozen install/lockfile
- formatter
- lint
- typecheck
- smoke unit/build graph
- migrations=N_A_NOT_INTRODUCED

### Done condition
Repository installs/builds reproducibly and commands exist.

### Gate
All introduced tooling checks PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 2 — local infra / Docker / env

### Objective
Create provider-neutral local/test infra, Docker/OCI skeleton and env/config loading.

### Files / modules
- compose/local infra
- PostgreSQL
- Redis
- optional storage emulator
- config/env loader
- Docker skeleton

### Dependencies
- Stage 1 PASS
- Stage-13 config
- Stage-16 Docker/environments

### Tests / validation
- compose/config syntax
- runtime config schema
- DB/Redis health
- mock-provider startup
- production-config negative tests
- standard gate; migrations=N_A_NOT_INTRODUCED

### Done condition
Local/test starts deterministically with mocks and no committed secrets.

### Gate
Config/secret P0 failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 3 — DB schema + migrations

### Objective
Implement canonical PostgreSQL schema and explicit migrations with constraints/indexes/history/ledgers/audit/idempotency/outbox.

### Files / modules
- DB package
- migrations/*
- repositories
- DB fixtures

### Dependencies
- Stage 2 PASS
- 05_DATABASE canonical files must exist
- Stage-4 architecture
- Stage-16 migration deploy

### Tests / validation
- migrations on empty DB
- constraints/indexes
- history/ledger/audit/idempotency
- drift
- standard gate + migration validation

### Done condition
Executable schema/migrations implement canonical DB contract.

### Gate
Missing canonical Stage-5 DB files or failed migration/DB P0 => STOP; never guess schema.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 4 — backend foundation

### Objective
Create NestJS/Fastify modular-monolith foundation with typed errors, DB/Redis, jobs/outbox/idempotency and health.

### Files / modules
- backend bootstrap
- module skeletons
- common errors/validation
- DB/Redis adapters
- jobs/outbox/idempotency
- health endpoints

### Dependencies
- Stage 3 PASS
- Stage-4 architecture
- Stage-6 API conventions
- Stage-16 health

### Tests / validation
- backend boot
- error envelope
- health
- DB/Redis behavior
- job/idempotency primitives
- standard gate

### Done condition
Backend foundation boots with PostgreSQL authoritative and Redis non-authoritative.

### Gate
Foundation P0 failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 5 — auth + RBAC

### Objective
Implement opaque bearer sessions, account status, role and object authorization with default deny.

### Files / modules
- auth module
- sessions
- RBAC guards/policies
- object authorization

### Dependencies
- Stage 4 PASS
- 09_AUTH_RBAC_PERSONNEL canonical auth files
- Stage-13/14 security

### Tests / validation
- session hash/expiry/revocation
- blocked/terminated
- role change revocation baseline
- all role positive/negative
- IDOR/cross-directorate
- no token logs
- standard gate

### Done condition
Every protected action is server-authorized; no MVP JWT/SSO invention.

### Gate
Any auth/RBAC P0 failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 6 — personnel mock/adapter

### Objective
Implement PersonnelProvider, deterministic mock and real-adapter boundary without corporate-value invention.

### Files / modules
- PersonnelProvider
- MockPersonnelProvider
- real adapter skeleton
- personnel service

### Dependencies
- Stage 5 PASS
- Stage-9 Personnel contracts
- Stage-12 error model
- Stage-13 config

### Tests / validation
- match/no-match/outage/malformed
- login through provider
- no fuzzy matching
- provider cannot alter app role/privacy
- real mode missing config safe fail
- standard gate

### Done condition
Core auth works with deterministic mock and real adapter remains replaceable.

### Gate
Mock/contract tests PASS; missing real endpoint remains EXTERNAL_DEPENDENCY.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 7 — task/version/ledger domain

### Objective
Implement durable task/logical-task/version domain, soft delete and append-only ledger/audit foundations.

### Files / modules
- task/case domain
- version repositories
- raw input durability
- soft delete
- ledger/reversal
- audit

### Dependencies
- Stage 6 PASS
- Stage-3 DB
- Stage-4 architecture
- Stage-8 ledger specs

### Tests / validation
- raw accepted before AI
- edit new version
- soft delete history
- version conflict
- idempotent mutations
- ledger/reversal
- audit atomicity
- standard gate

### Done condition
Task/version/history primitives are durable and deterministic.

### Gate
History/version/idempotency/audit P0 failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 8 — AI processing pipeline

### Objective
Implement typed LLM/STT orchestration, prompts/schema versioning and processing state machine.

### Files / modules
- AI runtime
- prompt/version registry
- model/STT adapters and mocks
- processing worker
- schema validators

### Dependencies
- Stage 7 PASS
- Stage-7 AI runtime files
- Stage-12 integrations

### Tests / validation
- schema valid/invalid
- timeout/rate-limit/retry
- stale version rejection
- prompt injection
- no LLM DB/game authority
- durable input on provider fail
- standard gate

### Done condition
AI returns typed evidence/classification only; numeric game authority remains backend.

### Gate
Schema/authority/persistence P0 failure blocks; real providers may remain external.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 9 — game engine

### Objective
Implement deterministic Score/HP/coma/vacation/Streak/XP/evolution/Goals/ranking/recalculation.

### Files / modules
- game-engine
- game_config
- score/xp ledgers
- HP/Streak/Goals/Evolution/ranking

### Dependencies
- Stage 8 PASS
- Stage-8 game engine contracts
- task/version domain

### Tests / validation
- C1–C5 1/5/15/40/100
- HP initial/boundaries/daily/coma/vacation
- Streak reset/freeze/milestones/no shield
- XP high-watermark
- Goals 5->2+server1 exact rewards
- evolution 0/250/750/2000/5000
- ranking/year/transfer/terminated/zero headcount
- replay idempotency
- standard gate

### Done condition
All authoritative game numbers match frozen versioned config exactly.

### Gate
Any deterministic P0 game failure blocks; never tune constants to pass.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 10 — API completion

### Objective
Implement all final OpenAPI operations with typed errors, authz, idempotency and pagination/filter/sort.

### Files / modules
- all /v1 controllers/routes
- OpenAPI DTO boundary
- error/idempotency/pagination middleware

### Dependencies
- Stages 5–9 PASS
- 06_API/openapi_final_v1.yaml

### Tests / validation
- 64/64 operation positive schema
- typed errors
- authn/authz negatives
- idempotency
- pagination/filter/sort
- generated client compatibility
- standard gate

### Done condition
All 64 final operations implemented to final OpenAPI.

### Gate
64/64 contract coverage required; failed P0 blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 11 — frontend shell/design system

### Objective
Implement React/Vite PWA shell, router/query/state/forms foundations, generated API client and design system.

### Files / modules
- apps/web
- React Router
- TanStack Query
- Zustand client-only state
- RHF/Zod
- generated API client
- UI tokens/components
- PWA shell

### Dependencies
- Stage 10 PASS
- Stage-10 frontend contract
- current visual handoff

### Tests / validation
- component/unit
- route shell
- generated client compile
- token/component states
- PWA static shell/no auth API cache
- 360/390/430
- standard gate

### Done condition
Frontend foundation consumes server contracts and keeps mutations online-only.

### Gate
Divergent DTO/deprecated visual/P0 shell failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 12 — auth/onboarding

### Objective
Implement login/session boot, onboarding and initial Goal setup UX.

### Files / modules
- /login
- /onboarding
- /goals/setup
- route/session guards

### Dependencies
- Stage 11 PASS
- auth/personnel
- goals backend
- final API

### Tests / validation
- login success/fail non-enumerating
- blocked/terminated
- session reload
- onboarding gate
- exactly 2 goals + server third
- role route UX
- a11y/forms
- standard gate

### Done condition
First-login reaches Home only after required setup; backend remains authority.

### Gate
First-login/onboarding P0 E2E must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 13 — AI-case text flow

### Objective
Implement text Add AI-case flow and safe submission with URL strings only.

### Files / modules
- /ai-cases/new
- task form
- create mutation

### Dependencies
- Stage 12 PASS
- task domain
- AI pipeline
- final API

### Tests / validation
- valid/invalid create
- URL stored only; no fetch
- no attachments/backdate/manual Score/Complexity
- idempotent retry
- network failure no duplicate
- a11y
- standard gate

### Done condition
Text AI-case creation is durable, online-only and has no scoring fields.

### Gate
Text-flow P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 14 — voice/STT flow

### Objective
Implement record -> STT -> editable transcript -> submit with ephemeral source audio.

### Files / modules
- voice route/recorder
- STT path
- transcript preview/editor

### Dependencies
- Stage 13 PASS
- STT provider boundary
- frontend/API contracts

### Tests / validation
- STT mock success
- editable transcript
- timeout/error
- mic denial
- audio not retained/attached
- no offline replay
- a11y
- standard gate

### Done condition
Voice flow works with mock STT and retains only intended transcript/task data.

### Gate
Voice P0 tests pass; real STT evidence may remain external.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 15 — processing/clarifications/result

### Objective
Implement processing/polling, 0/1/2/3 clarifications, hard cap, result and stale/error states.

### Files / modules
- processing route
- clarification route
- result route
- polling/state queries

### Dependencies
- Stage 14 PASS
- AI state machine
- game finalization
- API

### Tests / validation
- processing success
- 0/1/2/3 clarifications
- fourth impossible
- after cap continue
- provider/schema failures
- stale conflict
- server-only business values
- standard gate

### Done condition
Processing lifecycle complete; no fourth question; result reflects backend authority.

### Gate
Clarification/result P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 16 — Home + mascot fallback

### Objective
Implement normalized Home and mascot/static fallback before realtime 3D.

### Files / modules
- Home
- Home query/view model
- mascot state
- static fallback
- bottom nav

### Dependencies
- Stage 15 PASS
- Stage-10 Home contract
- Stage-11 fallback mapping
- visual handoff

### Tests / validation
- exact four nav tabs
- exact CTA
- compact Goals
- mascot/Streak/context/notif
- no Home Score/rank/XP/numeric HP/game row
- 3D disabled/fail UI usable
- visual/a11y/responsive
- standard gate

### Done condition
Home matches current approved contract and works without realtime 3D.

### Gate
Home/fallback P0 invariants must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 17 — History/Profile/Goals

### Objective
Implement History, task versions, Profile/privacy/vacation/achievements/scoring explainer and full Goals.

### Files / modules
- /history
- /history/events
- task detail/history
- /profile children
- /goals

### Dependencies
- Stage 16 PASS
- task/game/ranking/profile APIs

### Tests / validation
- history/version order
- soft delete history
- privacy modes
- vacation no backdate/freeze
- Goals progress/rewards
- supported achievement fallback
- scoring explainer
- a11y/E2E
- standard gate

### Done condition
Employee history/profile/goals surfaces preserve server semantics.

### Gate
Employee-surface P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 18 — Rating

### Objective
Implement employee/directorate Rating and analytics with backend ranking/privacy semantics.

### Files / modules
- /rating
- /rating/directorates
- /rating/analytics
- directorate detail

### Dependencies
- Stage 17 PASS
- ranking/privacy backend

### Tests / validation
- current-year ranking
- directorate ranking
- zero headcount null
- terminated excluded current
- transfer history unchanged
- privacy
- sort/pagination/drilldown
- standard gate

### Done condition
Rating displays server calculations and authorized projections only.

### Gate
Ranking/privacy P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 19 — Director/Executive

### Objective
Implement Director and Executive dashboards/drilldowns with distinct object scopes.

### Files / modules
- /director
- /executive
- management analytics/drilldown

### Dependencies
- Stage 18 PASS
- RBAC
- ranking/analytics/export APIs

### Tests / validation
- Director own directorate
- cross-directorate denial
- Executive company drilldown
- Executive no Admin settings
- historical attribution
- management privacy scope
- standard gate

### Done condition
Management UI matches backend role/object authorization.

### Gate
Director/Executive RBAC P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 20 — Admin

### Objective
Implement Admin user/org/calendar/taxonomy/tools/audit surfaces without scoring override.

### Files / modules
- /admin and child routes
- admin forms/tables

### Dependencies
- Stage 19 PASS
- RBAC
- admin APIs
- audit

### Tests / validation
- Admin allowed actions
- non-Admin denial
- no Score/Complexity override
- audit Admin-only
- role/status revocation
- audited org/calendar/taxonomy/tools
- standard gate

### Done condition
Admin scope complete, auditable and cannot manually override scoring.

### Gate
Admin/RBAC/audit P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 21 — realtime/hybrid 3D integration

### Objective
Integrate Hybrid Three.js/R3F scene behind functional Home using approved assets/fallback.

### Files / modules
- SceneHostBoundary
- 3D scene
- asset loader/disposal
- camera/safezone
- animation
- context loss/fallback

### Dependencies
- Stage 20 PASS
- 11_3D_RUNTIME
- current visual handoff
- static fallback

### Tests / validation
- loading order
- WebGL live/degraded/unsupported
- asset fail
- context loss
- disposal
- reduced motion
- UI always usable
- no scene business math
- no SPK proxy as final
- standard gate

### Done condition
3D works when capable and degrades safely; no fake final binaries.

### Gate
Fallback/UI-independence P0 must PASS; missing final GLB may remain external.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 22 — exports/notifications

### Objective
Complete authorized async exports and in-app notifications; keep external channels disabled.

### Files / modules
- export jobs/download
- Object Storage adapter/mock
- in-app notification API/UI

### Dependencies
- Stage 21 PASS
- integration/export contracts
- management UI

### Tests / validation
- async export no UI block
- scope/re-auth download
- formula injection safe
- storage failure
- notification read/list
- external channels absent
- standard gate

### Done condition
Exports safe/scoped; notifications in-app only.

### Gate
Export authorization/safety P0 tests must PASS.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 23 — observability/security hardening

### Objective
Apply final cross-module security, observability and resilience hardening.

### Files / modules
- rate limits
- headers/CORS/CSP
- structured logs/redaction
- OpenTelemetry
- alerts
- security audit signals
- fault isolation

### Dependencies
- Stage 22 PASS
- 14_SECURITY_OBSERVABILITY canonical files must exist
- Stage-13 config

### Tests / validation
- 28 threat controls
- secret scan
- log/trace redaction
- rate limits test values
- audit atomicity
- IDOR/injection/formula negatives
- provider/queue failure isolation
- metrics/traces/error/latency/backlog
- standard gate

### Done condition
Security/observability enforced across implemented paths with no protected-data telemetry leakage.

### Gate
Critical/High security or P0 failure blocks.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 24 — automated tests

### Objective
Complete and execute full Stage-15 automated system; tests have already been written throughout.

### Files / modules
- tests/unit
- integration
- contract
- E2E
- security
- a11y
- visual
- PWA
- 3D
- performance/recovery scaffolds

### Dependencies
- Stage 23 PASS
- 15_QA
- Stage-17 acceptance mapping

### Tests / validation
- 294/294 tracked
- 274/274 critical evidence paths
- 64/64 API
- 38 FE-T
- 36 screens
- 28 threats
- 100-case AI harness
- full test suite
- migration validation

### Done condition
Full deterministic test system executable with no placeholder/disabled critical tests.

### Gate
No failed P0; S0/S1=0; external evidence stays explicitly open.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 25 — visual/accessibility/performance QA

### Objective
Run full visual/accessibility/performance/resilience QA in controlled staging-like environment.

### Files / modules
- QA evidence/reports
- Golden screenshots
- a11y results
- load profile/results
- fault-injection evidence

### Dependencies
- Stage 24 PASS
- current Golden/visual QA
- QA gates

### Tests / validation
- visual Golden regression
- keyboard/focus/labels/44x44/reduced motion/chart equivalents
- 360/390/430
- p95 <2s under documented accepted normal load
- async responsiveness
- fault resilience
- no fabricated physical-device metrics
- standard gate

### Done condition
Visual/a11y pass and performance evidence is reproducible under documented load profile.

### Gate
Blocking P0/a11y/visual/perf failure blocks; no invented normal-load claim.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 26 — production build

### Objective
Build immutable production-mode RELEASE-CANDIDATE artifacts for audit; not yet production-approved.

### Files / modules
- web production artifact/image
- backend OCI image
- migration bundle
- release manifest
- digests/checksums
- SBOM/inventory if supported

### Dependencies
- Stage 25 PASS
- Stage-16 artifact build/CI

### Tests / validation
- clean prod build
- artifact/image secret scan
- dependency/security scan
- contract/config/game/migration checksums
- no .env/real fixture/proxy-final contamination
- built-artifact smoke
- standard gate

### Done condition
Immutable candidate artifacts built once with recorded digests.

### Gate
Build/scan/smoke PASS; candidate can only proceed to Stage 27, not production promotion.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 27 — final E2E audit

### Objective
Audit exact Stage-26 immutable candidate end-to-end across roles, migrations, product and failure paths.

### Files / modules
- final E2E audit report
- isolated candidate deployment
- evidence bundle
- known-issue/release ledger

### Dependencies
- Stage 26 PASS
- immutable digests
- QA RC gate
- release checklist

### Tests / validation
- first login/onboarding
- text/voice
- clarification 0–3 and no 4th
- result/edit/reprocess/delete
- Goals/HP/coma/vacation/Streak
- Rating/Profile/History
- Director/Executive/Admin
- exports/notifs
- 3D fallback
- network/provider retry
- migration rehearsal
- all critical evidence
- S0/S1=0
- standard gate on candidate

### Done condition
Exact candidate passes final E2E/RC audit; remaining items are only allowed explicit external gates.

### Gate
Any P0/S0/S1/migration/RBAC/critical E2E failure BLOCKS Stage 28.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

## BUILD STAGE 28 — deployment package

### Objective
Assemble verified application deployment package from exact audited digest with config templates, migrations, manifests and runbooks.

### Files / modules
- deployment artifact set
- release manifest
- migration bundle
- env/config templates
- deploy/rollback runbooks
- digests
- external-gate ledger

### Dependencies
- Stage 27 PASS
- Stage-16 deployment/rollback/release
- real external evidence where available

### Tests / validation
- manifest/digest verification
- config schema
- deployment health/smoke rehearsal
- rollback rehearsal/classification
- no secrets
- no fake binaries
- same Stage-26 digest
- honest external-gate evaluation

### Done condition
Deployment package reproducible. If external evidence remains missing, status is APPLICATION_COMPLETE_WITH_EXTERNAL_PRODUCTION_GATES, not fake PRODUCTION_APPROVED.

### Gate
Final report distinguishes application completeness from industrial-production approval.

### Report
Use the report template and include stage status, IMP items, files, commands/exit codes, tests, migrations, traceability, known issues, external gates, human decisions and next gate.

### Stop point
**STOP and wait for explicit approval.**

---
# FINAL RULES
Never continue past failed P0. Never call mocks real-provider success. Never change product rules to fit code. Never update Golden to hide regression. Never fabricate binaries/secrets/evidence. Stage 28 final status must use `FINAL_BUILD_ACCEPTANCE.md`.
