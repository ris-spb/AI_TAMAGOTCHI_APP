# PRODUCT REQUIREMENTS NORMALIZED

**Stage:** 1  
**Stable normalized requirements:** 258  
**Rule:** Stage 2 may assign scope/priority, but must not renumber these IDs.

## Status vocabulary
- `RESOLVED_BY_OWNER` — later explicit owner override controls.
- `RESOLVED_FROM_SOURCE` — directly supported by current Product/Design/handoff with no higher-tier conflict.
- `EXTERNAL_DEPENDENCY` — required concept exists, but the real external contract/asset is absent.
- `DEFERRED_NONBLOCKING` — later freeze/tuning/art item with a safe current baseline.

## Product purpose

- **PRD-PRINC-001** — Corporate system records and develops real employee AI use; Tamagotchi is an engagement layer rather than the core business object.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1
- **PRD-PRINC-002** — Employees can describe completed AI use cases in free text or voice; the system structures the data.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1.1
- **PRD-PRINC-003** — Engagement mechanics include HP, streak, evolution, Monthly Goals and ratings to encourage regular real AI practice.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1.1
- **PRD-PRINC-004** — The scoring concept must not reward sheer volume of trivial prompts; Complexity is the base scoring dimension.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1.1; §7
- **PRD-PRINC-005** — The system must maintain an analytical trail across tasks, tools, taxonomy, scoring, goals and activity.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1.1
- **PRD-PRINC-006** — Employee, Director, Executive and Admin have distinct information scopes and capabilities.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §1.1; §4

## AI integrity

- **PRD-PRINC-007** — AI must not invent facts absent from user input or clarification answers.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2.1
- **PRD-PRINC-008** — If uncertainty remains after at most three clarifications, the system trusts the employee statement and continues evaluation.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2.1; §8

## Scoring integrity

- **PRD-PRINC-009** — Complexity classification is uniform across employees and independent of role, personal experience, recipient status or project prestige.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2.1; §7
- **PRD-PRINC-010** — No role may manually override computed Complexity/Score; change requires task edit and system reprocessing.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2.1; §4; §17

## Audit integrity

- **PRD-PRINC-011** — Task versions, deletions and system events are retained rather than overwritten.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2.1; §24

## Release scope

- **PRD-SCOPE-001** — Mobile-first PWA is the primary product form.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-002** — Desktop web is an additional interface.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-003** — MVP data mutation is online-only.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-004** — MVP supports text AI-use-case input.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-005** — MVP supports voice input via speech-to-text.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-006** — MVP includes AI parsing, normalization, classification, plausibility and scoring.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-007** — MVP includes pet HP, coma/recovery, vacation, streak and Evolution XP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-008** — MVP includes evolution branches at product-logic level.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1; §11
- **PRD-SCOPE-009** — MVP includes Monthly AI Goals.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-010** — MVP includes employee and directorate ratings.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-011** — MVP includes Personal, Company, Director, Executive and Admin dashboards.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-012** — MVP includes task taxonomy and AI Tools Directory.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-013** — MVP includes in-app notifications.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1
- **PRD-SCOPE-014** — MVP includes XLSX/CSV exports by authorized role scope.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1; §22
- **PRD-SCOPE-015** — MVP includes detailed audit trail and indefinite historical retention.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.1; §24

## Out of scope

- **PRD-OUT-001** — Native iOS/Android applications are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2
- **PRD-OUT-002** — Offline mutation/work mode is outside MVP; a static/cached non-mutating shell may exist only as a presentation/runtime fallback.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2 · Decision: `OD-007`
- **PRD-OUT-003** — Push/email/Telegram/Teams notifications are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2
- **PRD-OUT-004** — Task file attachments are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2
- **PRD-OUT-005** — The application does not open or analyze task URLs automatically in MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2; §6.1
- **PRD-OUT-006** — Social likes/comments/follows/reactions are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2
- **PRD-OUT-007** — Internal currency and cosmetics shop are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2
- **PRD-OUT-008** — Sound is not an MVP dependency.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2 · Decision: `OD-008`
- **PRD-OUT-009** — Retrospective/backdated task dates are outside MVP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2; §9
- **PRD-OUT-010** — Taxonomy change does not automatically reclassify historical task versions.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3.2; §18
- **PRD-OUT-011** — Streak Shield is excluded.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_EXCLUDED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10

## Roles & authorization

