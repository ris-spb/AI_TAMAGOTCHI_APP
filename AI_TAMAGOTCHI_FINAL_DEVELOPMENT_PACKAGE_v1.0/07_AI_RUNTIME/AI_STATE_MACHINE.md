# AI PROCESSING STATE MACHINE

**Version:** `ai-state-machine-v1.0`

## 1. Persisted coarse states

| State | Meaning | Terminal |
|---|---|---|
| `queued` | accepted raw task/version is durable; AI work is pending | No |
| `processing` | worker owns/executes processing | No |
| `waiting_clarification` | one persisted question awaits employee answer | No |
| `completed` | schema-valid assessment committed; eligible for deterministic finalization | Yes for AI run |
| `failed` | terminal provider/runtime failure for this run; raw input remains recoverable | Yes |
| `cancelled` | superseded/cancelled run, e.g. version became stale | Yes |

Exact DB status spellings follow Stage-5 schema; this document defines semantics.

## 2. Internal processing phases

`LOAD_CONTEXT → EXTRACT → PLAUSIBILITY → DUPLICATE_CHECK → CLARIFICATION_GATE → NORMALIZE → MAP_TAXONOMY_TOOLS → EVIDENCE → CLASSIFY_C_LEVEL → VALIDATE_SCHEMA → COMPLETE`

Internal phases are trace/implementation steps and do not require a database status enum for each phase.

## 3. Transition rules

### queued → processing
Preconditions:
- task version exists;
- accepted raw input/transcript already persisted;
- run is current and not superseded;
- idempotent claim succeeds.

### processing → waiting_clarification
Allowed only when:
1. model/runtime proposes `clarification.required=true`;
2. backend confirms question changes useful information;
3. persisted clarification count is `< 3`;
4. no equivalent question was already answered;
5. question/reason passes schema and length validation.

Transaction:
- create clarification row with next sequence number;
- increment/derive shared count;
- set run/task state to waiting;
- emit outbox event if required.

### waiting_clarification → processing
After authorized employee answer:
- persist answer;
- resume same task version;
- include all previous question/answer pairs in trusted context;
- no prior historical answer is overwritten.

### processing with clarification request when count = 3
**No transition to waiting is allowed.**
Backend overrides the request:
- set clarification forced-continue marker in technical trace;
- continue evaluation from available facts;
- do not penalize confidence/Score;
- do not fabricate missing facts.

A fourth persisted question must be impossible by invariant/transactional check.

### processing → completed
Preconditions:
- current run/version is still effective;
- structured output validates against `ai_processing_schema.json`;
- any returned taxonomy IDs exist and are active in supplied version;
- any recognized canonical tool IDs exist in supplied directory;
- unrecognized tools have no canonical ID;
- no numerical business outputs exist;
- finalization prerequisites are complete.

The AI result is then handed to deterministic Case Workflow. AI completion itself does not apply Score/game arithmetic.

### processing → failed
Terminal examples:
- bounded retries exhausted;
- provider permanent error;
- terminal invalid structured output;
- configuration error;
- provider content rejection with no compliant fallback.

Effects:
- accepted raw task/version remains durable;
- no new Score/HP/XP/goal side effects;
- user can retry safely under application rules.

### processing → cancelled
When task version is superseded/deleted or processing run is explicitly replaced before commit.
Late provider responses must be discarded after a current-version/current-run check.

## 4. Clarification reason priority

1. `plausibility` / task semantics / capability conflict;
2. `missing_data`;
3. `complexity` boundary evidence;
4. `duplicate` when separate execution materially affects interpretation.

All reasons consume the same maximum of 3.

## 5. Retry model

Retry applies to provider transport/runtime attempts, not to business finalization.

Retryable:
- timeout;
- rate limit when retryable;
- transient 5xx/provider unavailable;
- transient network error;
- schema-invalid output only if a configured repair/retry policy permits it.

Not blindly retryable:
- permanent provider/configuration error;
- authorization/config errors;
- stale/superseded task version;
- repeatedly schema-invalid output after bounded attempts.

Every provider attempt is separately observable while the business processing run remains logically idempotent.

## 6. Fallback

Fallback is an explicit configured route:
`primary provider/model → approved fallback provider/model`.

No fallback is assumed in source files. If none is configured, fail safely and retain the task.

A fallback execution must record its actual provider/model and the same trusted prompt/schema/rubric versions used for the attempt.

## 7. Duplicate semantics

Backend similarity search may supply recent candidates. Similarity alone:
- does not reject;
- does not deny points;
- does not label fraud.

If uncertainty matters and clarification budget remains, ask whether this is a separate execution. If employee confirms separate execution, continue as an independent task.

## 8. Idempotency and stale-response defense

At every commit:
- verify task version is still current/effective for this processing run;
- use persisted run/idempotency identity;
- ignore duplicate provider completion;
- never apply deterministic business ledgers twice.

This state machine composes with Stage-4 outbox/inbox/idempotency and Stage-7 ledger rules.
