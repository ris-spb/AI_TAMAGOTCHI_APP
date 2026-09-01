# INTEGRATION FAILURE POLICY

The machine-readable matrix is `INTEGRATION_FAILURE_MATRIX.csv`.

## Global rule

A provider outage is not a reason to corrupt or invent domain state.

- Personnel: no guessed identity.
- LLM: accepted raw task remains durable.
- STT: text path remains available; audio remains ephemeral.
- Weather: omit context.
- Object storage: isolate failure to export.
- External notifications: disabled in MVP.

Retry/fallback values are configured later and must remain bounded/idempotent.
