# MOCK PERSONNEL PROVIDER SPEC

The mock is deterministic and contains synthetic identities only.

- supports `verifyIdentityPair` with exact fixture matching;
- returns the same discriminated statuses as real interface;
- can inject `unavailable` and `configuration_error` for tests;
- fixture snapshots may include synthetic directorate/provider keys;
- never contacts external network;
- never creates real-looking production credentials;
- does not assign application role/status/privacy;
- production startup must reject critical provider key `mock`.

Fixtures are test data, not source-of-truth employee records.
