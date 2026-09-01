# FETCHING & API CLIENT CONTRACT

## 1. Source

Generate the frontend client from:

`06_API/openapi_final_v1.yaml`

Do not maintain a divergent handwritten endpoint schema.

Recommended Stage-3 stack:
- `openapi-typescript`;
- thin `openapi-fetch` wrapper;
- TanStack Query adapters/hooks.

## 2. Client layers

```text
generated OpenAPI types
→ transport client
→ auth/session interceptor
→ typed error normalization
→ query/mutation functions
→ feature hooks
→ screens
```

Feature code must not use arbitrary `fetch()` for final application endpoints unless the call is still routed through the same auth/error/trace policy.

## 3. Trace/correlation

If backend returns a trace/correlation identifier in the error model:
- preserve it in normalized error;
- show only where useful for support;
- do not expose sensitive internals.

## 4. Retry rules

Read/poll retry follows each OpenAPI operation's `x-retry` semantics.

Stage 10 does **not** invent a universal numeric retry count.

### Reads
`safe_read`:
- retry only under configured transport policy;
- stop on semantic 4xx.

`safe_read_polling`:
- poll while the server state remains processing/pending;
- stop on terminal state;
- pause/reduce work when page is not active where implementation permits;
- exact interval/backoff belongs to runtime configuration, not Product.

### Mutations
No blind automatic mutation replay.

For an idempotency-required command:
- create an intent-scoped idempotency key;
- preserve the key across retry of the **same intent/body**;
- a materially changed form submission is a new intent/key;
- honor `409 IDEMPOTENCY_KEY_REUSED`.

For versioned edit/delete:
- send expected version;
- on conflict, refetch current server state;
- never silently overwrite.

## 5. Error-to-UI mapping

| HTTP / error family | Frontend behavior |
|---|---|
| 400/422 validation | field/global validation; preserve draft |
| 401 | clear invalid session view; require authentication |
| 403 | permission/access-denied state; no data leak |
| 404 | missing/not-available state without object enumeration assumptions |
| 409 conflict/version/idempotency | conflict feedback + safe refetch/reconcile |
| 429 | non-destructive throttled feedback; retry later |
| 500 | technical error; safe retry where operation permits |
| 503 dependency unavailable | dependency/network-like recovery state; do not fake success |

## 6. Loading semantics

Do not replace whole screens with spinner-only UI when:
- existing safe data can remain visible;
- navigation remains functional;
- 3D is the only pending dependency.

Use state-specific loading defined by current `Screen_State_Matrix.xlsx`.

## 7. Pagination/filter/sort

Use Stage-6 API contract:
- opaque cursor;
- API-defined filters;
- API-defined sort;
- page size constraints from API.

Frontend must not create an arbitrary SQL-like filtering language.

## 8. Cache safety

Service worker must not cache authenticated API responses as a generic offline database.

In-memory Query cache is a client optimization, not the business source of truth.

## 9. Cancellation

Cancel/ignore stale requests when:
- route changes;
- filter request is superseded;
- component unmounts;
- a newer request owns the current view.

Provider/business side-effects already accepted by backend are not cancelled by hiding the screen.
