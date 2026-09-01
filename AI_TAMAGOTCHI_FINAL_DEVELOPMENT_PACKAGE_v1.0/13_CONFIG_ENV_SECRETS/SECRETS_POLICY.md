# SECRETS POLICY

**Version:** `secrets-v1.0`  
**Vendor:** not selected.

Real secrets never belong in repository, `.env.example`, committed runtime JSON, frontend/Vite bundle, logs, traces, audit details, screenshots or committed test fixtures.

Committed config stores empty slots or secret references.

No secret may use `VITE_*`.

Local secrets may use uncommitted `.env`, `.env.local` or `secrets.local.env`; Stage 13 creates none of them.

CI secrets are ephemeral/scoped/masked. Core deterministic CI uses mocks.

Staging/production uses an approved provider-neutral secret-management/injection mechanism.

Credential rotation must not require source-code change.

Stage 14/15/16 add secret scanning, client-bundle scanning, log-redaction tests and missing-secret startup tests.

**Real production secrets created by Stage 13: 0.**
