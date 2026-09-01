# QA MASTER PLAN

**Status:** `TEST_SYSTEM_FROZEN / EXECUTION_PENDING_IMPLEMENTATION`

## Objective

Every critical acceptance criterion must have a test/evidence path.

Current corpus:
- 294 requirements;
- 274 critical P0/P0-* requirements;
- 20 non-critical/out-of-scope/future/deferred.

Release candidate requires **274/274 critical criteria with passing appropriate evidence**.

## Levels

- Unit/property
- Integration/database
- Contract/API/provider
- Component
- E2E
- Security
- Accessibility
- Visual regression
- PWA
- Hybrid 3D/fallback
- Performance/resilience
- Recovery

## Evidence integrity

Application tests are currently specified, not executed, because the application is not yet implemented.

Never:
- mark an unexecuted runtime test PASS;
- invent provider sandbox evidence;
- invent final visual assets;
- invent RPO/RTO or normal-load capacity;
- convert waived physical-device testing into FPS/memory claims.

## Defect severity — SAFE_ENGINEERING_DEFAULT

- S0: security/data corruption/business-truth loss
- S1: critical MVP flow or wrong Score/HP/XP/RBAC
- S2: major degradation with workaround
- S3: minor functional/visual
- S4: cosmetic

Release candidate: S0=0, S1=0. S2 needs explicit release-risk acceptance.
