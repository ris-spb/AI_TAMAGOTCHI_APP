# RELEASE CHECKLIST

Machine-readable checklist: `RELEASE_CHECKLIST.csv`.

## Release Candidate

A release candidate is not "ready" until:
- static/build gates pass;
- critical test evidence exists;
- S0/S1 defects are zero;
- migration bundle and immutable application artifacts exist;
- artifact scans pass;
- visual/PWA/3D fallback/accessibility requirements pass;
- performance target is assessed using a documented accepted load profile.

## Production

Production promotion additionally requires real:
- Personnel/LLM/STT binding;
- selected-model AI regression;
- TLS/secrets/encryption;
- observability/alert routing;
- encrypted backup and restore drill;
- external InfoSec/legal approval;
- migration/rollback review;
- post-deploy smoke.

## Evidence rule

`REQUIRED` does not mean Stage 16 claims the evidence already exists.

It means the delivery system must block the corresponding promotion until the evidence exists.

No future external evidence is fabricated by this specification.
