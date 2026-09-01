# DOCKER / CONTAINER STRATEGY

**Status:** `OCI_PROVIDER_NEUTRAL_BASELINE`

Docker is the local/build contract; production may use any OCI-compatible or equivalent immutable runtime satisfying `DEPLOYMENT_SPEC.md`.

## 1. Images

### Backend image
One backend image, two commands:

```text
api     -> apps/backend bootstrap/api
worker  -> apps/backend bootstrap/worker
```

Benefits:
- exactly the same code/config contract for API and worker;
- no API/worker version skew within one release;
- independent process scaling.

### Web image/artifact
Built Vite static output.

It may be:
- packaged in a minimal static-serving image; or
- uploaded to a provider-native static hosting service.

Both paths consume the same verified `dist` output.

## 2. Build model

Use multi-stage builds.

Builder:
- exact Node 24 patch version frozen during repository bootstrap;
- exact pnpm version through Corepack/packageManager metadata;
- `pnpm install --frozen-lockfile`;
- compile/generate/testable artifacts.

Runtime:
- no compiler/toolchain unless runtime actually requires it;
- production dependencies only;
- unprivileged user;
- minimal writable paths;
- no repository `.env`;
- no source secrets;
- no package-manager cache containing credentials.

Exact base-image digest is pinned in the implementation repository and updated through reviewed dependency maintenance.

## 3. Backend image contents

Include only runtime-required:
- compiled backend;
- production node_modules/runtime bundle;
- package metadata needed for license/runtime diagnostics;
- OpenAPI/version metadata if runtime diagnostics need it.

Do not include:
- tests;
- developer `.env`;
- source credential files;
- raw visual source package;
- arbitrary benchmark/private fixture data.

Database migrations are packaged as a release artifact/job input and are not automatically executed by every API replica startup.

## 4. Web build

Build-time checks must reject:
- secrets under `VITE_*`;
- stale generated API client;
- deprecated runtime visual assets;
- proxy GLB promoted as final;
- failed TypeScript/build;
- service-worker rules that cache authenticated API mutations/business payloads.

## 5. Container runtime baseline

Production-oriented defaults:
- run as non-root;
- read-only root filesystem where application/platform permits;
- writable temp/cache directories explicitly mounted if needed;
- drop unnecessary Linux capabilities where supported;
- no privileged mode;
- no host Docker socket;
- explicit resource requests/limits are deployment tuning, not invented Stage-16 performance numbers;
- graceful termination enabled.

## 6. Graceful shutdown

API:
1. stop accepting new requests;
2. allow bounded in-flight requests to finish;
3. close DB/Redis/telemetry connections;
4. exit.

Worker:
1. stop taking new jobs;
2. allow bounded active jobs to complete or fail safely according to job idempotency contract;
3. persist no business truth only in process memory;
4. close DB/Redis/providers;
5. exit.

Exact grace timeout is environment configuration.

## 7. Local compose

A coding implementation may create a local `docker compose` profile for:
- PostgreSQL;
- Redis;
- backend API;
- backend worker;
- optional local object-storage emulator;
- web.

Core local/test operation must work with mock Personnel/LLM/STT and Weather disabled.

No production provider or infrastructure choice is implied by local Compose.