- **PRD-RBAC-001** — Employee can create, edit and soft-delete own AI tasks and access public product sections.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4
- **PRD-RBAC-002** — Employee can view Personal Dashboard, ratings and company analytics and manage own privacy/vacation.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4
- **PRD-RBAC-003** — Director has read access to employees/tasks in own directorate and can export own directorate.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.1; §22
- **PRD-RBAC-004** — Director must not access technical scoring trace or change scoring.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.1
- **PRD-RBAC-005** — Executive/CEO can view whole-company analytics and drill down company → directorate → employee → task.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.2
- **PRD-RBAC-006** — Executive/CEO does not manage system settings.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.2
- **PRD-RBAC-007** — Admin has company-wide system-management scope for org structure, roles, calendar, taxonomy, tools, profiles, technical scoring trace, audit logs and export.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.3; §21
- **PRD-RBAC-008** — Admin cannot manually change task Complexity or Score.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §17.3
- **PRD-RBAC-009** — Peers never see another employee's raw input, clarification log or task links regardless of peer privacy level.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4.1; §14
- **PRD-RBAC-010** — Director may access raw input, clarifications, links and normalized task data only inside own directorate.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4.1; §17.1
- **PRD-RBAC-011** — Executive and Admin may access raw task data according to whole-company authorized scope.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4.1
- **PRD-RBAC-012** — Technical scoring trace is Admin-only.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4.1
- **PRD-RBAC-013** — Corporate export is unavailable to Employee, directorate-scoped for Director, company-scoped for Executive/Admin.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4.1; §22
- **PRD-RBAC-014** — Privacy/access rules must be enforced by backend authorization for each object request/export, not only by UI hiding.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · Appendix C

## Authentication & onboarding

- **PRD-AUTH-001** — There is no employee self-registration flow.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1 · Source ID(s): `AUTH-001`
- **PRD-AUTH-002** — MVP login verifies personnel number + phone against the corporate personnel source, without SMS/password in Product v1.0.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1 · Source ID(s): `AUTH-002`
- **PRD-AUTH-003** — On successful personnel verification, employee name and directorate are populated from personnel data.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1
- **PRD-AUTH-004** — Application role/status is controlled by the application and assigned only by Admin.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1
- **PRD-AUTH-005** — First successful login requires onboarding in 4–5 screens/steps.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1
- **PRD-AUTH-006** — When Monthly Goal setup is required, it gates entry to the main interface.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1; §12
- **PRD-AUTH-007** — Personnel-number + phone is explicitly recognized by Product v1.0 as weaker than production-grade SSO/2FA.  
  Status: `EXTERNAL_DEPENDENCY` · Kind: `EXTERNAL_DEPENDENCY` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §5.1 Security note · Note: Production auth hardening is not specified by a current external corporate contract.

## AI task lifecycle

- **PRD-TASK-001** — The user-facing AI task is an already completed AI-assisted work use case, not a future to-do item.  
  Status: `RESOLVED_BY_OWNER` · Kind: `MVP_REQUIRED` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · §4 Previously approved product/UI decisions · Decision: `OD-001`
- **PRD-TASK-002** — Employee may register an unlimited number of AI tasks.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.1 · Source ID(s): `TASK-001`
- **PRD-TASK-003** — Task input supports text.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.1 · Source ID(s): `TASK-001`
- **PRD-TASK-004** — Voice flow is record → STT → transcript preview → user correction → submit.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.1 · Source ID(s): `TASK-002`
- **PRD-TASK-005** — Source audio is not retained after recognition.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.1 · Source ID(s): `TASK-002`
- **PRD-TASK-006** — A task may contain one or more URLs; URLs are stored but not opened/analyzed.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.1 · Source ID(s): `TASK-003`
- **PRD-TASK-007** — Ingestion persists raw input, channel, timestamp and user/context.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2
- **PRD-TASK-008** — Processing extracts asserted facts, AI tools, workflow evidence, result and evidence signals.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2
- **PRD-TASK-009** — Processing performs plausibility assessment before final scoring.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2
- **PRD-TASK-010** — Clarifications are asked only when needed and share a maximum of three per task version.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2; §8 · Source ID(s): `AI-001`
- **PRD-TASK-011** — System generates a concise normalized description that the employee does not directly edit.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §2; §6.2
- **PRD-TASK-012** — System assigns category/subcategory/tags and maps mentioned AI tools.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2
- **PRD-TASK-013** — System assigns Complexity C1–C5; numerical points come from fixed backend mapping.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2; §7
- **PRD-TASK-014** — Accepted task is matched to active Monthly Goals and triggers game/progress updates.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.2
- **PRD-TASK-015** — Post-task result shows points, C-level, normalized description, goal contribution, Evolution XP impact and mascot reaction.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.3 · Source ID(s): `TASK-004`
- **PRD-TASK-016** — Category/subcategory/tool detail is available through a details action instead of overloading the compact result card.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §6.3 · Source ID(s): `TASK-005`
- **PRD-TASK-017** — Task date equals application registration date and cannot be backdated.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9
- **PRD-TASK-018** — Editing a task creates/recalculates a new version; historical versions remain preserved.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §24; Appendix C
- **PRD-TASK-019** — Soft deletion excludes a task from current views/calculations while retaining audit/version history and ledger correction semantics.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15; §24; Appendix C

