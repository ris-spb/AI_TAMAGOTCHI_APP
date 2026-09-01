# CONTRACT CONSISTENCY

## API ↔ frontend
- OpenAPI operations: **64 / unique 64**
- public operations: **1**
- protected operations: **63**
- `additionalProperties: true` in core operation schemas: **0**
- Screen→API relation rows: **81**
- referenced operationIds: **64**
- unknown operationIds: **0**
- final API operations not represented by screen/action matrix: **0**

Result: **PASS**.

## Game ↔ AI classification
- AI Complexity enum: `['C1', 'C2', 'C3', 'C4', 'C5']`
- Score mapping: `{'C1': 1, 'C2': 5, 'C3': 15, 'C4': 40, 'C5': 100}`
- initial HP: `100`
- game config version: `game_rules_v1.0-baseline.stage7`

Result: **PASS** against the current Stage-7 baseline.

## Environment/config ↔ architecture
- config catalog keys: **70**
- frontend-exposable secret keys: **0**
- provider-neutral critical integration boundaries preserved.

Result: **PASS**.

## Build prompt ↔ package
- Build Stages: **29 (0–28)**
- P0 stop rule: present
- migration validation: present
- Build Stage 3 requires canonical DB; Stage 5 requires canonical Auth/RBAC; Stage 23 requires canonical Security/Observability.

Result: **BLOCKED physically**, because those three canonical folders are currently missing.

## Build Stage 26/27 wording
The fixed TZ sequence names Stage26 `production build` before Stage27 `final E2E audit`. Current build prompt safely treats Stage26 as immutable production-mode **release candidate** only; production-ready/promotion is forbidden before Stage27 PASS. This resolves the operational contradiction without reordering the mandated 0–28 sequence.
