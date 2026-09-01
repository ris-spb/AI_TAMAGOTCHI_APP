# DEPLOYMENT SPECIFICATION

**Stage:** 16 — DevOps / Delivery  
**Status:** `PROVIDER_NEUTRAL_BASELINE_FROZEN_WITH_INFRASTRUCTURE_VALUES_OPEN`

## 1. Objective

Define a production-oriented delivery contract without selecting a cloud, on-prem platform, container registry, CI vendor, KMS, SIEM/APM or ingress product that has not been supplied by the project.

The deployable application remains the frozen Stage-3 TypeScript monorepo:

- React/Vite PWA;
- NestJS/Fastify modular-monolith backend;
- separate API and worker/scheduler process entrypoints from one backend codebase/image;
- PostgreSQL authoritative storage;
- Redis/BullMQ non-authoritative queue/cache;
- provider-neutral Personnel/LLM/STT/Weather/Object Storage adapters;
- isolated Three.js/R3F runtime in the browser.

## 2. Deployment units

### `web`
Built React/Vite static application.

Contract:
- immutable hashed frontend assets;
- same-origin delivery with API is preferred;
- `/v1/*` routed to API by ingress/reverse-proxy/platform routing;
- no secret or server-only configuration compiled into frontend;
- static PWA cache only; authenticated API data is not offline business storage.

Implementation may be:
- a static web container; or
- an equivalent provider-native static hosting adapter.

No provider is selected here.

### `backend-api`
Same backend artifact/image as worker, API entrypoint.

Responsibilities:
- `/v1` product API;
- auth/RBAC/object authorization;
- deterministic game/business logic;
- provider orchestration;
- operational liveness/readiness endpoints;
- structured telemetry.

### `backend-worker`
Same backend artifact/image, worker/scheduler entrypoint.

Responsibilities:
- AI processing;
- export jobs;
- transactional outbox consumers;
- scheduled daily/monthly processing;
- retryable background jobs.

Worker is horizontally scalable only when all job semantics remain idempotent and scheduler/close jobs use the Stage-4 concurrency/idempotency contract.

### PostgreSQL
External deployment dependency or separately operated stateful service.

Requirements:
- PostgreSQL-compatible version supported by repository;
- TLS in production;
- encryption at rest;
- backups and tested restore;
- migration credentials separated from ordinary least-privilege runtime credentials where platform allows.

### Redis
External deployment dependency or separately operated stateful service.

Requirements:
- TLS in production;
- Redis is not source of truth;
- loss/restart must not corrupt durable business state;
- queue backlog/health observable.

### Object Storage
Provider-neutral, if selected deployment externalizes generated export artifacts.

Requirements:
- private objects;
- encryption at rest;
- TLS;
- application-level authorization remains in backend;
- no long-lived public export URL contract.

## 3. Provider-neutral infrastructure capabilities

The production hosting target must provide, directly or through equivalent components:

- OCI-compatible container execution or equivalent immutable application-artifact execution;
- TLS ingress/routing;
- secret/config injection;
- immutable release artifact selection by digest/version;
- process liveness/readiness checks;
- controlled rolling/blue-green/equivalent deployment;
- horizontal scaling for API/worker when needed;
- PostgreSQL;
- Redis;
- encrypted backup storage;
- observability export/collection;
- network egress to approved external providers only;
- one-off migration job execution;
- rollback to a previous application artifact.

This is a capability contract, not a Kubernetes requirement.

## 4. Public routing baseline

Preferred same-origin routing:

```text
https://<application-origin>/             -> web
https://<application-origin>/v1/...       -> backend-api
https://<application-origin>/health/...   -> backend operational health
```

The exact hostname/domain is OPEN.

No provider credentials, storage credentials, database URLs or Personnel/LLM/STT credentials are exposed to `web`.

## 5. Internal connectivity

Production:
- web/browser ↔ ingress/API: TLS;
- API/worker ↔ PostgreSQL: TLS;
- API/worker ↔ Redis: TLS;
- API/worker ↔ approved external providers: TLS;
- worker ↔ Object Storage: TLS.

Certificate validation cannot be disabled.

## 6. Release identity

Each deployable release must have:
- immutable source revision identifier;
- application version/release identifier;
- build timestamp;
- lockfile checksum;
- OpenAPI checksum;
- migration set checksum;
- runtime-config schema checksum;
- web artifact checksum or container digest;
- backend container digest;
- build manifest.

Do not deploy mutable `latest` as the only production identity.

## 7. Deployment sequence

Provider-neutral baseline:

1. select immutable candidate artifacts;
2. verify manifest/checksums/signals from CI;
3. validate target environment configuration and secret references;
4. verify backup/restore readiness for production;
5. validate migration plan against target schema/version;
6. execute one controlled migration job if required;
7. deploy/roll API;
8. wait for API readiness;
9. deploy/roll workers;
10. verify worker heartbeat/queue connectivity;
11. publish/deploy web artifact;
12. run post-deploy smoke + RBAC/API checks;
13. observe telemetry during configured stabilization window;
14. promote release record to successful only after all mandatory gates pass.

Exact stabilization duration is operations configuration, not invented here.

## 8. Deployment failure principle

A failed deployment must not:
- leave an incompatible application/schema combination;
- re-run non-idempotent business jobs;
- silently enable disabled MVP features;
- promote mock critical providers to production;
- promote proxy GLBs to final production assets;
- mark release healthy before required smoke checks.

## 9. Production dependencies still OPEN

No production claim is made for:
- hosting provider/platform;
- container registry;
- DNS/domain;
- ingress/load-balancer product;
- certificate issuer;
- KMS/secrets vendor;
- DB/Redis provider;
- observability backend;
- object-storage vendor;
- production Personnel/LLM/STT values;
- backup engine;
- network topology/corporate egress policy.

These are isolated infrastructure/external decisions and do not block the Stage-17 implementation plan.
