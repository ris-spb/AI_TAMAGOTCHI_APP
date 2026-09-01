# THREAT MODEL

Trust boundaries: Browser/PWA ↔ API; API/worker ↔ PostgreSQL/Redis; application ↔ Personnel/LLM/STT/Weather/Object Storage; management-role object scopes; CI/deployment/secrets plane.

Primary protected assets: personnel number/phone, raw task/clarification/link data, session tokens, role/status/privacy, deterministic Score/XP/HP/goals/ranking state, audit/ledger history, provider credentials, generated exports.

`THREAT_REGISTER.csv` contains **28** concrete threats and required controls. Assumptions are minimized: provider/vendor/network/KMS/SIEM details are external configuration, and current URL no-fetch + source-audio deletion are explicit Product invariants.
