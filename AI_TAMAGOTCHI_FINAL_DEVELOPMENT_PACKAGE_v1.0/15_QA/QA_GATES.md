# QA QUALITY GATES

## PR gate
Unit/contract/schema tests for change; secret scan; no new requirement without test ID.

## Integration gate
DB/queue integration, API contracts, provider mocks, audit/idempotency, component tests, critical E2E/a11y smoke.

## Release Candidate gate
- 274/274 critical requirements with passing appropriate evidence;
- 64/64 API operations tested;
- critical RBAC negatives pass;
- deterministic game rules pass;
- 38 FE-T contracts represented;
- active-screen E2E complete;
- all critical/high security controls pass;
- S0=0, S1=0;
- visual/a11y/PWA/3D fallback regressions pass;
- p95 target passes under an accepted documented normal-load profile.

## Industrial production gate
Additionally:
- real Personnel/LLM/STT evidence;
- selected production AI model regression;
- actual encrypted backup/restore drill;
- production security/secret/TLS/alerting evidence;
- external organizational InfoSec/legal approval;
- final external asset/fallback release decision evidence;
- Stage-16 deployment/rollback gate.

Never mark unexecuted tests PASS or invent external evidence.
