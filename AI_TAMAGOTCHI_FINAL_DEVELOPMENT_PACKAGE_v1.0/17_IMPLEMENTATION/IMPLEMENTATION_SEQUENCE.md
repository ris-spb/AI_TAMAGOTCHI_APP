# IMPLEMENTATION SEQUENCE

**Rule:** sequence is dependency-driven, not an excuse to postpone tests/security to the end.

`WP16 QA` and `WP17 DevOps` are continuous parallel lanes after bootstrap.

## Wave 0 — Bootstrap

### WP00 — Repository bootstrap & toolchain

Exit:
- monorepo boots;
- strict TypeScript;
- pinned Node/pnpm/lockfile;
- root scripts;
- minimal build/test skeleton;
- no business functionality fabricated.

## Wave 1 — Shared platform

Can run partly in parallel after WP00:

### WP01 — Shared contracts/config/scope guards
### WP02 — Database/migrations/persistence
### WP03 — Provider ports/mocks

Key gate:
- config/schema/provider interfaces stable enough for feature modules;
- DB implementation must use restored/executable canonical Stage-5 artifacts once Stage-19 reconciliation supplies them; do not invent historical migration source.

## Wave 2 — Access + AI + frontend foundation

Parallel where dependencies permit:

### WP04 — Auth/RBAC/Personnel
Depends: WP02, WP03.

### WP05 — AI runtime/orchestration
Depends: WP02, WP03.

### WP11 — Frontend foundation/design system
Depends: WP00, WP01.

Exit:
- authenticated server authority works with synthetic Personnel mock;
- AI schema/provider mock runtime works;
- frontend can consume generated OpenAPI client and common UI primitives.

## Wave 3 — Core product truth

### WP06 — AI-case/task workflow
Depends: WP04, WP05, WP02.

### WP07 — Game/progression
Depends: WP02, WP06.

Order inside:
1. durable task acceptance/versioning;
2. processing/finalization;
3. deterministic Score;
4. HP/daily state;
5. Streak;
6. Evolution XP/evolution;
7. historical replay.

Do not build frontend-derived business calculations.

## Wave 4 — Product domains

Can proceed in parallel after their dependencies:

### WP08 — Monthly Goals
### WP09 — Ratings/privacy/profiles
### WP10 — Directories/notifications/exports/admin backend

Exit:
- backend/API domain coverage is sufficient for all main user roles.

## Wave 5 — User-facing product

### WP12 — Employee frontend
### WP13 — Management/Admin frontend
### WP14 — Hybrid 3D/visual runtime

Rules:
- functional UI first;
- 3D is isolated and optional at runtime;
- no final GLB is fabricated;
- current approved fallback remains valid;
- visual implementation uses current handoff, not obsolete source rows.

## Wave 6 — Hardening / release-candidate implementation

### WP15 — Security/observability/resilience

Security was designed earlier; this wave is the final cross-module hardening, not the first time security is considered.

### WP16 — QA completion
Continuous from Wave 0, full RC suite completed here.

### WP17 — DevOps/delivery completion
Continuous from Wave 0, release/promotion/rollback wiring completed here.

Exit:
- no S0/S1;
- 274/274 critical acceptance evidence appropriate to dependency class;
- CI/build/deployment artifacts ready for external/staging execution;
- no fake production evidence.

## Wave 7 — External production binding

### WP18 — Production bindings & external evidence

Includes only when supplied/authorized:
- real Personnel;
- selected production LLM/STT;
- optional Weather if enabled;
- production storage/infrastructure;
- final production assets where delivered;
- production AI benchmark;
- backup/restore evidence;
- InfoSec/legal approval;
- release-environment evidence.

This work package cannot be marked fully done by coding alone.

## Parallel-lane rule

At every wave:
- implement mapped tests with the code;
- keep OpenAPI/generated client synchronized;
- keep migrations explicit;
- add observability for new async/provider paths;
- keep CI gates green.

Do not defer all QA/security/DevOps work until Wave 6.
