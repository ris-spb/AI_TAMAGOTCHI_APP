# AI MODEL / PROMPT / RULE VERSIONING POLICY

**Version:** `ai-versioning-policy-v1.0`

## 1. Reproducibility envelope

Every AI processing run must be attributable to trusted identifiers for:
- provider key;
- model identifier;
- model version/revision when exposed;
- prompt bundle version/hash;
- structured-output schema version/hash;
- scoring rubric version;
- capability knowledge version;
- taxonomy version;
- tool-directory snapshot/reference;
- goal-generator version when goal generation is invoked;
- game-rule version applied later by deterministic backend.

These identifiers are persisted by the application/runtime, not accepted as authoritative fields from LLM output.

## 2. Current Stage-5 mapping

`system_versions` currently supports:
- `scoring_rubric`
- `extraction_prompt`
- `extraction_schema`
- `plausibility_knowledge`
- `goal_generator`
- `game_rules`

Stage 8 maps:
- prompt bundle release → `extraction_prompt` record with bundle hash/metadata;
- `ai_processing_schema.json` → `extraction_schema`;
- C1–C5 rubric → `scoring_rubric`;
- capability KB → `plausibility_knowledge`;
- goal prompt/template behavior → `goal_generator`;
- deterministic Stage-7 config → `game_rules`.

Individual prompt-file hashes are included in `PROMPTS/prompt_bundle_manifest.json`.

## 3. Immutability

Once used for a completed historical task version:
- version record is not edited in place;
- prompt content change creates a new prompt bundle version;
- schema change creates a new schema version;
- rubric change creates a new rubric version;
- capability change creates a new knowledge version.

Old task versions are not automatically reprocessed because model/prompt/rubric/taxonomy changed.

## 4. Change classes

### Patch
Editorial change that provably cannot alter semantics/output contract. Still changes file hash; may retain semantic version only when repository policy supports immutable artifact IDs.

### Minor
Behavioral prompt/context change with compatible schema/rubric.

### Major
Schema incompatibility, rubric boundary change, or other behavior capable of materially changing stored classification semantics.

Every deployed artifact is content-hashed regardless of semantic version label.

## 5. Regression requirement

Before deployment:
- prompt change → fixed benchmark regression;
- model change → fixed benchmark regression;
- rubric change → fixed benchmark regression and version increment;
- schema change → schema-contract tests + benchmark regression;
- taxonomy/capability change → mapping/plausibility regression relevant to changed scope.

No change may silently replace the active runtime artifact.

## 6. Production monitoring by version

At minimum compare:
- C-level distribution;
- clarification rate/count;
- schema-invalid rate;
- processing failure rate;
- latency;
- C4/C5 boundary drift;
- taxonomy mapping failures;
- unrecognized-tool rate.

Monitoring may identify a regression but must not automatically retrain/rewrite scoring rules in MVP; automated retraining is future scope.