## AI processing & scoring

- **PRD-AI-001** — Plausibility state vocabulary includes valid, ambiguous, capability_conflict, internal_contradiction and insufficient_data.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.1
- **PRD-AI-002** — Clarification questions are one at a time, brief, non-repetitive and asked only when they can affect correctness/classification.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.2
- **PRD-AI-003** — The maximum of three questions is shared across plausibility, duplicate and Complexity clarification.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.2
- **PRD-AI-004** — Clarification priority is plausibility/task semantics and missing facts, then Complexity evidence; duplicate check consumes the same limit.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.2
- **PRD-AI-005** — After three questions, unresolved ambiguity does not penalize the employee; scoring proceeds.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.2
- **PRD-AI-006** — The system must not label an employee statement as a lie or accuse the employee.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.2
- **PRD-AI-007** — High similarity to a recent task may trigger a question whether it is a separate execution.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.3
- **PRD-AI-008** — If employee confirms a separate execution, both tasks score independently; similarity alone cannot deny points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §8.3
- **PRD-SCORE-001** — Complexity is the only base scoring dimension; business importance is not a separate scoring factor.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-002** — LLM/classifier selects only C1–C5; backend deterministic logic assigns numerical points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1; Appendix C
- **PRD-SCORE-003** — C1 Basic = 1 point.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-004** — C2 Standard = 5 points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-005** — C3 Advanced = 15 points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-006** — C4 Expert = 40 points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-007** — C5 System / AI Engineering = 100 points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.1
- **PRD-SCORE-008** — Evidence signals guide C-level classification but are not mechanically summed into score.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.2
- **PRD-SCORE-009** — Number of AI tools alone does not increase Complexity without a connected workflow.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.2; §7.4
- **PRD-SCORE-010** — Role, personal skill, recipient status, description verbosity and inferred prestige must not affect Complexity.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §7.4
- **PRD-SCORE-011** — Processing must record prompt/model/rubric version identifiers so rule changes do not silently change historical records.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · Appendix C

## Pet HP & health

- **PRD-HP-001** — HP range is 0–100.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-002** — HP 80–100 = Happy/energetic state.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-003** — HP 60–79 = Normal.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-004** — HP 40–59 = Bored.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-005** — HP 20–39 = Tired.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-006** — HP 1–19 = Very Weak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-007** — HP 0 = Coma.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.1
- **PRD-HP-008** — Business-day calculations use Saint Petersburg calendar/date with day close at 23:59.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.2
- **PRD-HP-009** — A working day with no registered tasks applies -30 HP after day close.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.2 · Note: Product v1.0 marks balance parameters for pilot calibration; preserve this exact baseline until an explicit later decision.
- **PRD-HP-010** — Daily base recovery uses the day's maximum Complexity: C1 +10, C2 +15, C3 +25, C4 +35, C5 +45.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.2 · Note: Product v1.0 marks balance parameters for pilot calibration; preserve this exact baseline until an explicit later decision.
- **PRD-HP-011** — Each additional valid task beyond the day's maximum-Complexity task adds +2 HP; HP stays capped at 100.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.2 · Note: Product v1.0 marks balance parameters for pilot calibration; preserve this exact baseline until an explicit later decision.
- **PRD-HP-012** — Weekends, corporate non-working days and active vacation do not change HP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.2
- **PRD-HP-013** — At HP=0 the pet enters Coma and never permanently dies.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.3
- **PRD-HP-014** — Coma exit requires at least two active working days: first starts recovery, second exits to Very Weak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.3
- **PRD-HP-015** — One C5 task cannot instantly exit Coma.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.3
- **PRD-HP-016** — Employee can manually toggle vacation without retroactive effect; vacation freezes HP/streak but does not recalculate Monthly Goals.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §9.4

## Streak & evolution

