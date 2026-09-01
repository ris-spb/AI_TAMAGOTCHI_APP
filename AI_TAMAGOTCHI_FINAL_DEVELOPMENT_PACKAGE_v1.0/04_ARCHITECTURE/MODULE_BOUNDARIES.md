# MODULE BOUNDARIES

**Stage:** 4  
**Rule:** one PostgreSQL database is permitted, but module write ownership remains explicit. Shared database does not mean shared mutable ownership.

## 1. Boundary rules

1. Each domain module owns its write model/repositories.
2. Another module may not update that write model directly.
3. Cross-domain invariants use an application orchestration service and one transaction when strong consistency is required.
4. Cross-module asynchronous side effects use outbox events.
5. Analytics may use dedicated read projections/views but never writes another module's authoritative state.
6. Shared packages contain technical primitives/contracts, not mutable global business state.
7. There is no generic `common` business module that becomes an unowned dumping ground.

## 2. Modules

### MOD-AUTH — Identity & Access
**Responsibilities**
- authenticate according to current MVP mechanism;
- application role/status checks;
- route/operation guards;
- object-scope authorization policy hooks.

**Does not own**
- personnel truth;
- directorate membership history;
- privacy preferences;
- task data.

**Depends on**
- MOD-PERSONNEL;
- MOD-PROFILE;
- MOD-PLATFORM.

### MOD-PERSONNEL — Personnel, Organization & Corporate Calendar
**Responsibilities**
- current employee/personnel representation obtained through provider;
- directorates;
- transfer/termination/current-active facts;
- director assignments;
- corporate work calendar;
- business-date answers.

**Invariant**
Historical task attribution remains on task/version records and is not rewritten by current org transfer.

### MOD-PROFILE — Profile & Privacy
**Responsibilities**
- peer privacy level;
- profile-facing preferences;
- public-profile exposure rules;
- vacation command surface/state coordination.

Vacation business effect itself is consumed by progression/calendar logic; privacy never overrides authorized management access.

### MOD-TASK — Task Registry
**Responsibilities**
- task identity;
- immutable task versions;
- raw input;
- input channel;
- links;
- current/effective version;
- soft-delete state;
- committed normalized/assessment snapshot references.

**Does not**
- call LLM/STT;
- calculate points;
- calculate goals/game values.

### MOD-AI — AI Processing
**Responsibilities**
- processing-run state machine;
- provider request/attempt metadata;
- plausibility;
- clarifications;
- structured extraction;
- taxonomy/tool candidate mapping;
- C1–C5 classification;
- prompt/model/rule/taxonomy version metadata.

**Hard boundary**
Produces typed evidence/classification only. Numerical score is not an AI output.

### MOD-CASE-WORKFLOW — AI-Case Application Orchestrator
**Responsibilities**
- accept/create processing work;
- coordinate final assessment transaction;
- reprocess/edit workflow;
- coordinate reversal/supersession on new version or delete.

**No independent scoring algorithm**
Delegates deterministic rules to owning modules.

### MOD-TAXONOMY-TOOLS — Taxonomy, Tools & Capability Knowledge
**Responsibilities**
- managed category/subcategory dictionary and version;
- tags classification support;
- AI tool directory/aliases;
- unrecognized-tool lifecycle;
- versioned tool-capability knowledge used by plausibility checks.

### MOD-PROGRESSION — Score / HP / Streak / Evolution / Achievement
**Responsibilities**
- fixed C1–C5 point mapping;
- Score ledger and reversal semantics;
- daily activity contribution used by HP/streak;
- pet HP/health/coma/recovery;
- streak and milestones;
- irreversible Evolution XP and stages;
- achievement/cosmetic earning state.

**Source of truth**
Deterministic backend configuration/rules, never LLM or client.

### MOD-GOALS — Monthly Goals
**Responsibilities**
- month goal setup gate;
- five generated options / select two / mandatory third;
- declarative machine-readable goal rule;
- task matching;
- progress;
- completion rewards;
- month close/recap.

