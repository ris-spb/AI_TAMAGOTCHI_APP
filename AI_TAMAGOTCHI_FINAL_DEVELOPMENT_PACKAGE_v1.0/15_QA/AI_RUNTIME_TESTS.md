# AI RUNTIME TESTS

Validate every provider result against Stage-8 schema.

Required output includes extraction/plausibility/clarification/taxonomy/tools/evidence/Complexity C1–C5.

LLM must not authoritatively output/calculate:
- numerical Score;
- HP;
- XP;
- Streak;
- goal reward/progress;
- rank.

Clarification:
- one question at a time;
- max 3;
- no fourth state;
- after cap processing continues;
- uncertainty is not a hidden numeric penalty.

Adversarial prompt injection attempts must not bypass schema, RBAC, game rules, URL no-fetch rule or DB authority.

Benchmark contract:
- 100 cases;
- 20 each C1–C5.

Selected production model must pass Stage-8 regression gates before deployment. No production-model run is claimed at Stage 15.

Failure tests cover timeout, rate limit, invalid schema, stale result and durable accepted raw input.
