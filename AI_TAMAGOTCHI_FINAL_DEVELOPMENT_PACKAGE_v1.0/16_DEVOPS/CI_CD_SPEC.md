# CI/CD SPECIFICATION

**Status:** `PROVIDER_NEUTRAL_PIPELINE_CONTRACT`

No Git hosting/CI vendor is selected.

## 1. Pipeline classes

### Pull-request / change gate
Must run without production credentials:
1. repository integrity / lockfile check;
2. generated-contract freshness;
3. formatter check;
4. lint;
5. TypeScript typecheck;
6. JSON/YAML/OpenAPI/config-schema validation;
7. unit/property tests;
8. database/migration tests using ephemeral PostgreSQL;
9. Redis/queue integration tests where applicable;
10. provider mock contract tests;
11. security negative/static checks;
12. secret scan;
13. dependency vulnerability/license checks;
14. frontend component tests;
15. critical E2E/accessibility smoke where implementation supports it;
16. build web/backend.

No failed P0/critical test may be ignored to merge a release candidate.

### Default-branch integration gate
Includes PR gate plus:
- broader integration/E2E;
- migration-from-supported-schema tests;
- visual regression on deterministic baseline;
- PWA/fallback tests;
- container image build;
- image/static artifact secret scan;
- SBOM/dependency inventory if supported by the selected CI implementation;
- immutable artifact manifest/checksums.

### Release-candidate gate
Includes Stage-15 RC QA gate:
- 274/274 critical evidence appropriate to dependency class;
- all 64 API operations tested;
- critical RBAC/security negatives;
- visual/a11y/PWA/3D fallback regressions;
- S0/S1 = 0;
- documented performance run for Product p95 target;
- release artifact manifest final.

### Production promotion gate
Requires:
- immutable release candidate already passed;
- production environment config validation;
- no mock Personnel/LLM/STT;
- external notifications remain disabled;
- approved game rule version;
- selected production model regression;
- encrypted backup + actual restore evidence;
- security/TLS/secrets/alerting evidence;
- organizational InfoSec/legal approval for real production data processing;
- migration/rollback plan;
- production release checklist.

## 2. Exact commands contract

Repository bootstrap must expose stable root commands equivalent to:

```text
pnpm format:check
pnpm lint
pnpm typecheck
pnpm validate:contracts
pnpm test:unit
pnpm test:integration
pnpm test:api
pnpm test:security
pnpm test:e2e
pnpm test:a11y
pnpm test:visual
pnpm test:pwa
pnpm test:3d
pnpm build
```

Exact package scripts are implemented during coding, but their semantic gates must exist.

Migrations must have a separate validation command/job and must not be hidden inside application startup.

## 3. Caching

CI may cache:
- pnpm content-addressable store;
- Turborepo cache;
- browser/test binaries where safe.

Never cache:
- plaintext secrets;
- provider tokens;
- real employee data;
- database snapshots with real production data in ordinary CI artifacts.

Cache hits do not bypass lint/typecheck/tests for changed dependency graph inputs.

## 4. Real-provider tests

Real Personnel/LLM/STT sandbox tests:
- explicit opt-in profile;
- authorized non-production credentials;
- never required for ordinary untrusted PR jobs;
- evidence stored without secrets/raw protected content.

## 5. Failure policy

Pipeline fails on:
- format/lint/typecheck failure;
- stale OpenAPI/generated client;
- migration/schema validation failure;
- failed critical/P0 tests;
- secret finding not explicitly proven false positive;
- prohibited dependency/runtime asset;
- container build failure;
- missing required release metadata.

No "allow_failure" for critical release gates.

## 6. Deployment trigger

The CI system builds artifacts. Deployment system promotes immutable artifacts.

Production must not rebuild from source after approval; it promotes the same digest/artifact that passed the release-candidate gates.

## 7. Rollback readiness

Every production promotion records:
- previous successful release ID/digests;
- current release ID/digests;
- migration set/version;
- rollback classification from `ROLLBACK_PLAN.md`;
- config version;
- smoke-test evidence reference.
