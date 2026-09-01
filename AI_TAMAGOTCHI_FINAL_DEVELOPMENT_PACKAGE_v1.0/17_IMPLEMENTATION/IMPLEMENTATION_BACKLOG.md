# IMPLEMENTATION BACKLOG

**Status:** `FROZEN_FOR_CODING_AI`  
**Authoritative row-level file:** `IMPLEMENTATION_BACKLOG.csv`

## 1. Backlog contract

The backlog contains **294 items** — one item per current normalized Feature Matrix requirement.

This granularity is deliberate:
- one stable requirement ID;
- one owning work package/module;
- one acceptance criterion;
- one Stage-15 test ID;
- one done condition;
- one source;
- one priority;
- one explicit external gate where applicable.

If a coding agent discovers that a row still cannot fit one coding cycle, it must split the implementation into internal subtasks **without changing the parent requirement/backlog ID or acceptance semantics**.

It must not combine unrelated backlog rows into one uncontrolled large change.

## 2. Coverage

- total implementation items: **294**
- critical P0/P0-* items: **274**
- critical items with test IDs: **274/274**
- requirements with implementation item: **294/294**
- requirements with acceptance traceability: **294/294**
- implementation status at planning freeze: `NOT_STARTED`

## 3. Work packages

| WP | Wave | Name | Items | Critical | External/deferred gates | Dependencies |
|---|---:|---|---:|---:|---:|---|
| `WP00` | 0 | Repository bootstrap & toolchain | 0 | 0 | 0 | `none` |
| `WP01` | 1 | Shared contracts, config & scope guards | 46 | 27 | 19 | `WP00` |
| `WP02` | 1 | Database, migrations & persistence | 10 | 10 | 0 | `WP00;WP01` |
| `WP03` | 1 | Provider ports & platform adapters | 3 | 3 | 3 | `WP00;WP01` |
| `WP04` | 2 | Authentication, RBAC & Personnel | 21 | 21 | 1 | `WP02;WP03` |
| `WP05` | 2 | AI runtime & processing orchestration | 0 | 0 | 0 | `WP02;WP03` |
| `WP06` | 3 | AI-case & task workflow | 39 | 39 | 0 | `WP04;WP05;WP02` |
| `WP07` | 3 | Deterministic game & progression engine | 29 | 29 | 1 | `WP02;WP06` |
| `WP08` | 4 | Monthly Goals | 15 | 15 | 0 | `WP02;WP06;WP07` |
| `WP09` | 4 | Ratings, privacy & profiles | 17 | 17 | 0 | `WP02;WP04;WP07;WP08` |
| `WP10` | 4 | Directories, notifications, exports & admin backend | 17 | 17 | 0 | `WP02;WP04;WP06` |
| `WP11` | 2 | Frontend foundation & design system | 10 | 10 | 3 | `WP00;WP01` |
| `WP12` | 5 | Employee frontend flows | 27 | 27 | 3 | `WP04;WP06;WP07;WP08;WP09;WP10;WP11` |
| `WP13` | 5 | Management & Admin frontend | 5 | 5 | 0 | `WP04;WP09;WP10;WP11` |
| `WP14` | 5 | Hybrid 3D & visual runtime integration | 37 | 36 | 10 | `WP11;WP12` |
| `WP15` | 6 | Security, observability & resilience hardening | 18 | 18 | 2 | `WP02;WP03;WP04;WP05;WP06;WP10;WP11` |
| `WP16` | parallel | Automated QA implementation | 0 | 0 | 0 | `WP00` |
| `WP17` | parallel | DevOps & release delivery implementation | 0 | 0 | 0 | `WP00;WP16` |
| `WP18` | 7 | Production bindings & external release evidence | 0 | 0 | 0 | `WP03;WP04;WP05;WP14;WP15;WP16;WP17` |

## 4. Coding-cycle rule

For each `IMP-*` item, the coding AI must:

1. read the source requirement and referenced current contracts;
2. verify DoR;
3. touch only the smallest necessary owning modules;
4. add/update the mapped test(s);
5. run affected tests plus lint/typecheck;
6. preserve API/DB/business/visual invariants;
7. report files changed, tests executed and done-condition evidence;
8. leave external evidence explicitly open when it cannot be truthfully produced.

## 5. Priority semantics

- `P0*` — critical for MVP/release contract, subject to its dependency class.
- `OUT_OF_SCOPE_MVP` / `FUTURE_UNSCHEDULED` — implement **scope guards**, not the excluded feature.
- `DEFERRED_OPTIONAL` — safe disabled/default path only unless separately enabled.
- external/provider/asset/governance items — implement interface/fallback/gate now; never fabricate the missing external evidence.

## 6. Source integrity

The current Feature Matrix has 294 requirements.

The physical global `REQUIREMENTS_TRACEABILITY.csv` currently has 258 rows. Stage 17 does not rewrite historical traceability. `ACCEPTANCE_TRACEABILITY.csv` is a complete **Stage-17 implementation/acceptance mapping**, while Stage 19 owns global cross-document reconciliation.
