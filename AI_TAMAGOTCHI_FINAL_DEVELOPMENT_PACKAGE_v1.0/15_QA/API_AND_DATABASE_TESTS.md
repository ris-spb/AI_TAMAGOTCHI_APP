# API & DATABASE TESTS

## API

Every final operation must test:
- positive schema;
- typed errors;
- authn negative when protected;
- role/object authz negative when protected;
- idempotency when required;
- filters/pagination/sort where applicable.

See `API_TEST_MATRIX.csv`.

## Database

Testcontainers PostgreSQL:
- migration from empty DB;
- enum/range/FK/unique constraints;
- task versioning;
- soft delete/history;
- append-only ledger corrections/reversals;
- no negative Evolution XP;
- audit + mutation atomicity;
- outbox/inbox/idempotency;
- directorate history;
- session hash/expiry/revocation;
- provider metadata secret minimization.

Redis/BullMQ is never recovery truth.
