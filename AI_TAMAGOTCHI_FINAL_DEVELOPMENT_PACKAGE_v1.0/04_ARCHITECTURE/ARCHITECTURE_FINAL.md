# ARCHITECTURE FINAL — AI‑Тамагочи / Любознайка

**Stage:** 4 — Solution Architecture Freeze  
**Status:** `PASS_WITH_NONBLOCKING_GAPS`  
**Generated:** 2026-08-31T12:45:54.714116+00:00  
**Stack baseline:** TypeScript monorepo / React+Vite PWA / NestJS modular monolith / PostgreSQL / Redis+BullMQ / Three.js.

## 1. Architecture decision

The MVP is implemented as a **modular monolith with asynchronous workers**, not as microservices.

Deployment/runtime units may be scaled separately:
1. Web/PWA static application.
2. Backend API process.
3. Backend worker/scheduler process.
4. PostgreSQL.
5. Redis/BullMQ.
6. S3-compatible object-storage adapter where needed.
7. External provider adapters.

The API and worker are two entrypoints of the **same backend codebase and same domain model**. Splitting them into independent business services is not part of the MVP architecture.

## 2. Core architectural invariants

1. **PostgreSQL is the durable business source of truth.**
2. Redis/BullMQ is transport/cache/job infrastructure only and never authoritative for Score, HP, XP, Goals, task history or authorization.
3. LLM/STT providers never write directly to the database.
4. LLM returns structured evidence/classification; deterministic backend code calculates numerical Score/HP/XP/Goal effects.
5. Raw accepted task input is persisted before downstream AI processing starts.
6. Critical domain changes are committed transactionally inside the modular monolith.
7. Asynchronous delivery is at-least-once; **business side effects are idempotent** through persisted command/event keys.
8. Outbox records are written in the same PostgreSQL transaction as domain changes that need asynchronous publication.
9. Functional UI does not depend on realtime 3D loading or success.
10. Browser/client code never authoritatively calculates business-day, Score, HP, XP, Goal or RBAC outcomes.
11. Business-day calendar calculations use the server-side Saint Petersburg / Europe-Moscow business calendar.
12. Historical versions/ledgers/audit are not destructively overwritten.
13. Cross-module writes occur through application/domain interfaces, not by directly mutating another module's repository.
14. Analytics/read projections may lag; they never become the source for scoring/game decisions.

## 3. Logical system layers

### Client layer
- React/Vite PWA.
- Route/screen composition.
- generated OpenAPI client.
- token-driven UI.
- offline-safe static shell only.
- isolated `SceneHost` for Three.js/R3F.
- approved static 3D fallback.

### API/application layer
- NestJS controllers/guards.
- authentication/session boundary.
- command/query application services.
- idempotency middleware/store.
- transaction orchestration.
- no product calculations in controllers.

### Domain modules
- identity/access;
- personnel/organization/calendar;
- profile/privacy;
- task registry/versioning;
- case workflow;
- AI processing;
- taxonomy/tools;
- progression/game;
- monthly goals;
- rankings;
- analytics/reporting;
- notifications;
- exports;
- audit;
- admin facade/orchestration.

### Infrastructure layer
- PostgreSQL repositories/SQL;
- outbox/inbox/idempotency persistence;
- Redis/BullMQ;
- external providers;
- object storage;
- telemetry/logging.

## 4. Module map

