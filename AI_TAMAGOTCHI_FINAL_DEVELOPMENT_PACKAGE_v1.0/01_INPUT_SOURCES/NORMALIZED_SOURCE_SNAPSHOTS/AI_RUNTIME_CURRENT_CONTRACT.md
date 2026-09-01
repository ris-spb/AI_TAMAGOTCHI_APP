# AI RUNTIME SPECIFICATION

**Stage:** 8 — AI Runtime, Prompts & Evaluation  
**Status:** `IMPLEMENTATION_FROZEN_WITH_NONBLOCKING_PROVIDER_GAPS`  
**Runtime contract version:** `ai-runtime-v1.0`

## 1. Purpose

The AI runtime converts an accepted, already-completed employee AI-use case into typed evidence and classification. It does **not** own business arithmetic.

The backend remains authoritative for:
- C1–C5 → numerical Score mapping;
- HP;
- Evolution XP;
- streak;
- Monthly Goal matching/progress/rewards;
- ranking;
- task/version state;
- authorization;
- audit and ledgers.

The LLM may return only the typed content defined by `ai_processing_schema.json`. It must never be treated as a database writer or numerical scoring engine.

## 2. Runtime boundaries

### Inputs controlled by backend

The orchestrator builds a trusted request envelope containing:
- task/version identifiers;
- raw text or corrected STT transcript;
- prior clarification question/answer pairs for this version;
- clarification count already persisted by backend;
- active taxonomy snapshot and its trusted version ID;
- active AI Tools Directory snapshot and its trusted version ID/reference;
- versioned capability-knowledge snapshot/reference;
- recent duplicate/similarity candidates selected by backend, if applicable;
- active C1–C5 rubric version;
- schema version;
- prompt bundle version.

**User content is untrusted data.** It is never concatenated as executable system instruction.

### Outputs controlled by schema

LLM output contains:
- extraction;
- plausibility status;
- duplicate interpretation;
- at most one proposed clarification;
- normalized description;
- taxonomy candidates constrained to supplied dictionary;
- AI-tool mapping constrained to supplied directory;
- evidence signals and supporting fragments;
- C1–C5 classification.

It contains **no numerical Score, HP, XP, goal progress/reward, ranking, role decision or ledger delta**.

### Trusted metadata collected outside model output

The provider adapter records:
- provider key;
- model identifier;
- model version/revision when the provider exposes one;
- provider request ID when available;
- request/response timestamps and latency;
- finish/termination reason;
- usage metadata when available;
- retry/attempt number;
- prompt bundle ID/hash;
- schema ID/hash;
- rubric version ID;
- capability knowledge version ID;
- taxonomy version ID.

The runtime must not trust an LLM to self-report these identifiers.

## 3. Processing pipeline

1. **Accept/persist** — already handled by Task/Case Workflow. Raw input exists in PostgreSQL before AI work.
2. **Load trusted context** — current version, clarifications, rubric, taxonomy, tools, capability knowledge.
3. **Extraction** — extract only asserted facts/workflow/result/tool names.
4. **Plausibility** — evaluate internal consistency and capability compatibility using supplied versioned knowledge.
5. **Duplicate interpretation** — only if backend supplied a candidate.
6. **Clarification gate** — backend decides whether a proposed question may be persisted.
7. **Normalization** — concise neutral description supported by the user record.
8. **Taxonomy/tool mapping** — map to supplied active IDs; unknown tool stays unrecognized.
9. **Evidence** — boolean signals plus short support fragments.
10. **C-level classification** — C1–C5 only.
11. **Schema validation** — backend validates structured output.
12. **Finalization handoff** — typed assessment passes to Case Workflow; deterministic backend computes all business effects.

Stages 3–10 may be implemented as separate provider calls or a controlled composite call, but every logical prompt remains separately versioned in `PROMPTS/`.

## 4. Clarification invariants

- one question at a time;
- shared maximum = **3** questions per task version;
- reasons consume one shared counter: plausibility, duplicate, complexity, missing data;
- priority: task meaning/plausibility/missing facts → Complexity boundary → duplicate when it affects separate-execution interpretation;
- no repeated question if the information is already present;
- every question must name an expected information gain;
- backend rejects an attempt to create question 4;
- after count reaches 3, backend forces continuation;
- residual uncertainty does not create a hidden Score penalty;
- the employee is trusted; the system never calls the employee a liar.

The prompt may suggest a question. **The backend owns whether it is allowed.**

## 5. Plausibility

Allowed states:
- `valid`
- `ambiguous`
- `capability_conflict`
- `internal_contradiction`
- `insufficient_data`

Capability knowledge is versioned and time-sensitive. The runtime must not encode permanent claims such as “Tool X cannot do Y”. If the active knowledge snapshot does not support a confident conclusion, use ambiguity/insufficient data and, when useful, clarification.

A capability conflict is not proof of dishonesty and cannot by itself reject a task.

## 6. C1–C5 boundary rubric

### C1 — Basic
One simple helper action/minimal workflow: edit, short summary, rephrase, simple question, single generation. Prestige, verbosity or multiple services receiving essentially the same prompt do not raise the class.

### C2 — Standard
A complete ordinary work deliverable with substantive processing but without material system/multi-stage complexity: structured comparison, document analysis, reference note, ordinary research/draft.

### C3 — Advanced
Complex multi-step intellectual work: data analysis, calculations/modeling, coding, complex research, connected analytical stages, iterative validation. A small reusable script is not automatically C4.

