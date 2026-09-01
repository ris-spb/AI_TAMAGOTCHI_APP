# DEFINITION OF READY

A backlog item may enter a coding cycle only when all applicable conditions are true.

## Mandatory

1. Stable `IMP-*` backlog ID exists.
2. Stable requirement ID exists.
3. Current acceptance criterion is explicit.
4. Priority/scope bucket is explicit.
5. Owning work package/module is identified.
6. Work-package dependencies required for this item are satisfied or mocked by an approved provider contract.
7. Stage-15 test ID/evidence path exists.
8. Source file/section is identified.
9. Any feature flag/scope guard is explicit.
10. External dependency class is explicit.
11. No unresolved `HUMAN_DECISION_REQUIRED` changes the semantics of the item.
12. The item can be implemented without inventing provider endpoint/credential/final asset/business rule.

## API items

Additionally:
- operation/schema exists in final OpenAPI or an explicit contract-change procedure is required first;
- role/object scope is known;
- idempotency/retry behavior is known where applicable.

## DB items

Additionally:
- authoritative data owner is known;
- migration/constraint/index impact is described;
- history/audit/idempotency behavior is known;
- no destructive migration is hidden in application startup.

Current physical Stage-5 artifacts are a forensic package gap. Any coding cycle that requires exact canonical migration SQL must wait for/perform the approved source restoration rather than inventing historical Stage-5 files.

## AI/provider items

Additionally:
- provider-neutral interface/schema exists;
- deterministic mock scenario exists;
- model/provider does not gain business/game authority.

## Frontend items

Additionally:
- semantic screen/component state is known;
- API operation is known where data-backed;
- loading/empty/error/forbidden states are known;
- accessibility/visual contract is known.

## 3D/visual items

Additionally:
- runtime asset is approved/current or explicitly external with fallback;
- no proxy/fake production asset is required;
- functional fallback path is known.

## External evidence items

An implementation/gate item may be Ready even if real external evidence is missing, provided:
- interface/mock/fallback/gate behavior can be coded now;
- done condition clearly separates coding completion from production-evidence completion.

DoR is **not** satisfied by guessing the missing external value.
