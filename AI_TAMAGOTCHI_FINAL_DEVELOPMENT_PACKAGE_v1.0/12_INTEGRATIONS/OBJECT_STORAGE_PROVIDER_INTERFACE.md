# OBJECT STORAGE PROVIDER INTERFACE

**Status:** provider-neutral infrastructure contract.  
**Primary MVP use:** generated XLSX/CSV export artifacts.

## 1. Product boundary

Object storage is **not** a user task-attachment feature.

Allowed Stage-12 use:
- generated export artifacts;
- optionally externalized runtime/static files when deployment architecture explicitly needs it.

Task file attachments remain out of MVP.

## 2. Interface

```ts
type StoredObjectDescriptor = {
  objectKey: string;
  contentType: string;
  sizeBytes: number;
  sha256: string;
  createdAt: string;
};

type ObjectStorageFailureCode =
  | "timeout"
  | "rate_limited"
  | "unavailable"
  | "not_found"
  | "invalid_response"
  | "configuration_error"
  | "permanent_provider_error";

interface ObjectStorageProvider {
  readonly providerKey: string;

  putObject(input: {
    objectKey: string;
    contentType: string;
    contentLength?: number | null;
    body: AsyncIterable<Uint8Array>;
    sha256Expected?: string | null;
  }, signal: AbortSignal): Promise<
    | { ok: true; object: StoredObjectDescriptor }
    | { ok: false; code: ObjectStorageFailureCode; retryable: boolean }
  >;

  getObject(input: {
    objectKey: string;
  }, signal: AbortSignal): Promise<
    | {
        ok: true;
        contentType: string;
        contentLength?: number | null;
        body: AsyncIterable<Uint8Array>;
      }
    | { ok: false; code: ObjectStorageFailureCode; retryable: boolean }
  >;

  deleteObject(input: {
    objectKey: string;
  }, signal: AbortSignal): Promise<
    | { ok: true; deleted: true | false }
    | { ok: false; code: ObjectStorageFailureCode; retryable: boolean }
  >;
}
```

## 3. Export workflow

1. export request is persisted/authorized;
2. async worker generates XLSX/CSV;
3. worker computes content SHA-256 while streaming;
4. worker uploads through `ObjectStorageProvider`;
5. only after successful upload, persist:
   - `object_storage_key`;
   - file name;
   - content type;
   - size;
   - completed status;
   - checksum metadata supported by current API/data contract;
6. `GET /v1/exports/{exportId}/download` re-authorizes;
7. backend streams object to the caller or uses an equivalent secure server-controlled delivery pattern;
8. if object is missing/expired, do not fabricate success.

Current final API returns binary export; Stage 12 does not replace it with a public direct-storage URL.

## 4. Object-key rules

Object keys:
- are opaque infrastructure references;
- must not embed raw phone number/raw task input/session token;
- should use stable safe identifiers such as export request ID;
- are not user-facing authorization tokens.

Exact bucket/container/prefix is Stage-13 configuration.

## 5. Integrity

On upload:
- calculate SHA-256 in application/worker or use a provider-confirmed verified equivalent;
- persist the application-trusted checksum required by export status API;
- reject mismatch when expected checksum is supplied.

Provider-specific ETag is not assumed to be SHA-256.

## 6. Download authorization

Storage possession does not grant product access.

Every export download:
- authenticates actor;
- re-authorizes current scope;
- checks export completed/not expired;
- obtains storage object only after authorization.

Do not expose long-lived public object URLs.

## 7. Failure isolation

Storage failure:
- marks/retries export flow according to job policy;
- never blocks unrelated interactive application operations;
- does not partially mark export `completed`;
- does not change task/business data.

## 8. Deletion/expiry

Product does not freeze generated-export retention duration.

Stage 12 therefore does not invent a retention TTL.

Stage 13/14/16 must configure:
- export expiry;
- cleanup schedule;
- storage lifecycle if used.

Historical task/audit retention is independent from generated export-file retention.
