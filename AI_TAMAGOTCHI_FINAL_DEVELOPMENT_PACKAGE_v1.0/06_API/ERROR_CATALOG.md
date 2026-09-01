# ERROR CATALOG

All JSON errors use `ErrorResponse`:
`code`, `message`, `trace_id`, `field_errors[]`.

| Code | Typical HTTP | Meaning |
|---|---:|---|
| VALIDATION_ERROR | 400 | Structural/query/body validation failed. |
| AUTH_REQUIRED | 401 | Protected endpoint without valid session. |
| AUTH_VERIFICATION_FAILED | 401 | Personnel number + phone verification failed. |
| ACCOUNT_BLOCKED | 403 | Verified user cannot access application. |
| FORBIDDEN | 403 | Role lacks operation access. |
| OBJECT_SCOPE_FORBIDDEN | 403 | Resource is outside role/object scope. |
| NOT_FOUND | 404 | Resource not available in authorized scope. |
| CONFLICT | 409 | Generic state conflict. |
| IDEMPOTENCY_KEY_REUSED | 409 | Same key, different material request. |
| VERSION_CONFLICT | 409 | Stale expected version. |
| INVALID_CURSOR | 400 | Cursor invalid for endpoint/filter state. |
| GOAL_SETUP_REQUIRED | 409 | Main flow gated by required goal setup. |
| GOAL_SETUP_NOT_REQUIRED | 409 | No current setup required. |
| GOAL_SELECTION_INVALID | 422 | Not exactly two valid current options. |
| CLARIFICATION_NOT_PENDING | 409 | Answer does not target current pending clarification. |
| CLARIFICATION_LIMIT_REACHED | 422 | Backend clarification cap already reached. |
| PROCESSING_NOT_READY | 422 | Result requested before assessment completion. |
| PROCESSING_FAILED | 422 | Current processing reached terminal failure. |
| TASK_DELETED | 409 | Requested mutation conflicts with deleted state. |
| DEPENDENCY_UNAVAILABLE | 503 | Required Personnel/LLM/STT/storage/infrastructure unavailable. |
| RATE_LIMITED | 429 | Rate/abuse limit. |
| EXPORT_NOT_READY | 409 | Export binary is not ready. |
| EXPORT_EXPIRED | 409 | Export binary unavailable/expired; source data remains. |
| INTERNAL_ERROR | 500 | Unexpected server error. |

Provider-native errors are never a frontend contract. They are mapped to stable API codes.
No stack trace, SQL text, secret or provider credential is returned.