- **PRD-STR-001** — An active working day has at least one registered task and increases streak by at most 1.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10
- **PRD-STR-002** — A working day without tasks resets current streak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10
- **PRD-STR-003** — Weekends, corporate non-working days and vacation freeze streak without increasing it.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10
- **PRD-STR-004** — Store current streak and personal best streak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10
- **PRD-STR-005** — Streak XP rewards occur only on one-time lifetime milestones.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10.1
- **PRD-STR-006** — Working milestone baseline: days 5/10/20/40/80/160 → Evolution XP +5/+10/+20/+40/+80/+150.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §10.1
- **PRD-EVO-001** — Evolution XP is irreversible lifetime progress and never decreases.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.1
- **PRD-EVO-002** — HP decline, Coma and annual leaderboard reset do not reduce Evolution XP or evolution stage.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.1
- **PRD-EVO-003** — Evolution XP = Lifetime Task Score + Goal XP + Streak Milestone XP + Achievement XP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.2
- **PRD-EVO-004** — Task Score converts to Evolution XP 1:1.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.2
- **PRD-EVO-005** — Working evolution threshold baseline is E1=0, E2=250, E3=750, E4=2000, E5=5000 XP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.3
- **PRD-EVO-006** — Evolution stage names/thresholds are balance/content parameters requiring simulation before production freeze; current values remain baseline until explicitly changed.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §11.3
- **PRD-EVO-007** — Evolution branch mechanics remain part of product logic, while final branch-specific visual art is not production-frozen.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `MVP_REQUIRED` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · §11 · Decision: `OD-029` · Note: Do not invent final branch-specific art; base/canonical mascot remains implementation-safe.

## Monthly Goals

