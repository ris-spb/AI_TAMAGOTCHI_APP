# PERSONNEL SYNC MODEL

Personnel synchronization updates only provider-owned identity/org projection; it never grants app authorization.

## Reconciliation

For a matched identity:
- resolve existing link by supplied stable provider key when available, otherwise use the verified pair under adapter contract;
- update provider-owned display/phone/current directorate fields;
- append directorate history when organization changes;
- do not rewrite historical task/score directorate attribution;
- preserve app role, account status, privacy and profile-hidden state;
- audit security-relevant projection changes.

## Optional background sync

Background sync is disabled until the real provider exposes a documented capability. If enabled later, it must be idempotent, checkpointed and safe against partial provider outages. Production cadence/SLA are external values.

## Deprovisioning

Provider disappearance does not silently hard-delete application history. Exact HR termination/deprovisioning authority is external; app account status remains explicit and auditable. Blocking/termination revokes active sessions.
