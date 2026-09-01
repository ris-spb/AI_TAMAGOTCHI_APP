# TEST EXECUTION PROFILES

- `unit`: no network.
- `integration`: Testcontainers DB/Redis + mock providers.
- `e2e`: isolated test backend/database + Playwright.
- `security`: malicious fixtures + test-only low limits.
- `visual`: fixed browser/viewports/resources + current Golden references.
- `provider-sandbox`: explicit opt-in and authorized non-production credentials.
- `performance`: staging/preprod-like; load profile recorded before execution.
- `recovery`: isolated restore target, no user traffic.

Ordinary CI must not require production credentials, real employee data, internet or missing final GLBs.
