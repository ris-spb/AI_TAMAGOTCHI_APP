# PROVIDER ERROR MODEL

**Version:** `provider-error-v1.0`

## 1. Normalized provider result

Provider adapters return typed application-level outcomes. Vendor-specific HTTP/status/error strings are normalized inside the adapter.

Common failure classes:

```ts
type ProviderFailureCode =
  | "timeout"
  | "rate_limited"
  | "unavailable"
  | "transient_provider_error"
  | "invalid_response"
  | "content_rejected"
  | "not_found"
  | "configuration_error"
  | "permanent_provider_error"
  | "cancelled";
```

Not every provider supports every code.

## 2. Retry classification

### Retryable when provider contract/config permits
- timeout;
- rate limit;
- transient network failure;
- provider 5xx/unavailable;
- temporary object-storage error.

### Not blindly retryable
- configuration error;
- invalid credentials;
- unsupported request;
- content rejection;
- semantic not-found/no-match;
- invalid response after bounded repair/validation;
- cancelled/stale operation.

Exact attempt count/backoff belongs to Stage 13/14/16 configuration/operations and is not invented here.

## 3. Provider failure isolation

| Provider | Failure effect |
|---|---|
| Personnel | login/sync operation fails safely; no guessed identity |
| LLM | processing run fails/retries; accepted raw input remains durable |
| STT | voice transcription fails; user may retry/use text; source audio lifecycle stays ephemeral |
| Weather | ambient weather context omitted; Home/game continues |
| Object Storage | export artifact fails/retries; interactive API remains available |
| External Notification | disabled in MVP; no effect |

## 4. Business transaction rule

An external call must not leave partially applied business effects.

Examples:
- LLM response is not Score until deterministic finalization commits;
- weather response never changes Score/HP/Goals;
- storage upload must complete before export is marked `completed`;
- notification external delivery cannot become the authoritative notification inbox.

## 5. Observability

For supported provider calls, record:
- provider kind;
- provider key;
- operation;
- status;
- related entity reference;
- provider request ID when available;
- correlation ID;
- safe request/response metadata;
- error code;
- started/finished timestamps.

Do not place:
- API keys;
- authorization headers;
- raw session token;
- raw employee phone;
- raw task text unless specifically required by an approved protected data contract.

Stage 14 owns detailed logging/redaction/metrics/alerting policy.
