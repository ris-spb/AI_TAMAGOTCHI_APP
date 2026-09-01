# GAME ENGINE TESTS

Mandatory exact assertions:

Score: C1/C2/C3/C4/C5 = 1/5/15/40/100.

Initial HP = 100, state happy.

HP states:
- 80–100 happy
- 60–79 normal
- 40–59 bored
- 20–39 tired
- 1–19 very_weak
- 0 coma

Daily HP:
- inactive workday −30;
- max daily C1..C5 +10/+15/+25/+35/+45;
- each other valid task +2;
- cap 100;
- vacation/non-working freeze.

Coma:
- first active recovery day remains 0;
- second active recovery day exits to 1/very_weak;
- normal task gain suppressed during recovery.

Streak:
- +1 max/day;
- inactive working day reset;
- non-working/vacation freeze;
- no shield;
- 5/10/20/40/80/160 → +5/+10/+20/+40/+80/+150 XP, one time.

Evolution XP:
- monotonic;
- task high-watermark;
- lower/same edit gives 0;
- higher edit gives only new high delta;
- delete no clawback.

Goals:
- five options, select exactly 2, server assigns third;
- one task may progress multiple goals;
- cap at target;
- no overachievement/failure/vacation-proration bonus;
- Score +15/goal +15 all3;
- XP +10/goal +10 all3.

Evolution thresholds: 0/250/750/2000/5000, no regression.

Ranking:
- current-year Annual Score;
- Jan 1 Annual Score reset only;
- transfers do not move historical points;
- zero authorized headcount => null/not ranked;
- terminated excluded from current ranking/denominator, history retained.

Historical edit/delete replay is idempotent and preserves append-only history; Evolution XP never decreases.
