# REAL WEATHER PROVIDER CONTRACT — OPEN TEMPLATE

**Status:** `OPTIONAL_EXTERNAL_DEPENDENCY`  
**Real provider:** **OPEN**

## Required contract items if enabled

| Item | Status |
|---|---|
| provider/vendor name | OPEN |
| endpoint/base URL | OPEN |
| authentication method | OPEN |
| credential provisioning | OPEN |
| Saint Petersburg location identifier | OPEN |
| temperature field/unit | OPEN |
| precipitation/condition mapping | OPEN |
| observation timestamp semantics | OPEN |
| rate limits | OPEN |
| timeout/SLA | OPEN |
| error catalogue | OPEN |
| data freshness guidance | OPEN |
| sandbox/test access | OPEN |

## Acceptance

A real provider adapter is accepted only when it:
- maps to `WeatherProvider`;
- returns Celsius or explicitly converts a documented source unit;
- validates timestamps/condition fields;
- fails to `unavailable` safely;
- never blocks Home/game rules;
- passes shared provider contract tests.

No concrete endpoint/key is present in this file.