| Module | Responsibility | Owns authoritative writes | May depend on |
|---|---|---|---|
| `MOD-AUTH` | authentication boundary, app role/status enforcement, object-scope policy integration | auth/session/application-role state defined later | Personnel/Profile, Platform |
| `MOD-PERSONNEL` | personnel adapter, employee/org current state, directorates, transfers, corporate calendar | personnel/org/calendar application state | Platform/provider interfaces |
| `MOD-PROFILE` | profile/privacy preferences, vacation command surface, public-profile visibility rules | privacy/profile preference state | Auth, Personnel, Progression |
| `MOD-TASK` | task aggregate, versions, raw input, URLs, active/deleted status | tasks/task versions | Audit |
| `MOD-AI` | processing-run state machine, extraction/plausibility/clarification/classification, STT/LLM calls | AI processing run/evidence/version metadata | Task, Taxonomy/Tools, provider interfaces |
| `MOD-CASE-WORKFLOW` | cross-domain application orchestration from accepted task version through deterministic finalization/reprocess/reversal | no independent business aggregate required; coordinates one transaction | Task, AI, Goals, Progression, Audit |
| `MOD-TAXONOMY-TOOLS` | managed taxonomy, versions, AI tools, aliases, capability knowledge | taxonomy/tool directories | Admin/Audit |
| `MOD-PROGRESSION` | fixed task-point mapping, Score ledger, HP, streak, Evolution XP, achievements, pet progression | ledgers/state needed for deterministic progression | Personnel calendar, Audit |
| `MOD-GOALS` | monthly goal setup, machine rules, matching, progress/rewards/close | goals, progress, reward ledger | Progression, Personnel calendar, Audit |
| `MOD-RANKINGS` | individual/directorate ranking query model and period rules | ranking projection/snapshot if used; never source Score | Progression, Personnel |
| `MOD-ANALYTICS` | employee/company/management analytical queries and read projections | optional derived read projections only | Task, Progression, Goals, Personnel |
| `MOD-NOTIFICATIONS` | in-app notification materialization/read state | notification inbox/read state | consumes domain events |
| `MOD-EXPORTS` | authorized async XLSX/CSV requests, generation and download metadata | export request/status metadata | Auth, Analytics/read services, ObjectStorage |
| `MOD-AUDIT` | immutable technical/admin audit recording and correlation | audit records | used by all mutation application services |
| `MOD-ADMIN-FACADE` | admin-only orchestration over org, roles, calendar, taxonomy/tools/profile controls | no duplicate domain data | Auth, Personnel, Profile, Taxonomy/Tools, Audit |
| `MOD-WEB` | PWA screens, forms, presentation state, generated API client | no authoritative domain data | API + 3D runtime |
| `MOD-3D` | scene lifecycle, loading/disposal, animation presentation, fallback | no business data | semantic presentation state + approved assets |
| `MOD-PLATFORM` | DB transaction runner, queue/outbox/inbox, providers, object storage, observability, runtime config | infrastructure state only | external systems |

## 5. Critical consistency model

### Strongly consistent inside one PostgreSQL transaction
Use one transaction when a user-visible/business invariant would otherwise be broken:
- task version creation and raw-input acceptance;
- task soft-delete/current-version state;
- committed AI assessment + deterministic task-point application + reversible contribution bookkeeping;
- goal contribution/reward application that is part of that accepted assessment;
- critical admin mutation + required audit record;
- business-state change + outbox event that announces that committed change.

### Asynchronous / eventually consistent
Allowed when the source-of-truth state is already safely committed:
- AI provider processing after raw task acceptance;
- in-app notification materialization;
- analytics projections/caches;
- exports;
- personnel synchronization;
- optional ambient weather refresh;
- 3D asset loading;
- outbox transport;
- heavy read-model refresh.

Eventual projections must expose stale/updated metadata where product UX needs it and can always be rebuilt from authoritative data.

## 6. AI-case processing architecture

### Acceptance
1. API authenticates and object-authorizes employee.
2. Validate input and idempotency key where applicable.
3. In one DB transaction:
   - persist task/task version and raw input;
   - create processing run in accepted/pending state;
   - create outbox event.
4. Commit.
5. Return accepted processing state.
6. Outbox dispatcher publishes processing work to BullMQ.

A Redis outage after commit does **not** lose the accepted task: unpublished outbox work remains durable in PostgreSQL and can be dispatched later.

### Processing
Worker:
1. claims `processing_run_id`;
2. checks persisted run/idempotency state;
3. obtains raw task input through Task module;
4. invokes provider-neutral LLM interface;
5. validates structured result;
6. enforces clarification-count state in backend code, not prompt text;
7. records model/prompt/rule/taxonomy versions;
8. if clarification is required, persist waiting state and stop;
9. if final classification is available, pass a typed assessment to Case Workflow.

### Deterministic finalization
Case Workflow starts one DB transaction:
- verifies processing version is still current/eligible;
- commits assessment to Task module;
- maps C1–C5 to fixed backend numerical points;
- invokes Goals with typed task facts;
- invokes Progression to apply/recalculate deterministic ledgers/state;
- writes required audit records;
- writes resulting outbox events.

