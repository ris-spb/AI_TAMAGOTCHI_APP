# STREAK RULES

## Day classification
- Active working day: corporate working day, not vacation, ≥1 effective valid task.
- Inactive working day: corporate working day, not vacation, 0 effective valid tasks.
- Freeze day: weekend/corporate non-working day or vacation.

## Transition
- active: `current_streak += 1`, at most once per business date;
- inactive: `current_streak = 0`;
- freeze: no change;
- `best_streak = max(best_streak, current_streak)`.

No Streak Shield exists.

## Milestones
Lifetime, non-repeatable:
5→+5 XP; 10→+10; 20→+20; 40→+40; 80→+80; 160→+150.
Award after the day becomes an authoritative active day. An edit/delete replay that later changes the historical streak does not claw back already-earned Evolution XP because XP is monotonic. It may change current/best streak materialization only according to deterministic replay and preserved history.

## Idempotency
One `(employee, milestone)` lifetime award. Re-running daily close or replay must not duplicate XP/cosmetic effects.
