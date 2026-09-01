# MONTHLY GOALS ENGINE

## Cycle
One employee/month cycle using Saint Petersburg business calendar. Setup is mandatory at the Product-defined gate and blocks main application flow until completed.

## Option/setup invariant
- exactly 5 generated measurable options;
- employee selects exactly 2;
- system assigns exactly 1 third goal;
- third goal cannot be replaced/rejected;
- final active set = exactly 3 goals.

The transaction must validate the complete 5/2/1 structure before activating the cycle.

## Goal definition
Every goal has human-readable copy plus a declarative backend-executable rule/criterion and target. The LLM may propose a structured criterion, but backend validation/execution decides progress/completion. No free-form model judgment can directly award progress.

## Personalization
Use available employee history. New users may use current context/universal baseline templates but the model may not invent nonexistent experience.

## Matching
Each newly effective task version is evaluated against all active goals. One task may advance several goals. Persist contribution/match history with source task/version. On task edit/delete, deactivate/reverse stale matches and apply current effective matches idempotently.

Progress is capped at target for reward purposes. Reaching target marks completed immediately; overachievement gives no additional reward.

## Vacation / mid-month login
No target proration, period extension or failure penalty. First login mid-month runs normal setup immediately.

## Close
On first working day of the next month:
1. lock/finalize previous cycle deterministically;
2. compute completed goal count;
3. post Annual Score reward: 15 each + 15 all-three, max 60;
4. post Evolution XP reward: 10 each + 10 all-three, max 40;
5. create Monthly Recap/event;
6. establish next-cycle setup gate.

Month close is idempotent. No duplicate rewards on retry.
