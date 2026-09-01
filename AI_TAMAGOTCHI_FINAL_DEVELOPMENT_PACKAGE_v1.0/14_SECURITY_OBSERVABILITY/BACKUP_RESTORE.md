# BACKUP / RESTORE

## Scope

PostgreSQL is the authoritative business recovery source. Redis/BullMQ is non-authoritative and must be rebuildable. Generated export objects may be retained/re-generated according to object-storage policy; source audio is not a backup asset because it must not be retained.

## Backup requirements

- regular automated PostgreSQL backups;
- encryption at rest and in transit;
- integrity/health verification;
- access restricted to approved operations identities;
- provider-neutral support for point-in-time recovery when the chosen platform supports it;
- backup cadence/retention/RPO/RTO supplied by production governance, not invented here;
- backup failures/freshness observable and alertable.

## Restore test

Before industrial production approval and thereafter per operations policy:
1. provision isolated clean recovery environment;
2. restore latest selected backup;
3. validate schema/migration registry and referential integrity;
4. verify representative task/version, score/XP, goal, personnel-history and audit records;
5. validate application read/startup and deterministic rule version references;
6. invalidate/revoke **all restored auth sessions** before any recovered environment can serve users;
7. record restore test result/audit evidence;
8. destroy isolated environment/data according to operations policy.

A restore failure blocks industrial-production readiness. This document does not claim an executed corporate restore test; Build/QA/operations must run it in actual infrastructure.
