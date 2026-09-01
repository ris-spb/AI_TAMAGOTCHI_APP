# REAL OBJECT STORAGE CONTRACT — OPEN TEMPLATE

**Status:** `EXTERNAL_DEPENDENCY / INFRASTRUCTURE_CONTRACT_REQUIRED`

Architecture baseline is an S3-compatible/provider-neutral abstraction, but no production storage vendor is selected.

## Required real values

| Contract item | Current value |
|---|---|
| provider/system | OPEN |
| protocol/API compatibility | OPEN |
| endpoint/region | OPEN |
| bucket/container | OPEN |
| authentication method | OPEN |
| credentials/role provisioning | OPEN |
| network path/private endpoint | OPEN |
| TLS requirements | OPEN |
| object-size limits | OPEN |
| multipart/stream semantics | OPEN |
| checksum support | OPEN |
| lifecycle/retention rules | OPEN |
| encryption-at-rest mechanism | OPEN |
| rate limits/SLA | OPEN |
| sandbox/non-prod storage | OPEN |
| support/escalation owner | OPEN |

## Acceptance

Real adapter must pass:
- upload/download/delete contract tests;
- SHA-256 integrity test;
- large-stream test without loading whole export into memory;
- missing-object test;
- dependency outage test;
- authorization separation test;
- no public/long-lived URL exposure under current API contract;
- secret-redaction test.

No endpoint, bucket, access key or credential is invented in Stage 12.
