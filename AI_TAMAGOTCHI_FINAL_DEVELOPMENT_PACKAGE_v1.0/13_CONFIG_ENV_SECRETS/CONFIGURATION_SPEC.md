# CONFIGURATION SPECIFICATION

**Status:** `BASELINE_FROZEN_WITH_EXTERNAL_PRODUCTION_VALUES_OPEN`

Precedence: `safe defaults < deployment config < environment variables < secret-reference resolution`.

Production fail-fast rejects:
- mock Personnel/LLM/STT;
- missing required DB/Redis/provider config;
- external notifications enabled;
- any HARD_DISABLED_MVP flag true;
- secrets in frontend-public config;
- false final-production-3D availability;
- unversioned game-rule replacement.

Weather may remain disabled.

Operational numeric examples in Stage 13 are `SAFE_ENGINEERING_DEFAULT`, not Product/SLA/benchmark/InfoSec claims.

Intentionally OPEN: real endpoints, credentials, Personnel keys/normalization, production LLM/STT models, Object Storage provider/bucket/region, export TTL, final security timing/rate limits, hosting/network topology and final 3D tuning.
