# SESSION CONTRACT

**Transport:** OpenAPI `BearerSession` / HTTP Bearer, opaque token.  
**Storage:** server-backed `auth_sessions`; only token hash is durable.

- token is cryptographically random; Stage‑14 safe default is at least 32 random bytes before encoding;
- token is shown only at issuance and sent in `Authorization: Bearer <token>`;
- raw token is never stored in DB/log/audit/trace/analytics;
- session validity is checked server-side on every protected request;
- account status and current app role/scope are authoritative at request time;
- logout/revocation invalidates server session;
- blocked/terminated account and security-sensitive role changes revoke sessions;
- absolute/idle TTL are runtime configuration, not Product constants;
- Stage‑13 local value `28800` is a SAFE_ENGINEERING_DEFAULT example, not production SLA;
- browser persistent storage is not an approved requirement; client implementation must follow Stage‑14 security baseline and avoid long-lived JS-readable token persistence by default;
- if transport is ever changed to cookies, CSRF protection becomes mandatory and OpenAPI/security contract must be revised explicitly.

Redis may cache validation state but cannot be authoritative for session lifecycle.
