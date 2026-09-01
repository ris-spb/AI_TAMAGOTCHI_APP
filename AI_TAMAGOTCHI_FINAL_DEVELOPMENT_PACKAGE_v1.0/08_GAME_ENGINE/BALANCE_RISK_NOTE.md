# BALANCE RISK NOTE

**Classification:** `RISK_TO_VALIDATE_IN_PILOT` — non-blocking for implementation; no baseline changed.

The Product explicitly requires simulation before production freeze. The lower-precedence Development Readiness Pack also flags HP and goal/Score interaction risks. Stage 7 recomputed simple deterministic checks from the unchanged baseline.

## HP weekly sensitivity (5 working days, one task on each active day)
| Pattern | Net HP/week before clamp |
|---|---:|
| 5 active C1 | +50 |
| 4 active C1 + 1 missed | +10 |
| 3 active C1 + 2 missed | −30 |
| 3 active C2 + 2 missed | −15 |
| 3 active C3 + 2 missed | +15 |
| 2 active C2 + 3 missed | −60 |

Risk: if typical employees use AI only 2–3 working days/week, −30 for every missed working day may feel punitive. No value is changed.

## Goal Score scale
Maximum monthly goal Annual Score bonus = 60. Equivalent fixed task Score amounts:
- 60 × C1;
- 12 × C2;
- 4 × C3;
- 1.5 × C4;
- 0.6 × C5.

Risk: goal reward can dominate task-derived Score for low-volume/basic users. This must be tested against intended product philosophy; no value is changed.

## Required pre-production simulation
- 50–100+ realistic AI use cases independently labeled C1–C5;
- confusion/disagreement analysis;
- C4/C5 distribution check;
- 3–6 month synthetic/user behavior simulation with calendar/vacation;
- annual leaderboard sensitivity;
- compare baseline and any proposed changes only through an explicit owner-approved balance decision.
