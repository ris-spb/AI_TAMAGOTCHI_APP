# DATABASE SPEC — AI‑Тамагочи / Любознайка

**Stage:** 5 — Database & Data Contract Freeze  
**Current canonical remediation:** Stage 19 / 2026-09-01T05:19:00.421982+00:00  
**Database:** PostgreSQL  
**Schema:** `app`

## 1. Contract status

This is the current implementation data contract for MVP. It restores the missing Stage‑5 physical package from the current 294‑requirement corpus, final OpenAPI, Stage‑7 game rules and later owner decisions. Historical Stage‑5 byte hashes remain forensic evidence only; they are superseded by this current canonical remediation because later decisions (including `DEC-H-002`) must not be lost.

`schema.sql` and `INITIAL_MIGRATION.sql` are the executable baseline. `erd.mmd` is documentation only.

## 2. Storage/time invariants

- PostgreSQL is durable business source of truth; Redis/BullMQ is non-authoritative transport/cache.
- Application-generated UUIDs; no database UUID extension dependency.
- Instants: `TIMESTAMPTZ`; business dates: explicit `DATE` in `Europe/Moscow`.
- Browser time is never authoritative for Score, HP, streak, goals, ranking or close jobs.
- Historical task versions, score/XP, goal contribution, directorate attribution and audit are not destructively rewritten.
- JSONB is restricted to intentionally open/versioned envelopes; core domain fields remain typed.

## 3. Personnel and organization

`employees` stores application projection: personnel number, full name, phone, current directorate, app role/status, privacy/profile-hidden state. `personnel_provider_links` isolates the unknown real provider key. `employee_directorate_history` and `directorate_director_assignments` preserve temporal organization attribution.

Personnel never owns app role/status/privacy; these remain application authorization state.

## 4. Authentication support

`auth_sessions` stores only hashed opaque-session tokens and lifecycle metadata. Stage‑9/14 contracts define transport and hardening. No password/SSO data model is invented for MVP.

## 5. Corporate calendar

`corporate_calendar` is authoritative for workday overrides. Product business dates are server-derived in `Europe/Moscow`.

## 6. Taxonomy and AI tools

Versioned taxonomy: `taxonomy_versions`, `categories`, `subcategories`. Tool directory: `ai_tools`, aliases and time/version-scoped capabilities. Unknown tools remain representable in task mappings without inventing directory rows.

## 7. Task/version model

`tasks` is the stable logical container. `task_versions` is immutable version history; accepted raw input can exist before AI output. An assessed version requires normalized text, C1–C5, deterministic task score, plausibility, taxonomy and committed processing metadata.

DB constrains the frozen mapping: C1/C2/C3/C4/C5 → 1/5/15/40/100. Product delete is soft delete. `directorate_id_at_task_time` never changes after employee transfer.

`task_links` stores URL strings only; no fetched content exists. `task_tools` permits recognized or explicit unrecognized tool names.

## 8. Voice/STT

`stt_runs` stores transcript/provider/status metadata. There is intentionally no durable source-audio object key; source audio must be removed after transcription/preview flow.

## 9. AI processing

`ai_processing_runs`, `task_clarifications` and `scoring_evidence` record typed, versioned processing evidence. Clarifications are DB-bounded to 1..3. LLM evidence/classification never performs authoritative Score/HP/XP/goals/ranking arithmetic.

## 10. Score and Evolution XP

`scores_ledger` is authoritative, idempotent and preserves historical directorate/date/rule version. Annual/Lifetime task effects may be reversed. `evolution_xp_delta >= 0` enforces irreversible Evolution XP. Stage‑7 current rule is logical-task high-watermark incremental XP, preventing edit/reprocess farming.

`xp_ledger` is a view over non-zero XP ledger entries.

## 11. HP/streak/pet

`pet_state` stores current HP/state/streak/evolution. **New-user initial HP is 100 / `happy` from owner decision `DEC-H-002`; it is initialized by deterministic domain code using `game_rules_v1.0-baseline.stage7`, not by a hidden DB default.** HP-state ranges are DB constrained. `daily_activity`, `pet_events` and `streak_milestone_awards` preserve recalculable and award history.

## 12. Monthly Goals

One monthly cycle has five options, exactly two employee choices and one server-assigned third goal as a domain transaction invariant. Tables preserve options, goals and historical task matches; current progress is capped at target. Rewards are posted through the Score ledger under Stage‑7 rules.

`goal_ledger` preserves both historical and effective task contribution.

## 13. Achievements/cosmetics

Schema supports earned achievements/cosmetics without inventing the final achievement catalog or missing production art.

## 14. Rankings

Employee/directorate snapshots are rebuildable read projections, never Score truth. Historical directorate points come from ledger event attribution; current denominator comes from current authorized personnel.

## 15. Notifications/ambient

In-app notifications only. Ambient reactions enforce at most two persisted reactions per employee/business date. Weather failure is non-critical.

## 16. Exports

`export_requests` models async CSV/XLSX jobs with role-derived scope and object-storage reference. Artifact TTL remains configuration-dependent; no unsupported retention duration is invented.

## 17. Audit

`audit_log` is independent from business ledgers. Critical mutation + audit must be committed atomically by the Stage‑4 domain transaction. Operational logs are separate from audit storage.

## 18. Delivery support

`provider_call_attempts`, `outbox_events`, `processed_messages`, `api_idempotency_records`, and `scheduled_job_runs` support provider boundaries, at-least-once async delivery and idempotency without becoming Product scoring truth.

## 19. Retention

Current Product history is indefinite unless later policy explicitly changes it. Normal application code does not hard-delete historical task versions, score/XP, goal contribution or required audit history.

## 20. External/non-blocking parameters

Still intentionally external/configurable: real Personnel keys/protocol, provider credentials/endpoints, production session TTL, backup RPO/RTO/cadence, operational retention windows, capacity/partition thresholds.

## 21. Implementation handoff

API/domain code must preserve task/version separation, server-side authorization, idempotency, immutable historical attribution, current Stage‑7 game config and prohibition on manual Complexity/Score override.
