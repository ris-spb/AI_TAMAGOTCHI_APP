# MOCK OBJECT STORAGE PROVIDER

Development/test implementation with deterministic local behavior.

## Allowed implementations

A local in-memory or local filesystem/object-store emulator may implement the provider interface.

It must remain behind `ObjectStorageProvider`.

No local implementation path becomes a production-storage mandate.

## Required scenarios

- `PUT_SUCCESS`
- `GET_SUCCESS`
- `DELETE_SUCCESS`
- `OBJECT_NOT_FOUND`
- `PUT_TIMEOUT`
- `GET_TIMEOUT`
- `STORAGE_UNAVAILABLE`
- `CHECKSUM_MISMATCH`
- `STALE_OR_EXPIRED_EXPORT_OBJECT`

## Safety

Synthetic/local stored objects must:
- use non-production test data;
- not include real employee data in committed repository fixtures;
- be cleaned between contract-test runs;
- prove binary streaming and checksum semantics.

## Contract tests

Verify:
- put/get round trip;
- content type;
- size;
- SHA-256;
- not-found normalization;
- delete idempotency;
- provider error normalization;
- export completion only after successful put.