- **PRD-GOAL-001** — Monthly Goal setup is mandatory when the monthly setup gate is active and blocks main-interface entry until complete.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.1 · Source ID(s): `GOAL-001`
- **PRD-GOAL-002** — System generates exactly five personalized measurable goal options; employee selects two.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.1 · Source ID(s): `GOAL-002`
- **PRD-GOAL-003** — System assigns the third goal automatically; it cannot be replaced or rejected.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.1 · Source ID(s): `GOAL-002`
- **PRD-GOAL-004** — Personalization uses employee history; for a new employee only available context/universal assumptions may be used without inventing experience.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.1 · Source ID(s): `GOAL-003`
- **PRD-GOAL-005** — First authorization mid-month triggers immediate goal setup without proration.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.1 · Source ID(s): `GOAL-004`
- **PRD-GOAL-006** — Each human-readable goal has a machine-readable rule executable by backend logic.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.2
- **PRD-GOAL-007** — The system is not required to explain why the mandatory third goal was assigned.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.2 · Source ID(s): `GOAL-005`
- **PRD-GOAL-008** — Each new task is automatically matched against active goals; one task may advance multiple goals.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.3 · Source ID(s): `GOAL-006`
- **PRD-GOAL-009** — Goal progress updates in real time and reaching target immediately marks the goal complete.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.3 · Source ID(s): `GOAL-007`
- **PRD-GOAL-010** — Overachievement provides no additional goal bonus.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.3 · Source ID(s): `GOAL-008`
- **PRD-GOAL-011** — Vacation does not reduce goal thresholds, extend the period or penalize failure.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.3 · Source ID(s): `GOAL-009`
- **PRD-GOAL-012** — Previous month closes on the first working day of the new month; bonuses and Monthly Recap are generated then.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.4 · Source ID(s): `GOAL-010`
- **PRD-GOAL-013** — Working Annual Score reward baseline is +15 per completed goal plus +15 for all three.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.4 · Note: Product v1.0 balance baseline; later simulation may recommend a change but cannot silently alter it.
- **PRD-GOAL-014** — Working Evolution XP reward baseline is +10 per completed goal plus +10 for all three, max 40 goal XP/month.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.4 · Note: Product v1.0 balance baseline; later simulation may recommend a change but cannot silently alter it.
- **PRD-GOAL-015** — Goal reward values remain current balance baselines until Stage 7 validation/configuration; do not silently change them.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CONFIGURABLE_BASELINE` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §12.4; §29 · Note: Product v1.0 balance baseline; later simulation may recommend a change but cannot silently alter it.

## Ratings & privacy

- **PRD-RANK-001** — Individual public leaderboard is based on Annual Score for the current calendar year.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.1 · Source ID(s): `RANK-001`
- **PRD-RANK-002** — Annual Score/current leaderboard reset January 1; pet, HP, Evolution XP, history, achievements and cosmetics persist.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.1 · Source ID(s): `RANK-002`
- **PRD-RANK-003** — Past-year top employees may retain visual status badges/cosmetics without gameplay advantage.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.1 · Source ID(s): `RANK-003`
- **PRD-RANK-004** — Mandatory public employee fields include rank, name, Annual Score, pet appearance and prior-year status rewards.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.1
- **PRD-RANK-005** — Directorate ranking uses Average Directorate Score based on annual directorate task/goal points and authorized employee denominator as defined by Product semantics.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.2 · Source ID(s): `RANK-004`
- **PRD-RANK-006** — Directorate card exposes rank, Average Score, Total Score and authorized employee count.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.2 · Source ID(s): `RANK-005`
- **PRD-RANK-007** — Directorate card includes internal employee leaderboard; profile detail respects peer privacy level.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.2 · Source ID(s): `RANK-006`
- **PRD-RANK-008** — Each task/version preserves directorate_id_at_task_time; pre-transfer points remain attributed historically.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.3 · Source ID(s): `RANK-007`
- **PRD-RANK-009** — Terminated employees leave current individual ranking/current denominator while historical analytics remain.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.3 · Source ID(s): `RANK-008`
- **PRD-RANK-010** — Admin can hide terminated/inactive profiles without deleting history.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §13.3 · Source ID(s): `RANK-009`
- **PRD-PRIV-001** — Peer privacy levels are Closed, Standard (default) and Open.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14
- **PRD-PRIV-002** — Closed exposes only mandatory public fields.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14
- **PRD-PRIV-003** — Standard adds approved aggregates such as task count, complexity distribution, streak, goals, achievements and AI tools.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14
- **PRD-PRIV-004** — Open additionally exposes normalized AI-case description, tool(s), Complexity and score.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14
- **PRD-PRIV-005** — Raw input, clarification log and task links are never exposed to peers, including Open privacy.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14 · Source ID(s): `PRIV-001`
- **PRD-PRIV-006** — Employee may change privacy at any time; the change applies immediately.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14 · Source ID(s): `PRIV-002`
- **PRD-PRIV-007** — Peer privacy does not restrict authorized Director/Executive/Admin scope.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §14 · Source ID(s): `PRIV-003`

## Dashboards & history

- **PRD-DASH-001** — Personal Dashboard includes Annual Score.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-002** — Personal Dashboard includes Lifetime Task Score / Evolution XP.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-003** — Personal Dashboard includes task count, Complexity distribution and average Complexity.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-004** — Personal Dashboard includes AI-active days and current/best streak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-005** — Personal Dashboard includes Monthly Goals progress.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-006** — Personal Dashboard includes AI Tools usage and category/subcategory breakdown.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-007** — Personal Dashboard includes activity trend, pet state/evolution and earned achievements/cosmetics.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.1
- **PRD-DASH-008** — Benchmark comparison metrics do not generate points.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.2
- **PRD-HIST-001** — History has separate Tasks and Events views.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.3 · Source ID(s): `HIST-001`
- **PRD-HIST-002** — Task history supports search and filters for period, Complexity, tool, taxonomy, Monthly Goal, status and score.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.3 · Source ID(s): `HIST-001`
- **PRD-HIST-003** — Event history covers key progress events including Score/XP, goals, streak, evolution, achievements/cosmetics, significant HP transitions, coma/recovery and vacation toggles.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.3 · Source ID(s): `HIST-001`
- **PRD-HIST-004** — Event history should not expose every routine daily HP delta; meaningful health transitions are the required user-facing events.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §15.3 · Source ID(s): `HIST-002`
- **PRD-ANL-001** — Company analytics visible to ordinary employees is aggregate/anonymous and must not expose identifying raw task data.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §16
- **PRD-DIR-001** — Director Dashboard covers authorized headcount, Total/Average Score, directorate rank, task dynamics, C1–C5, top tools/categories, goals and employee score/activity list.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.1
- **PRD-DIR-002** — Director can drill down to employee profile and concrete task inside own directorate.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.1
- **PRD-DIR-003** — Do not invent a standalone Director 'risks/attention' block not defined by Product.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.1 · Source ID(s): `DIR-001`
- **PRD-EXEC-001** — Executive Dashboard covers company headcount, task count, average Score/employee, activity dynamics, C1–C5, top tools/categories, goals and directorate ranking.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.2
- **PRD-EXEC-002** — Executive drilldown is company → directorate → employee → task.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.2
- **PRD-ADMIN-001** — Admin modules cover employees/roles, directorates/directors, block/unblock/hide, calendar, taxonomy, AI tools/unrecognized tools, exports, technical scoring trace and audit logs.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §17.3; §21

## Taxonomy, tools & operations

- **PRD-TAX-001** — Task taxonomy has two managed levels Category → Subcategory plus free tags.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.1 · Source ID(s): `TAX-001`
- **PRD-TAX-002** — AI selects from the managed category/subcategory dictionary and must not create categories itself.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.1 · Source ID(s): `TAX-002`
- **PRD-TAX-003** — Admin may add, rename and deactivate taxonomy entries; historical tasks are not automatically reclassified.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.1 · Source ID(s): `TAX-003`
- **PRD-TAX-004** — Each task version records taxonomy_version; editing an old task classifies the new version with current taxonomy.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.1 · Source ID(s): `TAX-004`
- **PRD-TAX-005** — Top-level taxonomy begins with the Product v1.0 category set; subcategory depth remains two managed levels.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.1
- **PRD-TOOL-001** — AI tools use a centralized directory with canonical name and aliases.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.2 · Source ID(s): `TOOL-001`
- **PRD-TOOL-002** — A task may reference multiple tools and, when explicitly inferable, stores primary tool, tool role and usage order.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.2 · Source ID(s): `TOOL-002`
- **PRD-TOOL-003** — Unrecognized tool name is preserved and does not block the task; Admin may add it later.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.2 · Source ID(s): `TOOL-003`
- **PRD-TOOL-004** — Tool model/version inside an AI service is not a required tracked field.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §18.2 · Source ID(s): `TOOL-004`
- **PRD-NOTIF-001** — MVP notifications are in-app only.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §19.1 · Source ID(s): `NOTIF-001`
- **PRD-NOTIF-002** — Notification domains include pet health, Monthly Goals, streak, progress events and limited leaderboard events.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §19.1
- **PRD-ADMIN-002** — Admin can manage directorates, transfers, directors, system role/status, block/unblock, exceptional manual employees and personnel corrections.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §21.2
- **PRD-ADMIN-003** — Administrative changes are auditable with actor, action, entity, old value, new value and timestamp.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §21.2 · Source ID(s): `ADMIN-002`
- **PRD-CAL-001** — A single corporate calendar defines weekends, official holidays and manually added company non-working days.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §21.3 · Source ID(s): `CAL-001`
- **PRD-EXP-001** — Exports support XLSX and CSV with role-based scope.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §22 · Source ID(s): `EXP-001`
- **PRD-EXP-002** — Task-level export can represent current task version or, in audit mode, a specific historical version.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §22.1

## Data, audit & integrations

- **PRD-DATA-001** — Personnel identity, current directorate, application role/status and active state are represented separately from immutable task history.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §21; §23
- **PRD-DATA-002** — Task/version data preserves raw input, normalized description, processing/classification output, timestamps and version lineage needed for audit.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23; §24
- **PRD-DATA-003** — Task-tool mapping supports recognized/unrecognized tools, primary flag, role description and sequence when known.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23.9
- **PRD-DATA-004** — Task URLs are stored independently and can be removed without the application opening/analyzing them.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23.10
- **PRD-DATA-005** — Score accounting uses event/ledger semantics with deltas, source references, directorate attribution, SPB event date and reversal linkage.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23.11; Appendix C
- **PRD-DATA-006** — Pet state covers HP, health state, vacation, current/best streak, Evolution XP/stage/branch and coma recovery progress.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23.12
- **PRD-DATA-007** — Daily activity preserves working-day/vacation context, task count and maximum Complexity needed to reproduce HP/streak.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §23.13
- **PRD-AUDIT-001** — Task edit/delete/recalculation must remain reproducible through versioning and ledger/reversal semantics rather than destructive overwrite.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §24; Appendix C
- **PRD-AUDIT-002** — End-of-day jobs must be idempotent and support safe recalculation after edit/delete.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · Appendix C
- **PRD-AUDIT-003** — Goal rule_json must be declarative/backend-executable; free-form LLM judgment alone cannot decide goal completion.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · Appendix C
- **PRD-EXT-001** — Corporate Personnel integration is required, but protocol/base URL/auth/unique employee key/normalization/sync details are not supplied and must not be invented.  
  Status: `EXTERNAL_DEPENDENCY` · Kind: `EXTERNAL_DEPENDENCY` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §25; §5 Security note
- **PRD-EXT-002** — LLM and STT are provider dependencies; current source set does not freeze production vendor endpoint/credentials/model.  
  Status: `EXTERNAL_DEPENDENCY` · Kind: `EXTERNAL_DEPENDENCY` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §25; Readiness
- **PRD-NFR-001** — Application is online-first/online-only for data mutation and must handle network failure explicitly.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §3; §27
- **PRD-NFR-002** — Role/object authorization, privacy and auditability are backend-enforced invariants.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §4; §14; §24; §26
- **PRD-NFR-003** — No real production credentials/secrets are defined by the source set.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `MVP_REQUIRED` · Source: `TZ_AI_Tamagotchi_v1.0 (1).docx` · §25–27

## Visual & interaction

- **VIS-ART-001** — Visual concept = Modern Airport Companion: near-realistic Pulkovo world + Lyuboznayka emotional focus + strict modern airport-inspired UI + restrained gamification.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §1
- **VIS-ART-002** — Product should feel youthful/alive but not childish; playful emotionally but strict functionally; bright but not acidic/free-to-play.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §1.4
- **VIS-ART-003** — Do not use a domestic cozy-room concept or home décor as the primary environment.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §1.5
- **VIS-ART-004** — Retro digital-toy references are secondary only; no pixel/LCD/plastic-console identity as core UI.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §1.6
- **VIS-MASCOT-001** — Canonical mascot is the exact approved user-supplied JPEG; derivatives must preserve that identity.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §2
- **VIS-MASCOT-002** — Mascot invariants: compact rounded body, huge glossy dark eyes, tiny beak, cream-white soft fur/feathers, warm beige/light-brown accents, short limbs, gentle curious expression.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §2
- **VIS-MASCOT-003** — Mascot rendering is semi/near-realistic stylized 3D; it must not become a realistic owl or flat cartoon.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §2
- **VIS-MASCOT-004** — Home is mascot-first; functional screens are function-first and must not decorate every control with mascot imagery.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §2.5–2.6
- **VIS-MASCOT-005** — Do not use a persistent first-person mascot speech bubble on Home; ambient copy remains deferrable.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Design §2.7 / Final audit · Decision: `OD-009`
- **VIS-WORLD-001** — Environment source of truth is the approved Pulkovo terminal-interior composition.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §3
- **VIS-WORLD-002** — Pulkovo cues: tall bright terminal, warm faceted/golden ceiling, structural supports, glazing/daylight, reflective floor, airport counters/screens/passenger context and restrained people.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §3
- **VIS-WORLD-003** — Lyuboznayka remains foreground emotional focus; environment must not overpower it.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §3
- **VIS-WORLD-004** — Day lighting is implementation baseline; morning/evening/night remain derivative states.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-012`
- **VIS-HOME-001** — AI-задача UI semantics = completed AI-assisted work case; no future to-do lifecycle.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-001`
- **VIS-HOME-002** — Mobile bottom navigation = Главная / История / Рейтинг / Профиль.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-002`
- **VIS-HOME-003** — Home primary CTA = «Добавить AI-задачу».  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-003`
- **VIS-HOME-004** — Annual Score/rank is not persistently displayed on Home; use Rating/Profile contexts.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-004`
- **VIS-HOME-005** — Evolution XP is not persistently displayed on Home; use Profile/Evolution/result contexts.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-005`
- **VIS-HOME-006** — Home shows compact Monthly Goals progress only; full detail is elsewhere.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-006`
- **VIS-HOME-007** — Home health presentation baseline = mascot state + detail-on-demand; no persistent numeric HP bar.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-011`
- **VIS-HOME-008** — Do not add permanent feed/play/learn/rest-style game-button row on Home.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-010`
- **VIS-DS-001** — Functional UI is light, strict, modern, airport-inspired with restrained amber/gold accent.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §6–7
- **VIS-DS-002** — Functional UX/readability takes priority over decorative 3D/gamification.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design §1.2
- **VIS-DS-003** — Use current Stage-20 token/component handoff rather than legacy component values.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md` · Current handoff
- **VIS-DS-004** — Final runtime font is not frozen; Stage-20 baseline uses Inter + system fallbacks and must remain replaceable.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-017`
- **VIS-DS-005** — Current token palette is implementation baseline; final scene-level color calibration remains a freeze refinement.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-018`
- **VIS-MOTION-001** — Navigation motion is fast/restrained; mascot/feedback motion may be more elastic without impairing function.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design Motion
- **VIS-MOTION-002** — Reduced Motion behavior is mandatory; large bounce/squash/motion degrades to restrained fade/scale while preserving feedback.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md` · Current motion handoff
- **VIS-MOTION-003** — Stage-20 motion values are the implementation baseline; final animation tuning remains open.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-027`
- **VIS-RESP-001** — Mobile is primary; desktop/admin uses dedicated desktop information architecture rather than stretched mobile layouts.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` · Design + handoff
- **VIS-RESP-002** — Responsive 3D framing preserves mascot face/eyes, CTA and nav safe regions; mascot does not scale linearly with viewport width.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md` · Responsive handoff
- **VIS-3D-001** — 3D planning architecture = HYBRID and functional UI must remain usable when realtime 3D is unavailable.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4
- **VIS-3D-002** — Realtime baseline = Three.js + WebGL2-capable web/PWA + glTF 2.0/GLB.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-019`
- **VIS-3D-003** — 3D coordinate convention = 1 unit = 1 meter, right-handed glTF, Y-up.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-020`
- **VIS-3D-004** — Production visual runtime files may be consumed directly only from `08_PRODUCTION_EXPORTS/`.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/README_FINAL_PACKAGE_v2.0.md` · Final package README
- **VIS-3D-005** — Existing package GLBs are Stage-16 technical/proxy assets and must not be promoted as final production 3D.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/README_FINAL_PACKAGE_v2.0.md` · Final package audit
- **VIS-3D-006** — Final mascot/world production GLBs are external production dependencies; integrate through explicit interfaces and approved fallbacks.  
  Status: `EXTERNAL_DEPENDENCY` · Kind: `EXTERNAL_DEPENDENCY` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/README_FINAL_PACKAGE_v2.0.md` · Final package audit
