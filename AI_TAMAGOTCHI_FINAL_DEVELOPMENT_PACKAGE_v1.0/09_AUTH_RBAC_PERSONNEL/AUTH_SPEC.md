# AUTHENTICATION SPECIFICATION

**Contract:** `auth-v1.0-current-remediation`  
**MVP auth:** `personnel_number + phone → PersonnelProvider verification → opaque server-backed bearer session`

## Identity and verification

No self-registration, password login/reset, SMS OTP, email magic-link or client-only identity verification exists in MVP. SSO/Entra/2FA is future/unscheduled and remains isolated from domain authorization.

PersonnelProvider is authority only for personnel number, full name, phone and organizational identity. It never assigns application role, account status, peer privacy or profile-hidden state.

## Login flow

1. Receive personnel number + phone over TLS.
2. Apply syntax validation and Stage‑14 auth-abuse policy class.
3. `PersonnelProvider.verifyIdentityPair` returns `matched | no_match | unavailable | configuration_error`.
4. `no_match` returns non-enumerating `AUTH_VERIFICATION_FAILED`; do not reveal which field exists/mismatched.
5. Dependency outage remains dependency failure; never reinterpret as identity mismatch.
6. On match, reconcile the provider snapshot into local personnel projection/history.
7. Load app-managed role/status and require active account.
8. Create server-side session and return one opaque bearer token.
9. Return current profile/onboarding/product gates from final API contract.

## Manual Admin-created employee

Admin creation does not create a hidden login bypass. A manually created employee authenticates only when the configured PersonnelProvider verifies the identity pair. Any emergency bypass would require a new explicit product/security decision.

## Authorization

Authentication never implies object access. Every protected request re-evaluates active session, current application role/status and object scope. Backend enforcement is authoritative; UI hiding is presentation only.

## Session/role changes

Blocking/terminating an account or security-sensitive role change revokes existing sessions. Stage‑14 hardening forbids exposing raw session tokens to logs/traces and does not approve persistent browser localStorage as the default.

## Error semantics

Stable failures: authentication mismatch, blocked/local account, invalid/expired session, dependency unavailable, forbidden object scope. No response may disclose another employee's identity data.
