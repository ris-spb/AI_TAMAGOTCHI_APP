# HEALTH CHECKS

Operational health is separate from the product OpenAPI.

`SAFE_ENGINEERING_DEFAULT` API endpoints:

```text
GET /health/live
GET /health/ready
```

They are operational endpoints, outside `/v1`.

## `/health/live`

Purpose:
- prove process/event loop is running.

Rules:
- no DB/provider dependency check;
- no secrets/config dump;
- no application version details beyond non-sensitive release ID if desired.

Expected:
- `200` when process is alive.

## `/health/ready`

Purpose:
- decide whether API instance can receive product traffic.

Required readiness:
- production configuration already validated;
- PostgreSQL reachable;
- Redis reachable when the active application configuration requires queue-backed operations;
- required local initialization complete.

Do **not** fail API readiness only because:
- Weather is unavailable;
- realtime 3D assets fail in browser;
- an external LLM/STT/Personnel provider is temporarily unavailable.

External provider outages are application dependency states, not reasons for orchestration restart loops.

The application must still return the typed dependency errors/degraded behavior defined by prior stages.

## Worker health

Provider-neutral worker health is satisfied by:
- process liveness;
- DB/Redis readiness;
- worker heartbeat/metric;
- queue consumption/backlog metrics.

A platform may implement this via:
- a local health endpoint;
- exec healthcheck;
- heartbeat side channel.

No specific orchestration system is required.

## Startup health gate

Before readiness becomes true:
- runtime config schema validates;
- environment production hard gates pass;
- required secret references resolve;
- game rules version matches approved release;
- migration compatibility check passes.

## Post-deploy smoke

Minimum:
- live/readiness healthy;
- unauthenticated public login verification endpoint reachable;
- protected endpoint rejects missing token;
- synthetic/authorized environment login flow where appropriate;
- one non-mutating authenticated API read;
- worker heartbeat;
- queue enqueues/consumes a synthetic environment-safe test job if the environment allows it.

Production smoke must never create fake employee/task business data unless an approved synthetic test identity exists.