- **VIS-3D-007** — KTX2 remains optional/unvalidated; compatible non-KTX2 path is current baseline.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-023`
- **VIS-3D-008** — LOD, memory and file-size numeric budgets are not benchmark-certified; no measured performance claim may be invented.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-021/022/024`
- **VIS-3D-009** — Numeric camera/FOV/safe-zone and runtime-lighting values remain tuning items; use current framing/lighting specs as baseline.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-025/026`
- **VIS-ASSET-001** — Old schematic Happy/Coma mascot fallbacks are deprecated; canonical-derived v2 fallbacks are current.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md` · Current approval
- **VIS-ASSET-002** — Approved Pulkovo Home Day v2 fallback is current.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md` · Current approval
- **VIS-QA-001** — Current Golden Screen set contains 17 v2 references: 15 mobile and 2 desktop.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md` · Current remediation
- **VIS-QA-002** — Golden Screens are visual regression references and do not replace functional/performance runtime tests.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/README_FINAL_PACKAGE_v2.0.md` · Visual QA / final audit
- **VIS-RIGHTS-001** — Legal/brand/license/provenance workflow is WAIVED_NON_BLOCKING for project progression; this is not independent legal clearance.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §1 · Decision: `OD-015/032`
- **VIS-PERF-001** — Physical-device Stage-16 validation is WAIVED_NON_BLOCKING; no measured FPS/memory/load claim is authorized.  
  Status: `RESOLVED_BY_OWNER` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` · Owner override §4 · Decision: `OD-024`
