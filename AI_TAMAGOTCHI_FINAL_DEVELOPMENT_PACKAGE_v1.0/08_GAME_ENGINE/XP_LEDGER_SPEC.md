# EVOLUTION XP LEDGER SPEC

## Invariant
Evolution XP is irreversible lifetime progress. Every authoritative `evolution_xp_delta` is non-negative; current DB enforces this.

## Sources
1. task-derived credit;
2. monthly-goal reward;
3. one-time streak milestone reward;
4. approved achievement reward.

## Task-derived high-watermark algorithm
For logical task `T`, let `H(T)` be the maximum fixed task Score previously credited as task-derived XP for any effective assessed version of T.

For a newly effective assessed version with fixed Score `S`:
`xp_delta = max(0, S - H(T))`.
After commit, `H(T) = max(H(T), S)`.

Examples:
- new C2: H=0 → +5 XP;
- edit C2→C3: H=5 → +10 XP;
- edit C3→C1: H=15 → +0 XP;
- edit back C1→C3: H=15 → +0 XP;
- soft delete after any state → +0 / no clawback.

This closes `SEM-GAME-001`, preserves monotonicity, preserves 1:1 task-credit ceiling, and blocks XP farming through repeated edits/reprocessing.

## Goal XP
Month-close baseline: +10 XP per completed goal plus +10 all-three, max +40/cycle. Post once, idempotently. Later goal-history recalculation must not create negative XP; any policy to claw back already-awarded XP would require a new owner decision and DB rule change.

## Streak XP
One lifetime award per milestone: 5/10/20/40/80/160 → +5/+10/+20/+40/+80/+150. `streak_milestone_awards` prevents duplicate award.

## Achievement XP
No final catalog/reward amounts are frozen. Grant only from a versioned approved achievement definition; zero/none is not replaced by invented values.

## Stage calculation
Evolution stage is the highest configured stage threshold `<= evolution_xp`. Stage never regresses.

## Idempotency
Every XP operation must have a source-specific stable key. Provider retry, queue redelivery, task reprocessing, month-close retry and milestone retry must be no-ops after the original successful effect.
