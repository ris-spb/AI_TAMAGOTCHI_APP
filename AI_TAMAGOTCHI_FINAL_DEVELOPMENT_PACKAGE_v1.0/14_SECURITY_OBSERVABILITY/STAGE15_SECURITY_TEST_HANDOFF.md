# STAGE 15 SECURITY TEST HANDOFF

Mandatory automated/manual test groups:
- auth non-enumeration, invalid/expired/revoked session, role/status revocation;
- IDOR/BOLA for task/version/profile/director/executive/admin/export objects;
- all-role denial of manual Complexity/Score override;
- rate-policy enforcement without asserting invented production thresholds;
- XSS/output encoding, CSP/security headers and CORS allow-list behavior;
- URL no-fetch/SSRF invariant;
- prompt injection/provider schema hardening and deterministic score boundary;
- source-audio deletion/non-persistence;
- secret scan + frontend-bundle secret scan + telemetry redaction;
- outbox/idempotency replay safety;
- encrypted-backup configuration check and isolated restore procedure;
- restored-session invalidation;
- error-rate/latency/queue-backlog telemetry and alert wiring;
- 3D failure fallback without loss of functional UI.

Production governance evidence and exact alert/rate/RPO/RTO values remain environment-owned and must not be faked by tests.
