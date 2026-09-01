# TECHNICAL SECURITY BASELINE

**Stage:** 14 — Security / Observability  
**Current canonical remediation:** Stage 19

## Security objectives

Confidentiality of personnel/raw task data, integrity of deterministic business state, strong server-side authorization, provider isolation, recoverability, and telemetry that does not leak sensitive content.

## Transport/session

- TLS required for every network connection; TLS 1.2+ is the provider-neutral safe baseline unless organizational policy is stricter.
- Final API remains `BearerSession` opaque token; server stores hash only.
- Token generation safe default: at least **32 cryptographically random bytes** before encoding.
- Raw tokens never appear in logs/traces/audit/analytics.
- Account block/termination and security-sensitive role change revoke active sessions.
- Persistent JS-readable token storage is not an approved default; implementation must minimize browser persistence.
- If future auth moves to cookies, CSRF protection and API-contract change are mandatory.

## Authorization/data protection

- Default deny on every protected endpoint/object; IDOR/BOLA checks are server-side.
- Peer privacy never grants raw task input, clarifications or links.
- Technical scoring trace is Admin-only; manual Score/Complexity override is denied all roles.
- Database and backups require encryption at rest; provider/KMS mechanism is deployment-specific.
- Phone/raw task fields are sensitive and must not be copied into operational telemetry.

## Input/output/web controls

- DTO/schema validation for all client/provider data; unknown provider fields do not become domain state automatically.
- Parameterized DB access/ORM; no SQL construction from raw user input.
- Output encoding and CSP protect against XSS; rendered user text is not trusted HTML.
- Current Product stores URLs as strings only. No crawler/fetcher is allowed, materially reducing SSRF surface; this invariant is enforced by feature flag/policy.
- Export generation must protect CSV formula injection and re-authorize download.
- CORS uses explicit allowed origins per environment, never wildcard with credentials.
- Recommended response headers: CSP, `X-Content-Type-Options: nosniff`, Referrer-Policy, frame protection via CSP `frame-ancestors`, HSTS in production HTTPS.

## AI/STT/provider boundary

- LLM/STT input is untrusted content, not instructions to backend tools.
- LLM output is schema-validated evidence/classification only; numerical Score/HP/XP/goals/ranking remain deterministic backend code.
- Provider response content cannot change authorization/config/secrets.
- Source audio is transient and deleted after recognition/preview; not logged or persisted as Product history.
- No secret, credential or internal system prompt is included in user/provider-visible error output.

## Rate/abuse policy classes

Five configurable classes exist without fabricated production thresholds:
`RL-AUTH-VERIFY`, `RL-AI-TASK`, `RL-STT`, `RL-EXPORT`, `RL-GENERAL-WRITE`.

Keys should combine authenticated subject/IP/device or anonymous IP as appropriate; rejection is observable and must not disclose identity existence. Exact counts/windows are production configuration/InfoSec values.

## Secrets

Stage‑13 policy is mandatory: no real secrets in repository, `.env.example`, runtime public JSON, `VITE_*`, logs, traces, screenshots or fixtures. Staging/production use approved runtime secret injection. Production must fail startup when critical real-provider secret references are absent or mock critical providers are selected.

## Database/async integrity

PostgreSQL is authoritative. Critical mutation and audit/ledger/outbox records share the relevant transaction. Consumers use durable processed-message/idempotency state. Redis/queue loss cannot rewrite committed Product truth.

## Supply chain/build

CI must run dependency/vulnerability and secret scans, typed build/tests, OpenAPI/JSON/YAML validation, DB migration test, frontend bundle secret scan and artifact checksum verification. No fake production binary is permitted.

## External governance

`PRD-SEC-006` remains an organizational legal/InfoSec pre-industrial-production dependency. This package does not claim that approval.
