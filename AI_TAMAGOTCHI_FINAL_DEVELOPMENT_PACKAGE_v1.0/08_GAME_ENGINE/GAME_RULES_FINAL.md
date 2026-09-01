# GAME RULES FINAL

**Stage:** 7 — Business Rules & Game Engine Freeze  
**Rule version:** `game_rules_v1.0-baseline.stage7`  
**Gate status:** `BASELINE_FROZEN`

## 1. Authority and runtime boundary
The normative balance is the current Product Specification `TZ_AI_Tamagotchi_v1.0 (1).docx`. Stage 7 converts it into deterministic backend rules and `game_config.json`; it does not rebalance the product.

The LLM may return structured evidence and a C1–C5 classification. It must never calculate authoritative Score, HP, Evolution XP, goal rewards, streak or ranking. The backend applies this versioned ruleset and persists `rule_version` with business events.

## 2. Business time
- Business timezone: `Europe/Moscow` / Saint Petersburg.
- Task business date is the server-derived registration date; retrospective dating is not supported.
- Working/non-working status comes from the corporate calendar.
- Day close semantic cutoff is 23:59 local time.
- Weekend, corporate non-working day and active vacation freeze HP/streak.

## 3. Task Score
Complexity is the only base scoring dimension:

| Complexity | Score |
|---|---:|
| C1 | 1 |
| C2 | 5 |
| C3 | 15 |
| C4 | 40 |
| C5 | 100 |

No role/importance/tool-count multiplier exists. No role may manually override the computed C-level/Score. Edit creates a new task version and reprocessing; current Annual/Lifetime task accounting reverses the prior effective version and applies the new effective version.

## 4. Evolution XP reconciliation — `SEM-GAME-001` CLOSED
Evolution XP is monotonic and never decreases. To reconcile that invariant with task edit/delete and prevent edit-based XP farming, task-derived XP uses a **logical-task high-watermark**:

`task_xp_delta = max(0, current_task_score - highest_task_score_ever_credited_for_same_logical_task)`

Consequences:
- first assessed task: grant its fixed task Score as XP;
- edit to higher C-level: grant only the positive difference;
- edit to same/lower C-level: grant 0 additional XP;
- soft delete: no XP clawback;
- repeated processing/version retry: no duplicate XP;
- Annual Score and Lifetime Task Score still reflect the current effective task through reversal/re-application.

This is a deterministic reconciliation of existing invariants, not a balance change.

## 5. HP
HP is clamped to 0..100. Health states:
- 80–100 `happy`;
- 60–79 `normal`;
- 40–59 `bored`;
- 20–39 `tired`;
- 1–19 `very_weak`;
- 0 `coma`.

For a normal active working day, base HP gain is selected by the **maximum Complexity among valid effective tasks**: C1 +10, C2 +15, C3 +25, C4 +35, C5 +45. Every other valid effective task that day adds +2 HP. Positive gain is applied immediately on committed task finalization; HP is capped at 100.

A closed working day with zero effective valid tasks applies −30 HP. Non-working days and active vacation apply 0.

### Initial HP — `DEC-H-002` RESOLVED_BY_OWNER
The Product source did not define a starting HP, so Stage 7 requested an owner decision. The owner accepted the recommended option **A = 100 HP**. A newly initialized employee/pet therefore starts at **100 HP**, which deterministically maps to the `happy` state. This is an explicit owner-approved game-balance seed, not an engineering default.

## 6. Coma / recovery
- HP=0 enters `coma`; permanent death does not exist.
- Recovery requires 2 active working days containing ≥1 valid effective task.
- Day 1 increments recovery progress but HP remains 0/coma.
- Day 2 exits to `very_weak`.
- Normal HP gain is suppressed during the two recovery days, therefore a single C5 cannot bypass the two-day recovery rule.
- A lower-precedence historical Product technical recommendation gives HP=1 as the starting exit value; Stage 7 adopts `1` as a replaceable `SAFE_ENGINEERING_DEFAULT` because it exactly satisfies `very_weak` and does not conflict with the current Product rule.
- The current Product does not require the two active days to be consecutive. Recovery progress therefore does not reset on an inactive/non-working/vacation day; only active working days increment it.
- Normal HP gain resumes after coma exit, on a subsequent eligible task event/day.