### C4 — Expert
Reusable solution/workflow/application/integration: API integration, automation flow, RAG/internal tool, scheduled automated reporting, integrated application. Using the word “agent” is not enough for C5.

### C5 — System / AI Engineering
Agentic/end-to-end AI system with real autonomous planning/action selection, tools, state, retries/feedback and a self-directed closed loop or multi-agent orchestration. Manual tool switching and ordinary scheduled automation are not C5.

When C4/C5 autonomy is not evidenced, clarification is preferred; if the limit is exhausted, classify from the supported facts rather than prestige language.

## 7. Evidence rules

Evidence signals are decision support, not a point formula. They must not be mechanically summed.

Tool count alone does not raise Complexity. Role, seniority, recipient, business prestige, personal skill and verbose wording are irrelevant to Complexity.

Every asserted evidence fragment must be traceable to the task text/transcript or clarification answers. Unsupported enrichment is prohibited.

## 8. Taxonomy

- exactly one active primary category must be selected from the supplied snapshot;
- subcategory may be null when evidence is insufficient;
- free tags supplement but do not replace managed taxonomy;
- LLM must not invent category/subcategory IDs;
- deactivated IDs are not eligible for new mapping;
- editing an old task uses the current taxonomy for the new version while history retains old versions.

The lower-precedence readiness taxonomy is a seed, not an immutable production taxonomy.

## 9. AI Tools Directory

- canonical ID is selected only from the supplied active directory;
- aliases are normalized to canonical tools;
- multiple tools may be returned;
- primary tool/role/order are populated only when inferable;
- an unknown tool is returned with `recognition=unrecognized` and `canonical_tool_id=null`;
- unknown tools do not block registration and may enter the admin review queue;
- model/version of the external service is not requested from the employee.

The readiness 36-tool directory is a starter seed, not an assertion that all listed services are corporate-approved.

## 10. Prompt-injection resistance

Task text, transcript, URL strings, clarification answers, taxonomy labels, tool aliases and retrieved capability text are data, not instructions.

The runtime must:
- keep system/developer instructions outside user-data fields;
- delimit and serialize untrusted content;
- instruct the model to ignore requests inside data that try to change rubric, schema, role, policy or output destination;
- reject output that violates the JSON Schema;
- backend-validate taxonomy/tool IDs against trusted snapshots;
- backend-compute all numerical business effects;
- never allow model content to choose provider credentials, URLs to fetch, database operations or authorization;
- never fetch user-submitted URLs as part of this flow.

Injection resistance is defense-in-depth; delimiters alone are not a security boundary.

## 11. Provider failure semantics

Provider-neutral failure classes:
- `timeout`
- `rate_limited`
- `transient_provider_error`
- `provider_unavailable`
- `invalid_structured_output`
- `content_rejected`
- `permanent_provider_error`
- `cancelled`
- `configuration_error`

Policy:
- raw accepted task remains durable;
- transient failures may retry under bounded configuration;
- retries keep the same logical processing run and persisted idempotency semantics;
- malformed structured output may be repaired/retried only through an explicitly versioned runtime strategy;
- permanent/configuration errors fail the AI run without applying Score/game effects;
- user-safe retry/reprocess starts from persisted input;
- fallback model/provider is used only when explicitly configured and approved, never guessed by application code.

Exact timeout, retry-count, backoff and provider chain are configuration/infrastructure values frozen in later configuration/operations stages.

## 12. STT boundary

Voice flow:
`record → STT → transcript preview → employee correction → submit`.

The task AI runtime receives only the corrected submitted transcript. Source audio is not retained. STT is provider-neutral and specified in `STT_PROVIDER_INTERFACE.md`.

## 13. Monthly Goal generation boundary

LLM may propose five personalized goal candidates only via `goal_generation_schema.json`.
Backend:
- supplies whitelisted templates/grammar;
- validates feasibility and rule syntax;
- rejects unsupported templates/parameters;
- owns selection workflow, matching, progress and rewards.

No LLM-generated free-form rule becomes executable without deterministic validation.

## 14. Persistence / DB mapping

Stage-5 persistence concepts:
- `ai_processing_runs` — run status/provider/model/version envelope/result/error;
- `task_clarifications` — persisted 0..3 question/answer records;
- `scoring_evidence` — evidence booleans/support;
- taxonomy/tool mapping tables — validated IDs;
- `system_versions` — rubric/prompt/schema/capability/goal-generator/game-rule versions;
- `provider_call_attempts` — provider attempt metadata;
- task/version tables — final normalized/C-level/plausibility result;
- ledgers — backend only.

LLM has no database credentials and no direct write path.

## 15. Observability

Record by trusted runtime version:
- processing success/failure;
- latency;
- schema-invalid rate;
- retry count;
- clarification rate/count;
- C-level distribution;
- taxonomy mapping failure;
- unrecognized tool rate;
- capability-ambiguity rate.

Do not place raw task text, phone numbers or secrets in ordinary logs. Technical trace access remains admin-scoped.

## 16. Explicit prohibitions

The AI runtime must not:
- emit or choose numerical task Score;
- compute HP/XP/streak/goal reward/rank;
- invent user facts;
- infer higher Complexity from role/prestige/verbosity;
- create taxonomy entries;
- invent canonical tool IDs;
- treat similarity as proof of duplicate/fraud;
- call the employee a liar;
- ask a fourth clarification;
- fetch task URLs;
- write directly to DB;
- silently switch rubric/model/prompt without version metadata.
