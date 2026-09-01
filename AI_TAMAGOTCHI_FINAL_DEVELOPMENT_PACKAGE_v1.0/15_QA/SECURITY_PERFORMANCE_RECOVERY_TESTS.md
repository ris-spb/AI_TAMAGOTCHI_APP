# SECURITY / PERFORMANCE / RECOVERY TESTS

Security:
- TLS/config;
- session/revocation;
- RBAC/IDOR;
- rate-limit classes;
- secret scan;
- log/trace redaction;
- audit atomicity;
- export reauthorization/formula injection;
- PWA sensitive-cache negative;
- AI prompt injection.

All 28 Stage-14 threats are mapped in `SECURITY_TEST_MATRIX.csv`.

Performance Product target:
Home, leaderboard and dashboard basic data p95 < 2s at normal load.

Every performance result records environment, dataset, concurrency/profile, duration, p50/p95/p99, errors and saturation indicators.

No "normal load" number is invented in this Stage.

Resilience injects Personnel/LLM/STT/Weather/Object Storage/queue/DB failures and asserts no fake success, no duplicated business effects and durable accepted task input.

Before industrial production, execute encrypted backup + isolated restore, validate invariants, revoke all restored sessions and capture evidence.

RPO/RTO remain external production policy.
