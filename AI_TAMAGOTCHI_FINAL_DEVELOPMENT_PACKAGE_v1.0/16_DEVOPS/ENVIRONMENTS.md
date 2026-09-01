# DEVOPS ENVIRONMENTS & PROMOTION

Stage-13 canonical environment classes remain:

- `local`
- `test`
- `staging`
- `production`

The Stage-16/TZ shorthand `dev / stage / prod` maps as:

```text
dev   -> local/development workflow
stage -> staging
prod  -> production
```

`test` remains the isolated CI/integration environment and is not removed.

## Local

Purpose:
- development;
- mocks;
- fast deterministic feedback.

Baseline:
- mock Personnel/LLM/STT;
- Weather disabled;
- PostgreSQL/Redis local/containerized;
- local storage/emulator if needed;
- no real secrets committed;
- final GLBs not required because approved fallbacks exist.

No production readiness claim.

## Test / CI

Purpose:
- automated deterministic test execution.

Baseline:
- ephemeral PostgreSQL/Redis;
- synthetic fixtures;
- mock providers;
- no production credentials;
- no production employee data;
- low security rate limits may be injected specifically for rate-limit tests;
- built application artifacts may be ephemeral.

## Staging

Purpose:
- pre-production integration/acceptance.

Required for claims that depend on real infrastructure:
- real/sandbox provider contract testing when authorized;
- production-like TLS/secrets/config behavior;
- migration rehearsal;
- full E2E/security/a11y/visual/PWA/3D fallback;
- documented performance profile;
- backup/restore rehearsal;
- immutable artifact promotion test.

Staging is not evidence that production InfoSec/legal approval exists.

## Production

Required:
- real Personnel/LLM/STT;
- no hard-disabled MVP flag enabled;
- external notifications false;
- TLS;
- encrypted DB/backups;
- approved secrets mechanism;
- verified migration/rollback plan;
- alerting/observability;
- actual backup/restore evidence;
- external InfoSec/legal approval;
- immutable artifacts.

Weather may remain disabled.

Final production 3D assets may remain unavailable only where the approved release explicitly uses the frozen fallback contract; the flag `asset.finalProduction3dAvailable` must never lie.

## Promotion rule

Artifacts flow:

```text
build once -> test -> staging -> production
```

Do not rebuild between staging acceptance and production promotion.

Environment-specific differences belong to configuration/secrets/provider bindings, not application source code or business rule forks.
