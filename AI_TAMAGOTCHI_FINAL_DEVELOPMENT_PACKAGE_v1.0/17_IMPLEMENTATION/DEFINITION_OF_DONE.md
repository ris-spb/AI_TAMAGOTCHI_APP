# DEFINITION OF DONE

## Per coding item

A coding item is Done only when:

1. Acceptance criterion is satisfied by implementation, not only documentation.
2. Mapped `REQT-*` test is implemented and passes for the affected scope.
3. Relevant unit/integration/contract/component/E2E negative cases pass.
4. Lint/typecheck/format check pass.
5. API/generated types remain synchronized if API touched.
6. Migration/repository tests pass if persistence touched.
7. No client-side authoritative Score/HP/XP/Streak/Goals/ranking logic is introduced.
8. Auth/RBAC/object authorization remains server authoritative.
9. Audit/idempotency/history invariants remain intact.
10. New provider path is behind its provider interface and has a mock/failure test.
11. New async path has observable error/state behavior.
12. No secret/raw protected data is added to logs/traces/metrics.
13. Frontend item includes loading/empty/error/forbidden/accessibility states as applicable.
14. 3D item preserves functional fallback.
15. No excluded/future MVP feature is accidentally enabled.
16. Source/contract documentation is updated when the implementation contract changes.
17. Coding-cycle report lists files changed, tests run and evidence for done condition.

## Work package Done

A WP is Done when:
- every in-scope backlog item for the WP is Done or carries an allowed explicit external/deferred evidence status;
- no S0/S1 defect attributable to the WP remains;
- mapped CI/test gates pass;
- package interfaces used by downstream WPs are stable.

## Release Candidate Done

Requires Stage-15/16 gates, including:
- 274/274 critical requirements with appropriate passing evidence;
- all 64 API operations tested;
- security critical/high controls pass;
- S0=0, S1=0;
- visual/a11y/PWA/3D fallback regression;
- performance target tested against documented accepted normal-load profile;
- immutable release artifacts built.

## External dependency semantics

Do **not** mark an external-dependent requirement as production-complete merely because its code/interface/fallback is Done.

Examples:
- real Personnel/LLM/STT evidence;
- organizational InfoSec/legal approval;
- real backup/restore drill;
- final external production GLBs;
- production infrastructure bindings.

The backlog row may report `CODE_DONE_EXTERNAL_GATE_OPEN`, but its production release gate remains open until actual evidence exists.
