# SCORE LEDGER SPEC

## Authority
`scores_ledger` in Stage 5 is the authoritative immutable event ledger. Read models/counters are materialized projections, not the source of truth.

## Fixed task mapping
C1/C2/C3/C4/C5 → 1/5/15/40/100 Annual Score and Lifetime Task Score points for an effective assessed task version.

## Task create
Commit one task ledger event in the same business transaction that makes the assessed version effective. Persist employee, logical task/version source, `directorate_id_at_event`, SPB business date/year, `rule_version` and idempotency key.

## Task edit
1. Create a new immutable task version.
2. Assess it.
3. Reverse the currently effective task Score event(s) for Annual/Lifetime accounting through linked reversal entries.
4. Apply the new version Score.
5. Rebuild affected goal/current-day state.
6. Never mutate historical ledger rows.

## Task delete
Soft delete only. Reverse current Annual/Lifetime task contribution, deactivate/reverse current goal matches and rebuild affected daily state. Evolution XP is governed separately by `XP_LEDGER_SPEC.md` and is not clawed back.

## Monthly goal rewards
At idempotent month close, post one logical reward operation per employee/cycle. Reward: +15 Annual Score per completed goal plus +15 if all three completed; maximum 60 per month. Goal reward never increases Lifetime Task Score.

## Streak/achievement events
The combined DB ledger may carry XP-only rows for streak/achievement sources; Annual/Lifetime deltas are zero unless a future explicitly approved rule says otherwise. Stage 7 invents no such Score bonus.

## Annual rollover
Annual Score is derived/snapshotted by SPB event year. Rollover starts the new current-year period; it does not delete prior ledger history or reset Lifetime Task Score.

## Directorate attribution
Task points remain attributed to the directorate at task/event time. Employee transfer never moves old ledger events. Directorate goal-reward attribution uses the employee/cycle attribution persisted for that event according to Stage-5 data contract.

## Prohibitions
- no manual Score override endpoint;
- no LLM numerical score;
- no destructive ledger update/delete;
- no double effect on retry/duplicate command;
- no retrospective task date change in MVP.
