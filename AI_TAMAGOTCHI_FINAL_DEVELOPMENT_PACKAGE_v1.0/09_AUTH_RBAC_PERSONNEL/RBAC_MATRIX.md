# RBAC MATRIX

The machine-readable authority table is `RBAC_MATRIX.csv` with **24 policies**.

Core rules: backend default-deny; employee self/owner scope; Director own-directorate management scope; Executive company analytical/detail scope; Admin company system-management scope; peer profile filtered by privacy; technical scoring trace Admin-only; exports role-scoped; **manual Complexity/Score override denied to every role**.

Role/status is application-managed and re-evaluated on each protected request. Personnel data does not grant app privileges.