### MOD-RANKINGS — Ranking
**Responsibilities**
- current-year employee ranking;
- directorate ranking semantics;
- ranking read models;
- period rollover representation.

**Reads**
Progression Score + historical/current org facts.
Does not own Score.

### MOD-ANALYTICS — Analytics & Reporting Reads
**Responsibilities**
- personal/company/director/executive analytical queries;
- time filters/comparisons;
- rebuildable optimized projections.

**Restrictions**
- no scoring/game writes;
- no peer privacy bypass;
- no technical trace exposure except through authorized admin path.

### MOD-NOTIFICATIONS — In-App Notifications
**Responsibilities**
- materialize allowed notification candidates into in-app inbox;
- read/unread/delivery state.

**Input**
Consumes committed events. Notification failure never reverses the originating business event.

### MOD-EXPORTS — Exports
**Responsibilities**
- export request lifecycle;
- role/object-scope authorization;
- async generation;
- object storage integration;
- completion/failure/download metadata.

### MOD-AUDIT — Audit
**Responsibilities**
- append-only mutation/admin audit;
- correlation metadata;
- authorized technical trace support.

**Critical mutations**
If a Product-required audit record cannot be committed in the same transaction, the critical mutation fails rather than silently becoming unaudited.

### MOD-ADMIN-FACADE — Admin Orchestration
**Responsibilities**
- admin route/use-case composition across Personnel, Auth, Profile, Taxonomy/Tools and Audit.

**Does not**
duplicate those modules' tables or bypass their invariants.

### MOD-WEB — PWA / Presentation
**Responsibilities**
- routes/screens/forms;
- Russian i18n layer;
- accessibility/reduced motion;
- generated API client;
- presentation-only state.

### MOD-3D — Realtime/Hybrid Scene Runtime
**Responsibilities**
- Three/R3F scene host;
- asset loading/disposal;
- camera/light presentation config;
- semantic animation mapping;
- capability/failure/fallback state.

**Never**
owns domain state or talks directly to PostgreSQL/Redis.

### MOD-PLATFORM — Technical Infrastructure
**Responsibilities**
- DB connection/transactions;
- outbox/inbox/idempotency storage adapters;
- Redis/BullMQ;
- provider adapters;
- object storage;
- logging/tracing/metrics;
- configuration/secrets access boundary.

## 3. Allowed dependency direction

```text
MOD-WEB -> external API contract
MOD-WEB -> MOD-3D (presentation interface only)

API/Application -> MOD-AUTH
API/Application -> domain modules

MOD-CASE-WORKFLOW -> MOD-TASK
MOD-CASE-WORKFLOW -> MOD-AI
MOD-CASE-WORKFLOW -> MOD-GOALS
MOD-CASE-WORKFLOW -> MOD-PROGRESSION
MOD-CASE-WORKFLOW -> MOD-AUDIT

MOD-AI -> MOD-TAXONOMY-TOOLS
MOD-AI -> provider interfaces
MOD-GOALS -> business-calendar query
MOD-PROGRESSION -> business-calendar query
MOD-RANKINGS -> read interfaces from MOD-PROGRESSION / MOD-PERSONNEL
MOD-ANALYTICS -> read interfaces/projections
MOD-NOTIFICATIONS <- domain/outbox events
MOD-EXPORTS -> authorized read/query services

all server modules -> MOD-PLATFORM abstractions
```

## 4. Forbidden dependencies

- MOD-WEB -> database/Redis.
- MOD-3D -> business repositories.
- MOD-AI -> Score/HP/XP write repository.
- MOD-ANALYTICS -> business-ledger mutation.
- MOD-RANKINGS -> Score mutation.
- MOD-ADMIN-FACADE -> direct table updates bypassing module services.
- provider SDK -> domain model types leaking through core services.
- module A -> module B private repository implementation.

## 5. Transaction ownership

`MOD-CASE-WORKFLOW` and specific admin/calendar application services are allowed to open a transaction boundary that invokes multiple module interfaces. Individual modules remain responsible for validating their invariants inside that transaction.

No distributed transaction is required in MVP because critical business modules share PostgreSQL.
