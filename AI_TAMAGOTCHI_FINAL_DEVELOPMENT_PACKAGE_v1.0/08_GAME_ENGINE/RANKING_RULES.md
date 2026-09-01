# RANKING RULES

## Individual leaderboard
Metric: current-calendar-year Annual Score. Ordering must be deterministic; API/UI tie-break presentation is a later query/presentation concern and must not alter Score.

January 1 opens/resets the current annual ranking period. It does not reset HP, Evolution XP, pet evolution, history, achievements or cosmetics.

Terminated/inactive employees are excluded from current individual ranking according to Product status semantics; historical analytics remain.

## Directorate leaderboard
For each directorate and current year:
- `Total Score` = current-year task/goal Annual Score points attributed to that directorate at event/task time;
- denominator = current number of authorized employees in the directorate;
- `Average Score = Total Score / denominator`.

Transfers do not move historical points. New points use the new directorate. This intentionally means Average Score can change when current headcount changes.

## Zero denominator safe rule
If denominator = 0, `Average Score = null` and the directorate is `not_ranked`. Total historical/current-year attributed Score can still be shown where authorized. Never divide by zero and never synthesize a denominator of 1.

## Prior-year status
Past-year top status/badges/cosmetics may persist visually but provide no gameplay advantage.