If any critical step fails, the transaction rolls back. No partial “task scored but goals/game not updated” success is allowed.

### Edit / reprocess / soft delete
- Edit creates a new task version and processing run.
- Old historical version remains immutable.
- When a newer version becomes effective, previous ledger/goal contributions are reversed or superseded through explicit reversible records before new effects become authoritative.
- Soft delete removes task from current product calculations/views while retaining audit/version history and applying deterministic reversal semantics.
- Exact ledger tables/constraints are Stage 5; exact business formulas are Stage 7.

## 7. Idempotency model

Three layers:

### API command idempotency
For duplicate-sensitive commands, persist:
- idempotency key;
- authenticated actor/scope;
- operation identity;
- request fingerprint;
- terminal response/result reference.

Same key + same request returns/references the original outcome. Same key + materially different request is rejected.

Stage 6 defines the exact endpoint list and HTTP behavior.

### Asynchronous message idempotency
Each durable event/job carries a stable message/event ID.
Consumers record processed message identity in PostgreSQL in the same transaction as their side effects.

BullMQ delivery may repeat. Business effect must not.

### Scheduled-job idempotency
Business-period jobs use deterministic keys such as:
- logical job type;
- employee/scope ID where relevant;
- Saint Petersburg business date/month/year.

Retried daily/monthly/yearly jobs must converge to one business result.

## 8. Transactional outbox / inbox

### Outbox
A module that commits domain state and needs async side effects writes an outbox record in the same DB transaction.

Dispatcher:
- reads unpublished outbox records;
- publishes BullMQ work using stable event ID;
- marks transport publication;
- safely retries if interrupted.

Publication marking is transport metadata only. Consumer-side persisted idempotency remains required.

### Inbox / processed-message registry
Async consumers write a processed-message record inside the same DB transaction as business side effects. This protects against:
- worker retry;
- duplicate queue publication;
- process crash after side effect;
- BullMQ at-least-once delivery.

The architecture guarantees **exactly-once business effects where designed**, not exactly-once network delivery.

## 9. Scheduled business jobs

Backend business time is server-side `Europe/Moscow` / Saint Petersburg calendar semantics.

### Daily close
Coordinator finds the relevant corporate working day and schedules deterministic per-employee close/recalculation work.
It covers no-task HP penalty, streak/day close and recovery transitions according to Stage-7 rules.

### Month close / goal rollover
On the Product-defined first working day:
- close previous goal period;
- finalize goal rewards/recap;
- establish required new-month goal setup gate.

### Annual ranking period rollover
Creates/opens the new annual Score/ranking period without deleting lifetime history, pet, Evolution XP or prior-year records.

### Personnel synchronization
Runs through `PersonnelProvider`; source transfer/termination state updates current organization state while historical task directorate attribution remains unchanged.

Exact cron expressions are not frozen here; Stage 16 configures deployment schedules around these business semantics.

## 10. Export architecture

1. Authorized client submits export request.
2. Backend validates RBAC/object scope.
3. Persist `export_request` and outbox work.
4. Worker queries authorized read services/projections in pages/streams.
5. Generate XLSX/CSV outside interactive request path.
6. Store result through ObjectStorageProvider if externalized storage is required.
7. Persist completion/failure metadata.
8. Materialize in-app notification if appropriate.
9. Download endpoint re-authorizes access before returning result.

Large export generation never blocks the interactive API request.
No product task-file attachment feature is introduced.

## 11. Read architecture

### Transactional reads
Use module-owned repositories/query services for:
- task detail/history;
- current profile/goals/progression state;
- current authoritative settings.

### Analytical reads
`MOD-ANALYTICS` may use optimized SQL views/projections/caches for dashboards and aggregates.
Rules:
- projection is derived;
- source ledger/task/version records remain authoritative;
- no scoring/game decision reads from an eventually consistent analytics cache;
- cache loss must be recoverable from PostgreSQL.

### Ranking reads
Ranking module derives current annual/directorate ranking from authoritative Score/org semantics and may maintain rebuildable projections for performance.

