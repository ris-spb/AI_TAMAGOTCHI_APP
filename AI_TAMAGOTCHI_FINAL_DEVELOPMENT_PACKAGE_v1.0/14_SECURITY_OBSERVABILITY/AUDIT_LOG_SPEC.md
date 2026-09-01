# AUDIT LOG SPEC

Business audit is durable and distinct from operational logging. Required fields: `audit_id`, actor type/employee id when applicable, action, entity type/id, old/new approved values, reason, correlation id, timestamp and bounded security metadata.

Critical admin/task/config mutations and required audit record commit atomically. Raw session tokens, secrets, provider credentials, source audio and operational prompt bodies are forbidden in audit payloads. Raw task text belongs in protected task storage, not generic audit payload.

`AUDIT_EVENT_CATALOG.csv` defines **23** baseline events. Product-history retention remains indefinite under current baseline; operational telemetry retention is a separate production policy.
