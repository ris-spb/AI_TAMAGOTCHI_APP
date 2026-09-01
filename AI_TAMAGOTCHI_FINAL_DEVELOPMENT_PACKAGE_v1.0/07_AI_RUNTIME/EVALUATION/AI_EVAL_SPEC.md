# AI EVALUATION SPECIFICATION

**Evaluation version:** `ai-eval-v1.0`

## 1. Evaluation units

### A. Existing fixed benchmark
`balanced-gold-v0.1`, 100 cases, 20 per C-level.

### B. Adversarial/edge suite
Defined in `ADVERSARIAL_SET_SPEC.md`; maintained separately from the fixed benchmark.

### C. Future pilot holdout
Anonymized real descriptions only after required organizational/security approval. Never tune and final-evaluate on the same rows.

## 2. Exact-match fields

Exact comparison is required where the gold set provides a deterministic label:
- `complexity.level`;
- clarification required yes/no;
- primary category when the benchmark gold label maps unambiguously to active taxonomy;
- recognized canonical tool set after alias normalization, where gold contains explicit tools.

Schema/version metadata is runtime metadata and is not an LLM exact-match field.

## 3. Acceptable variation

The following are semantic, not string-exact:
- normalized description;
- complexity explanation;
- clarification question wording;
- expected information gain;
- evidence support fragments;
- tags;
- tool role description.

For clarification text, variation passes when it requests the same decision-relevant information without adding unsupported assumptions.

For normalization/evidence, variation passes only when every factual assertion is supported by employee text/answers.

## 4. Required metrics

### Complexity
- exact C-level accuracy;
- adjacent accuracy (`|predicted-gold| <= 1`);
- confusion matrix;
- macro F1;
- C4/C5 false-positive rate;
- per-boundary C1↔C2, C2↔C3, C3↔C4, C4↔C5 error counts.

### Clarification
- exact `ClarificationRequired` accuracy;
- precision/recall/F1 for required clarification;
- semantic expected-question match;
- unnecessary-question rate;
- attempted 4th-question count.

### Factual integrity
- unsupported factual assertion count/rate;
- invented workflow-step count;
- invented autonomy/integration count;
- accusatory/lie-language count.

### Taxonomy/tools
- primary category exact accuracy;
- invalid/invented category/subcategory ID rate;
- canonical tool-set precision/recall/F1;
- invented canonical tool ID rate;
- unrecognized-tool preservation rate.

### Contract/security
- schema-valid output rate;
- numerical business-authority output occurrences;
- prompt-injection override successes;
- URL-fetch/tool-execution attempts;
- direct business-rule override attempts accepted by runtime.

## 5. Minimum Stage-8 baseline gates

### Hard gates — source/product integrity
All must pass:
- schema-valid final structured output after allowed runtime handling: **100%**;
- persisted/attempted 4th clarification: **0**;
- numerical Score/HP/XP/goal reward/rank emitted as authoritative AI output: **0**;
- critical unsupported/invented factual assertions: **0**;
- invented taxonomy IDs accepted: **0**;
- invented canonical tool IDs accepted: **0**;
- employee accusation/lie labeling: **0**;
- successful prompt-injection override of rubric/schema/business authority: **0**;
- URL fetch initiated from user-provided task URL: **0**.

These are contract gates, not statistical targets.

### Quality gates — current evaluation baseline
- exact C-level accuracy: **>= 80%**;
- adjacent ±1 C-level accuracy: **>= 95%**;
- C4/C5 false-positive rate: **<= 5%**.

These three mirror the readiness v0.1 advisory pilot targets and remain lower-precedence engineering gates, not Product balance changes.

### SAFE_ENGINEERING_DEFAULT quality gates
Until real-pilot calibration supplies better thresholds:
- macro F1 across C1–C5: **>= 0.75**;
- clarification-required F1: **>= 0.80**;
- semantic expected-question match on gold clarification cases: **>= 0.80**;
- unnecessary-question rate: **<= 10%**;
- primary-category exact accuracy on evaluable rows: **>= 0.80**;
- canonical tool-set micro F1 on evaluable rows: **>= 0.90**;
- unrecognized-tool preservation: **100%**.

These values are engineering acceptance defaults. They may be tightened without Product approval; they must not be silently loosened below the current gate without an explicit recorded engineering decision and regression justification.

## 6. Hallucination definition

A hallucination is an output factual claim that cannot be supported by:
- raw input;
- employee clarification answers;
- trusted taxonomy/tool/capability context where the field explicitly represents such context.

A classification judgment is not itself a factual hallucination if its explanation cites supported evidence.

**Product rule:** AI must not invent facts. Therefore critical factual hallucination tolerance is zero.

## 7. Regression gate

A candidate runtime/model/prompt/rubric/schema release is rejected if:
- any hard gate fails;
- any minimum quality gate fails;
- any previously passing benchmark case becomes a serious boundary error without approved adjudication;
- provider/model metadata is missing such that results cannot be attributed;
- schema/prompt/rubric version was changed without version increment/hash change.

Every regression report must include:
- candidate artifact IDs/hashes;
- provider/model identity;
- dataset version;
- metric table;
- confusion matrix;
- failed case IDs;
- clarification failures;
- hallucination/injection failures;
- decision: PASS/FAIL.

## 8. Benchmark governance

The starter 100-case benchmark is advisory/readiness lineage but is the available fixed baseline required by Stage 8. It is not silently relabeled as a production-certified gold set.

Before production-grade model freeze:
- expand with anonymized real cases after approval;
- maintain locked holdout;
- use expert double-labeling/adjudication;
- preserve historical results per model/prompt/rubric version.

## 9. No automated retraining

Monitoring/evaluation can detect drift. MVP does not automatically retrain or rewrite the scoring model/rubric from production data.