## 7. Vacation
Vacation is a non-retroactive user overlay. While active: HP and streak freeze. It does not lower goal thresholds, extend a goal period, prorate the month or create a failure penalty.

## 8. Streak
- Active working day = ≥1 valid effective task.
- Increment at most +1 per business day.
- Working day with zero tasks resets current streak to 0.
- Non-working/vacation days freeze the current value.
- Personal best is monotonic max(current/best).
- No Streak Shield.
- One-time lifetime XP milestones: 5/10/20/40/80/160 days → +5/+10/+20/+40/+80/+150 XP.

## 9. Monthly Goals
- Exactly 5 measurable options are generated.
- Employee selects exactly 2.
- System assigns exactly 1 immutable third goal.
- Setup gate blocks the main interface when required.
- Mid-month first login has no proration.
- `rule_json`/criterion must be backend-executable; free-form LLM judgment alone cannot complete a goal.
- One task may advance multiple goals.
- Stored current progress is capped at target; overachievement gives no extra goal reward.
- Failure has no HP/Score penalty.
- Previous month closes on the first working day of the next month.
- Close reward baseline: Annual Score +15 per completed goal +15 all-three (max 60/month); Evolution XP +10 per completed goal +10 all-three (max 40/month).

## 10. Evolution
Evolution XP sources: task high-watermark credit, monthly-goal XP, one-time streak milestone XP and approved achievement XP. XP/stage do not regress because of HP, coma, task edit/delete or annual rollover.

Baseline stages:
- E1 Детеныш: 0;
- E2 Любознайка: 250;
- E3 Исследователь: 750;
- E4 Изобретатель: 2000;
- E5 AI-мастер: 5000.

Thresholds/names remain configurable baselines requiring pilot simulation; no silent tuning is performed. Branch selection is immutable after selection and visual-only: no Score/HP/ranking advantage.

## 11. Achievements
The source gives only an orientation of approximately 20–30 MVP achievements. Stage 7 does not invent the catalog, XP rewards or art. The engine supports versioned achievement rules/rewards once approved. User collection is earned-only.

## 12. Rankings
Individual ranking is current-calendar-year Annual Score. Annual Score resets January 1; HP, Evolution XP, history, achievements and cosmetics persist.

Directorate ranking:
`Average Directorate Score = current-year task/goal points attributed to the directorate / current authorized employee count`.
Historical points use directorate-at-event and do not move after transfer. Terminated employees leave current individual ranking/current denominator but history remains.

Safe zero-denominator rule: if current authorized employee count is 0, `average_score = null` and the directorate is not ranked. This avoids division by zero without altering any earned points.

## 13. Edit/delete/recalculation
Edit/delete never overwrites history. A task edit creates a new version; soft delete removes it from current calculations. Score/goal/daily effects are reversed/rebuilt idempotently.

If a task change alters an already-closed business day, replay deterministic HP/streak materialization from the earliest affected business date forward using versioned effective tasks, corporate-calendar state and vacation snapshots. Historical ledgers/events remain append-only; materialized daily/current state may be recomputed. Evolution XP is excluded from negative replay by the high-watermark rule.

## 14. Idempotency and versioning
Every ledger-affecting task finalization, edit/delete recalculation, day close, month close, streak milestone and annual rollover uses a stable business idempotency key. A config/rule change applies prospectively; historical events keep the rule version under which they were created. Retroactive balance migration requires a separate explicit decision.

## 15. Freeze gate
All Stage-7 deterministic business/game rules are implementation-frozen for the MVP baseline. `DEC-H-002` is resolved by owner as **100 HP**. Remaining balance simulation/calibration and incomplete achievement/art content are non-blocking and must not silently change these rules. Stage 8 may begin after owner approval of this Stage-7 completion.
