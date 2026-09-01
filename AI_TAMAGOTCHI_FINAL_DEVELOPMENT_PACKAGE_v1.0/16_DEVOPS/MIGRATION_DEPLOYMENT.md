# DATABASE MIGRATION DEPLOYMENT

**Status:** `DEPLOYMENT_CONTRACT_FROZEN / CURRENT_PHYSICAL_DB_ARTIFACT_RECONCILIATION_REQUIRED`

The project database contract was produced at Stage 5, but the current `/mnt/data` package mount does not contain the Stage-5 physical folder. Stage 16 therefore defines the deployment contract and does not fabricate missing migration SQL.

## 1. Rules

- migrations are explicit release artifacts;
- API replicas never race to auto-migrate on startup;
- migration execution is a single controlled deployment job;
- migration state/version is recorded;
- deployment verifies application↔schema compatibility;
- migration logs never contain secrets/raw protected business data.

## 2. CI migration validation

When repository code exists:
1. create empty PostgreSQL;
2. apply initial + all migrations;
3. validate expected schema;
4. run DB/integration tests;
5. test migration from every currently supported prior production schema/version;
6. fail on drift between explicit SQL/migration source and ORM mappings.

## 3. Release migration classification

Every migration is classified before production:

### `EXPAND_BACKWARD_COMPATIBLE`
Examples:
- add nullable/default-safe column;
- add new table/index;
- additive enum/data support when old code remains safe.

May deploy migration before application rollout.

### `CONTRACT_AFTER_COMPATIBILITY_WINDOW`
Examples:
- remove old column/index;
- tighten constraint after data/code migration.

Must happen only after no deployed supported application version depends on old shape.

### `DATA_MIGRATION_HIGH_RISK`
Examples:
- large backfill;
- semantic transformation of authoritative data.

Requires:
- explicit idempotent/batched plan;
- observability;
- backup/restore readiness;
- rollback/forward-fix classification;
- staging rehearsal.

### `DESTRUCTIVE_OR_IRREVERSIBLE`
Not automatically approved.

Requires explicit release engineering/security/data review and a restore/forward-fix plan. Historical/audit/ledger data must not be casually destroyed.

## 4. Production sequence

1. verify target DB version/schema state;
2. verify recent approved encrypted backup/restore readiness;
3. acquire deployment/migration lock;
4. run migration job once;
5. verify migration result and schema;
6. release lock;
7. roll application compatible with new schema;
8. run DB/API smoke tests;
9. observe error/latency/queue metrics.

## 5. Rollback interaction

Application rollback is allowed only if the migrated schema remains compatible with the previous application release.

If not:
- do not blindly downgrade schema;
- stop promotion/traffic change as required;
- use reviewed forward-fix or restore runbook;
- preserve audit/ledger/history semantics.

## 6. Current package gap

Before Stage-20 readiness, Stage 19 must restore/reconcile the executable Stage-5 schema/migration artifacts physically into the final package.

Stage 16 does not mark those missing files as present.
