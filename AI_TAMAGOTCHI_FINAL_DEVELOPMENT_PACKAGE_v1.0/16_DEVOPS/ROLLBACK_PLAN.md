# ROLLBACK PLAN

**Policy:** rollback preserves authoritative data and audit/history integrity.

## 1. Release rollback classes

### A — application-only rollback
Use when DB/config remain backward-compatible.

Steps:
1. stop further promotion;
2. select previous successful immutable artifact digests;
3. roll API;
4. roll workers;
5. roll web;
6. verify readiness;
7. run smoke/RBAC checks;
8. observe telemetry;
9. record rollback release event.

### B — configuration/feature rollback
Allowed only for operational config/approved flags.

Never use configuration rollback to:
- enable hard-disabled MVP features;
- change frozen game balance without versioned rule change;
- bypass security/RBAC;
- claim a missing final asset exists.

### C — migration forward-fix
Preferred when current schema is not safely downgradable but data is intact.

Deploy reviewed compatible fix migration/application pair.

### D — database restore
Last-resort recovery for corruption/destructive migration/incident.

Must follow Stage-14 `BACKUP_RESTORE.md`:
- restore encrypted backup to controlled environment;
- validate invariants;
- revoke all restored sessions;
- reconcile outbox/jobs idempotently;
- run security/RBAC/smoke checks before reopening.

## 2. Worker-specific rollback

Before worker rollback:
- stop acquisition of new jobs;
- allow bounded active jobs to finish or fail safely;
- rely on job idempotency for retry;
- ensure old worker release supports current DB/job payload shape.

Do not duplicate Daily Close/monthly Goal close/export/AI finalization side effects.

## 3. Web rollback

Web may be rolled back independently only if:
- previous web remains compatible with current API contract;
- current API still supports required response fields/behavior;
- security configuration remains valid.

## 4. Trigger conditions

Potential rollback:
- health/readiness failure;
- S0/S1 defect;
- RBAC/security regression;
- wrong deterministic Score/HP/XP/Goals behavior;
- unacceptable error/latency regression;
- migration failure;
- critical queue processing failure.

Exact error-rate/latency operational threshold is not invented by Stage 16.

## 5. Forbidden rollback shortcuts

- manual production DB edits without audited migration/incident procedure;
- deleting audit/ledger history to "undo" a release;
- resetting Evolution XP;
- replaying queues without idempotency safeguards;
- reusing old container tag when digest differs;
- production rebuild from unapproved source.
