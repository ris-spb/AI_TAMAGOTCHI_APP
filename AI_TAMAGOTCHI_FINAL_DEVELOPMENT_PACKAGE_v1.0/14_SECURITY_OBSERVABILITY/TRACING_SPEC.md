# TRACING SPEC

Use OpenTelemetry/W3C Trace Context across HTTP and async jobs. Propagate `trace_id`/`correlation_id` through API → transaction/outbox → worker → provider call. Create spans for route, domain transaction, DB operation class, queue job and provider operation.

Span attributes must be bounded and non-sensitive: operation, route template, module, provider kind, result/error class, retry number. Do not put raw task text, phone, personnel number, transcript, prompt/response body, URL, bearer token, secret or export contents in span names/attributes/events.

Provider request IDs may be stored only when they are non-secret and useful for support. Sampling/export endpoint/retention/vendor are production observability configuration, not Product semantics.
