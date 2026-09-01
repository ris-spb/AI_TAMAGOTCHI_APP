# SECURITY GOVERNANCE GATE

Requirement `PRD-SEC-006` is an `EXTERNAL_DEPENDENCY` before industrial production: organizational legal/InfoSec review of personal/work-data processing, especially data sent to external LLM/STT providers.

The Development Package provides technical controls but **does not claim organizational approval**.

Before industrial production, governance must confirm at minimum: approved providers/data-processing terms, allowed data classes, retention/residency, secret/KMS/network controls, telemetry policy, incident ownership, backup/RPO/RTO policy and actual security/recovery evidence.

This external gate does not block local/test/staging coding with mocks/provider-neutral adapters, and it does not authorize inventing vendor values.