## 12. Authorization boundary

Backend enforcement occurs at:
- route/operation scope;
- object scope;
- export scope;
- raw-task field exposure;
- technical scoring-trace exposure.

The frontend may hide unauthorized controls but that is never sufficient authorization.

Current MVP personnel-number + phone verification remains the source-defined authentication behavior. Session/token/cookie mechanics are intentionally deferred to Stage 9.

## 13. Provider boundaries

Provider interfaces:
- `PersonnelProvider`
- `LLMProvider`
- `STTProvider`
- `WeatherProvider`
- `ObjectStorageProvider`
- future external notification provider

Domain/application services depend on interfaces, never concrete vendor SDKs.

### LLM boundary
- prompt input is data, not trusted instructions;
- structured output is schema-validated;
- backend owns clarification limit;
- backend owns C1–C5 → points mapping;
- model/prompt/rule version is persisted;
- provider error cannot erase accepted raw input.

### STT boundary
Audio is transient:
- normal path passes audio/stream to `STTProvider`;
- transcript is returned for user correction;
- source audio is not retained after recognition;
- if a provider requires temporary storage, it must be ephemeral, access-controlled and deleted after terminal transcription handling.

### Weather boundary
Ambient context is optional/non-critical.
Provider failure removes/omits weather context; it never blocks Home, task creation or game rules.

## 14. 3D decoupling

`MOD-3D` has no direct domain/database ownership.

Data flow:
`API DTO / presentation state → Web view-model → semantic mascot/environment state → SceneHost`

SceneHost:
- lazy loads after functional shell;
- loads only allowed production-export assets;
- handles loading/error/context-loss/disposal;
- emits technical scene readiness/failure events only;
- does not call task/game APIs directly;
- cannot calculate HP/Score/XP;
- switches to approved static fallback without changing UI routes/actions.

The same functional UI overlay remains usable over:
1. live realtime scene;
2. loading/preview state;
3. static fallback;
4. failed/unsupported WebGL path.

## 15. Audit architecture

Business/admin mutation services create audit records transactionally where the Product requires auditable mutation.

Audit entries carry correlation to:
- actor;
- operation;
- entity;
- before/after or referenced version as appropriate;
- timestamp;
- correlation/request ID.

Sensitive raw task content is not copied unnecessarily into queue events/logs. Audit visibility itself is RBAC-scoped.

## 16. Environment topology

### Local development
- web;
- API;
- worker/scheduler;
- PostgreSQL;
- Redis;
- mock Personnel/LLM/STT/weather;
- optional local S3-compatible object-store implementation;
- local telemetry/log sink.

### Stage/test
Same logical topology with test/staging external adapters where available.

### Production
Provider-neutral topology:
- static/PWA web delivery;
- stateless API replicas;
- worker replicas;
- PostgreSQL;
- Redis/BullMQ;
- object-storage adapter where required;
- corporate/external provider network boundaries;
- telemetry backend.

No cloud, orchestrator, managed-service vendor, secret store or SSO vendor is invented at Stage 4.

## 17. Explicitly rejected architecture choices

- microservices for MVP;
- LLM direct-to-DB writes;
- queue as source of business truth;
- frontend-calculated Score/HP/XP/Goals;
- client-only authorization;
- synchronous large exports;
- realtime 3D as a required prerequisite for Home;
- direct concrete vendor SDK calls from domain modules;
- analytics cache as scoring source;
- destructive overwrite of task history;
- silent job replay without persisted idempotency.

## 18. Stage-5 handoff constraints

Database Stage 5 must implement this architecture with:
- explicit module-owned entities/tables;
- task/version and processing-run persistence;
- outbox;
- processed-message/inbox or equivalent durable consumer-idempotency mechanism;
- API idempotency persistence;
- score/progression/goal ledgers and reversals;
- audit records;
- export request state;
- job/business-period uniqueness constraints;
- indexes supporting current P0 reads.

The exact schema is intentionally not designed in Stage 4.

## 19. Gate

Architecture blockers: **0**.  
Human decisions required before Stage 5: **0**.

Open non-blocking items remain external corporate deployment/auth/network constraints and source-declared Full Production Freeze assets/tuning.