- **VIS-ART-005** — Final app identity/logo must not be invented until supplied/approved.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-016`
- **VIS-ASSET-003** — Release-specific achievement/cosmetic art may use generic badge/icon fallback; do not invent final release inventory.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-028`
- **VIS-ASSET-004** — Final evolution-branch art must not be invented; canonical/base mascot treatment remains valid until branch assets exist.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-029`
- **VIS-HANDOFF-001** — Current developer consumption filenames are the Stage-20 canonical files named by the handoff index even where versioned lineage companions exist.  
  Status: `RESOLVED_FROM_SOURCE` · Kind: `CURRENT_VISUAL` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md` · Stage-20 handoff
- **VIS-HANDOFF-002** — No live Figma workspace/master link is available; file-based handoff is the current source.  
  Status: `DEFERRED_NONBLOCKING` · Kind: `DEFERRED_VISUAL_FREEZE` · Source: `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md` · Final audit · Decision: `OD-030`

## Normalization rules applied
1. Product v1.0 stays authoritative for business/game/data rules except explicit owner overrides.
2. Removing Score/XP from persistent Home display changes placement, not the underlying mechanics.
3. Design v1.0 Home navigation/CTA variants are superseded by OD-002/003.
4. Development Readiness `Proposed` / `Requires approval` decisions are not silently promoted.
5. Product balance-marked values remain current baselines; no value was tuned in Stage 1.
6. Missing final art/3D/performance data is represented as external/deferred dependency rather than fabricated content.
