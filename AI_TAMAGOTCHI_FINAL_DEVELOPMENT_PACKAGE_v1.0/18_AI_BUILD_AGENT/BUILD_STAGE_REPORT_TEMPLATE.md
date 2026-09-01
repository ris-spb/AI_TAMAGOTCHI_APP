# BUILD STAGE REPORT TEMPLATE

```text
BUILD STAGE <N> — <NAME>

STATUS:
PASS | PASS_WITH_EXTERNAL_GAPS | BLOCKED

OBJECTIVE COMPLETED:
- ...

BACKLOG ITEMS:
- targeted: IMP-...
- completed: IMP-...
- not completed: ...

CREATED:
- ...

UPDATED:
- ...

COMMANDS / VALIDATION:
- formatter — PASS/FAIL/N_A_NOT_INTRODUCED — <command>
- lint — PASS/FAIL/N_A_NOT_INTRODUCED — <command>
- typecheck — PASS/FAIL/N_A_NOT_INTRODUCED — <command>
- unit tests — PASS/FAIL/N_A_NOT_INTRODUCED — <command + counts>
- relevant integration/contract/E2E — PASS/FAIL/N_A_NOT_INTRODUCED — <command + counts>
- migrations validation — PASS/FAIL/N_A_NOT_INTRODUCED — <command>
- stage-specific tests — PASS/FAIL — <details>

P0 TEST FAILURES:
- none | <IDs>

TRACEABILITY UPDATED:
- <REQ> -> <IMP> -> <files/modules> -> <tests> -> PASS/OPEN

KNOWN ISSUES:
- none | ...

OPEN EXTERNAL / DEFERRED:
- none | ...

HUMAN DECISIONS REQUIRED:
- none | DEC-H-...

SOURCE/CONTRACT CONFLICTS:
- none | ...

GATE:
PASS | BLOCKED
Reason: ...

NEXT BUILD STAGE:
<N+1> — <NAME>

STOP:
WAITING FOR OWNER APPROVAL
```

An unexecuted check is never PASS. `N_A_NOT_INTRODUCED` is only pre-introduction. Once migrations exist, migration validation is mandatory. Failed affected P0 => BLOCKED. `PASS_WITH_EXTERNAL_GAPS` is only for explicit external/deferred evidence when local code/interface/mock/fallback tests pass.
