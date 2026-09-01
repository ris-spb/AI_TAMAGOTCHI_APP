# MISSING FILES — STAGE 19

**Classification:** `BLOCKER — INTERNAL CANONICAL PACKAGE FILES MISSING`

Current physical package is missing **46** canonical internal files recorded by prior Stage manifests:
- Stage 5: **10**
- Stage 9: **17**
- Stage 14: **19**

The exact paths, expected byte sizes and SHA-256 values available from prior manifests are listed in `MISSING_FILES.csv`. The stage-manifest files themselves have no self-hash by design, so their expected hash is marked accordingly.

## Why they cannot be replaced by prose

### Stage 5
Contains the required executable `schema.sql` and `INITIAL_MIGRATION.sql`. The package specification explicitly forbids using ERD/prose as a substitute for executable DB baseline.

### Stage 9
Contains the canonical Auth/RBAC/Personnel contracts required by coding Build Stage 5/6 and by role↔endpoint cross-audit.

### Stage 14
Contains the canonical technical security/observability, threat, audit, logging, metrics, tracing, alerting and backup/restore contracts required by Build Stage 23.

## Evidence integrity
Prior manifests in File Library prove these files were created; Stage19 does **not** create fake placeholders or approximate SQL/security/auth documents in their place.

## Required remediation before Stage20
Restore the exact canonical files into their original relative paths and verify manifest size/hash. Then rerun Stage19 physical checks.

## Packaging-only input-source copies
`01_INPUT_SOURCES/` currently contains only `SOURCE_INVENTORY.csv`; actual Product/Design/Visual/Readiness source copies are not yet in the physical package. This is tracked separately as **Stage21 packaging work**, but the three missing generated canonical stages above are an immediate Stage19/20 blocker.
