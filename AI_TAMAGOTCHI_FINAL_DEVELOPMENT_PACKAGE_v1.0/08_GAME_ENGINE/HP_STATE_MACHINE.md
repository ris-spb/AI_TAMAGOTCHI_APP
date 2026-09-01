# HP STATE MACHINE

## State mapping
| HP | State |
|---:|---|
| 80–100 | happy |
| 60–79 | normal |
| 40–59 | bored |
| 20–39 | tired |
| 1–19 | very_weak |
| 0 | coma |

HP is clamped to 0..100. Health-state derivation is deterministic from HP except the vacation overlay, which does not create a new numeric HP range.

## New employee
`DEC-H-002` is `RESOLVED_BY_OWNER`: **initial_hp = 100** (option A). The initial derived health state is therefore `happy`. This value is read from the versioned game config; application code must not duplicate it as an unrelated constant.

## Normal active day
For every effective valid task on a working, non-vacation day:
1. derive current day task set after transaction;
2. select one highest-Complexity task as base anchor;
3. base gain = C1 +10 / C2 +15 / C3 +25 / C4 +35 / C5 +45;
4. every other valid task adds +2;
5. target day contribution is deterministic from the full effective day set;
6. materialized HP is recomputed idempotently if an edit/delete changes that set.

## No activity day
After 23:59 SPB, a working non-vacation day with zero effective valid tasks contributes −30 HP and resets streak.

## Freeze day
Weekend/corporate non-working/vacation contributes 0 HP and neither increments nor resets streak.

## Coma
Entry: HP reaches 0 → state `coma`.

Recovery counter increments only on an active working day with ≥1 valid effective task. It is cumulative; current Product does not require adjacency/consecutiveness.
- progress 0 → first active recovery day: counter 1, HP remains 0;
- counter 1 → second active recovery day: counter 2, exit to HP=1 / `very_weak`;
- ordinary positive HP gain is suppressed on the two recovery days;
- ordinary HP gain resumes from a subsequent eligible task/day.

HP=1 is a replaceable safe default supported by a historical Product technical recommendation; current Product only mandates exit to the `very_weak` range. It is not a silent rebalance of any current normative numeric baseline.

## Recalculation
If an effective task is edited/deleted, recompute the affected business day and replay subsequent HP state to current materialized state. Do not mutate historical event/ledger rows; append recalculation/audit semantics according to Stage 5. Evolution XP is not part of HP replay.
