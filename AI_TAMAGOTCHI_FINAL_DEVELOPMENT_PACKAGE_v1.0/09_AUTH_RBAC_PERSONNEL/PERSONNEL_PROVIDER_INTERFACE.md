# PERSONNEL PROVIDER INTERFACE

Provider-neutral boundary; no corporate endpoint/auth/credential is invented.

## Required operation

`verifyIdentityPair(input) -> result`

Input:
- `personnelNumber: string`
- `phone: string`
- `correlationId: UUID`

Result discriminant:
- `matched` + normalized provider snapshot;
- `no_match`;
- `unavailable`;
- `configuration_error`.

Matched snapshot may contain only values supplied by the provider contract: provider subject key if available, personnel number, full name, phone, directorate key/name and provider metadata approved for storage. Application role/status/privacy are explicitly excluded.

## Optional capabilities

Bulk/delta sync and direct lookup are capability-gated. If a real provider does not expose them, the adapter reports unsupported rather than fabricating a protocol. Authentication must still use the required live verification operation under current MVP.

## Reliability/security

Timeout/retry comes from Stage‑13 config. Provider outage is never converted to `no_match`. Requests/responses are schema-validated; credentials are secret references; sensitive values are redacted from operational telemetry.
