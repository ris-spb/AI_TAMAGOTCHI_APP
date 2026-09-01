# LOGGING SPEC

Structured Pino-compatible JSON. Required bounded fields: timestamp, level, service/module, environment, request/correlation/trace ids, operation/route template, result/error code, latency, dependency class. User identity should be internal UUID/pseudonymous reference only when needed.

Never log request/response bodies by default for task/AI/STT/Personnel endpoints. Apply `LOG_REDACTION_MATRIX.csv` before serialization. Exceptions require explicit security review and must not contain secrets.

Levels: DEBUG local diagnostics without sensitive bodies; INFO normal lifecycle; WARN recoverable dependency/validation/rate conditions; ERROR failed operation; FATAL startup/integrity failures. Stack traces are server-only and redacted.
