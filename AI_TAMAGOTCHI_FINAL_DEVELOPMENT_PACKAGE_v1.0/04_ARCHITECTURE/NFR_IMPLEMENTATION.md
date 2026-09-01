# NFR IMPLEMENTATION

**Stage:** 4  
**Purpose:** translate source-defined NFRs into architectural mechanisms without inventing unapproved production SLAs.

## 1. Performance

### Source target
Home, leaderboard and dashboard basic data target p95 < 2 seconds at normal load.

### Architecture mechanisms
- keep those read paths independent of LLM/STT and 3D asset completion;
- page/limit large lists;
- design indexes in Stage 5 for primary filters/sorts;
- use rebuildable ranking/analytics projections only when needed;
- avoid N+1 cross-module query patterns;
- cache only derived/read data and never authoritative game state;
- lazy-load 3D after functional shell;
- run exports asynchronously.

No database size, requests/sec or device FPS number is invented here.

## 2. Accepted-input durability

Source requirement: accepted raw task input must not be lost when downstream AI fails.

Mechanism:
- raw input and processing run commit in PostgreSQL first;
- AI queue work is emitted through transactional outbox;
- provider call begins only after durable acceptance;
- Redis/provider outage cannot erase accepted input.

Exact availability SLA remains deferred.

## 3. Idempotency / consistency

Required idempotent domains include:
- task submission/finalization;
- scoring ledger application/reversal;
- goal matching/rewards;
- daily close;
- month close;
- annual period rollover;
- exports where duplicate requests could create duplicate artifacts/effects.

Mechanisms:
- API idempotency records;
- unique business operation keys;
- outbox + processed-message registry;
- transaction-scoped side effects;
- version checks for stale AI runs.

## 4. Scalability

MVP architecture scales without microservice decomposition:
- stateless API replicas;
- separately scalable worker replicas;
- PostgreSQL connection pooling/indexing/partitioning only when evidence requires;
- Redis/BullMQ worker concurrency;
- paged/streamed exports;
- rebuildable analytics projections.

Indefinite history is preserved semantically; Stage 5 defines concrete indexes/data lifecycle, not deletion.

## 5. Security

Architecture baseline:
- TLS at network boundaries;
- encryption-at-rest requirement delegated to production infrastructure/provider configuration;
- no secrets in frontend/repository;
- backend route + object authorization;
- raw task content/phone data excluded from ordinary logs;
- provider adapters receive minimum required data;
- rate limiting/abuse controls at API/provider boundary;
- audit correlation;
- secure temporary STT handling;
- external LLM/STT production governance remains a separate organizational review item.

Detailed threat model/security controls are Stage 14.

## 6. Privacy

- peer privacy is enforced in backend query/object authorization;
- Director/Executive/Admin raw-task access follows authorized scope;
- technical scoring trace is Admin-only;
- export scope is re-authorized at request and download;
- queue/event payloads carry IDs/minimal facts instead of copied raw sensitive content where possible.

## 7. Reliability

- PostgreSQL is authoritative;
- outbox prevents DB-committed work from being lost because queue is down;
- workers are restartable;
- jobs are duplicate-safe;
- failed AI/export state persists;
- audit-critical mutations fail transactionally;
- non-critical notifications/weather/3D degrade independently.

No numeric availability target is asserted beyond source-defined expectations.

## 8. Observability

Structured telemetry must cover:
- HTTP requests;
- processing-run lifecycle;
- LLM/STT attempts and latency without raw sensitive prompt logging by default;
- BullMQ queue wait/run/failure;
- export job state;
- daily/monthly scheduled jobs;
- DB error/transaction retry;
- outbox backlog;
- notification backlog;
- 3D client telemetry may report capability/failure categories without claiming certified performance.

Architecture baseline:
- correlation ID propagation;
- Pino JSON logs;
- OpenTelemetry traces/metrics context.

Concrete telemetry backend and alert thresholds are Stage 14/16.

## 9. Accessibility

Frontend architecture must permit:
- semantic controls/labels;
- keyboard access on web;
- scalable text;
- adequate touch targets;
- contrast-conforming token usage;
- reduced-motion mode that also reaches 3D/runtime animation behavior.

Accessibility is not delegated to the 3D layer.

## 10. Localization

- Russian is MVP UI locale;
- user-facing strings externalized from components;
- locale formatting centralized;
- business calendar/time decisions remain server-authoritative and not inferred from browser locale.

## 11. 3D resilience

- SceneHost is lazy and isolated;
- functional shell/CTA/navigation render independently;
- loading/error/static fallback states share the same semantic UI;
- context loss and unsupported capability never block AI-case workflow;
- final production GLB absence is an external asset dependency, not an app architecture blocker.

## 12. Backup / restore

Architecture assumes regular PostgreSQL backup and tested restore capability for production.
Exact RPO/RTO, provider and backup topology are not source-frozen and remain Stage 14/16 operational decisions.

## 13. Deployment portability

Application remains provider-neutral:
- containerizable API/worker;
- PostgreSQL;
- Redis;
- S3-compatible storage interface;
- external-provider adapters;
- no cloud-only application semantics.

A later corporate hosting mandate can be mapped without changing core business modules unless it directly contradicts the frozen technology stack.
