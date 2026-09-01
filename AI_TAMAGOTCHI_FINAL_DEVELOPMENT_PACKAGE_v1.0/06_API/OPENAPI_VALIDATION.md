# OPENAPI VALIDATION REPORT

**Result:** `PASS`

- PyYAML parse: **PASS**
- OpenAPI: **3.0.3**
- paths: **58**
- operations: **64**
- unique operationIds: **64/64 PASS**
- component schemas: **100**
- local `$ref` references resolved: **617 PASS**
- `additionalProperties: true`: **0**
- every core object schema explicitly strict: **PASS**
- per-operation auth/RBAC/scope/request/response/validation/errors/pagination/sort/filters/idempotency/retry/example metadata: **PASS**
- required-idempotency operations: **21**
- cursor-paginated operations: **14**
- DB refs resolve to Stage-5 tables/views: **PASS**
- templated path params exactly declared: **PASS**
- requirement `api_ref` classification: **294/294 PASS**
- P0 API classification: **274/274 PASS**
- direct endpoint-mapped requirements: **178**
- API-policy mapped: **51**
- intentionally N/A/out/presentation: **65**
- both traceability CSVs parse + artifact_tool inspect: **PASS**

No Redocly/third-party OpenAPI validator binary is installed in this runtime. CI must run the Stage-3 repo-pinned validator later; no fake external-lint PASS is claimed.
