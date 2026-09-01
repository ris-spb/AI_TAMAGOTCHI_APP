# DEBUGGING POLICY

1. Reproduce the smallest deterministic failing test.
2. Classify: contract ambiguity, code defect, test defect, migration/data defect, provider/external dependency, environment.
3. Read the owning current package contracts.
4. Fix the smallest responsible layer.
5. Add/retain regression test.
6. Run affected test + full stage gate.
7. Report cause/fix/risk.

Forbidden: skip failed P0; change game constants to fit bug; weaken RBAC; fake provider success; swallow errors as success; ad-hoc destructive DB edits; delete audit/history; auto-update Golden to hide regression; rename proxy GLB as final; unbounded retries; hide failing evidence.

If source package cannot resolve product semantics, stop affected stage and report `HUMAN_DECISION_REQUIRED`/`BLOCKED`. Reversible non-product details may use documented `SAFE_ENGINEERING_DEFAULT`.

For external gaps, complete interface/mock/fallback/gate and keep real evidence open. For AI use deterministic mocks for core CI; real-model evaluation is separate. For visual/3D validate fallback first and never invent measured hardware evidence.
