# INFRASTRUCTURE DECISION — ISOLATED OPEN ITEM

**Status:** `EXTERNAL_DEPENDENCY / NONBLOCKING_FOR_IMPLEMENTATION`

The package intentionally does not select:

- cloud/on-prem provider;
- container orchestrator;
- container registry;
- DNS/domain;
- ingress/load balancer;
- certificate issuer;
- PostgreSQL hosting product;
- Redis hosting product;
- Object Storage vendor;
- secret manager/KMS;
- CI provider;
- CD provider;
- SIEM/APM/metrics backend;
- backup product.

## Minimum acceptance criteria for any selected platform

It must satisfy `DEPLOYMENT_SPEC.md`:
- immutable artifact promotion;
- TLS;
- secret injection;
- health checks;
- migration job;
- rollback;
- PostgreSQL/Redis connectivity;
- encrypted backup/restore;
- observability;
- provider egress;
- environment separation.

## Decision timing

This selection is not required before Stage 17 or code implementation.

It is required before real staging/production deployment and must be recorded as an infrastructure ADR/configuration set without changing Product/business semantics.

A later corporate mandate is an infrastructure decision/change request, not evidence that a vendor was already approved.
