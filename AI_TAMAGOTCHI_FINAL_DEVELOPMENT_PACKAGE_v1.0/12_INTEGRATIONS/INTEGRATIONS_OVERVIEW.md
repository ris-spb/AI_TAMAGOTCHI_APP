# INTEGRATIONS OVERVIEW

**Stage:** 12 — Integrations  
**Status:** `PROVIDER_BOUNDARIES_FROZEN_WITH_EXTERNAL_VALUES_OPEN`  
**Contract version:** `integrations-v1.0`

## 1. Purpose

All external systems are isolated behind provider interfaces. Domain/application modules never call vendor SDKs or vendor-specific HTTP endpoints directly.

Current provider families:

| Provider | Product status | Contract source |
|---|---|---|
| Personnel | MVP required external integration | Stage 9 |
| LLM | MVP required external integration | Stage 8 |
| STT | MVP required external integration | Stage 8 |
| Weather | optional external integration / non-critical ambient context | Stage 12 |
| Object Storage | infrastructure/provider abstraction required for generated exports where externalized storage is used | Stage 12 |
| External Notification | **not MVP**; future provider boundary only | Stage 12 |

## 2. Source precedence

Existing Stage-8/9 provider contracts remain authoritative for Personnel/LLM/STT.

Stage 12 does not redefine:
- Personnel identity semantics;
- LLM processing schema/prompts;
- STT audio lifecycle.

It only:
1. registers those providers in the unified integration model;
2. freezes shared provider failure/observability rules;
3. creates the missing provider-neutral contracts for weather/object storage/future notifications.

## 3. Provider isolation invariants

1. No real vendor endpoint, tenant, credential, employee key, bucket, API key or secret is invented.
2. No domain module imports a vendor SDK directly.
3. Every provider has an interface and test/mocking strategy.
4. Provider failures are typed and translated at the adapter boundary.
5. Provider retries are bounded and configured outside business rules.
6. Provider call metadata is written through the existing `provider_call_attempts` infrastructure where applicable.
7. Raw secrets are never written to logs/DB/provider metadata.
8. Business truth stays in PostgreSQL; external providers do not become Score/HP/XP/Goal authority.
9. Network failure never creates fake success.

## 4. Criticality classes

### Workflow-critical
A provider failure may block only the operation that needs that provider:
- Personnel verification → login/Personnel workflow;
- LLM → AI processing;
- STT → voice transcription flow.

Accepted durable state must remain safe and recoverable.

### Feature-degrading
- Weather failure → omit weather ambient context; no Home/game failure.
- Object storage failure → export artifact generation/download may fail/retry; interactive product remains available.

### Future-disabled
- External notification provider → no delivery in MVP because Product requires in-app notifications only.

## 5. Non-provider product boundaries

The following are **not** external providers in current MVP:
- taxonomy;
- AI Tools Directory;
- corporate calendar;
- in-app notifications;
- Score/HP/XP/goals/ranking;
- task URL contents.

They are application/backend state and must not be silently delegated to third-party services.

## 6. Configuration handoff

Stage 12 defines **configuration key names/contracts only** in `INTEGRATION_CONFIG_KEYS.md`.

Stage 13 will create:
- `.env.example`;
- environment matrix;
- feature flags;
- runtime config example;
- secrets policy.

Stage 12 contains no real secret values.
