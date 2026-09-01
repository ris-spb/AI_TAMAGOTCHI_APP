# METRICS SPEC

OpenTelemetry-compatible metrics; labels are bounded enumerations/route templates only. No phone, raw personnel number, task text, URL, prompt, transcript, token, request id or employee UUID as high-cardinality metric labels.

`METRICS_CATALOG.csv` defines **34** metrics across HTTP/auth/task/provider/queue/DB/export/backup/security/client boundaries. Product target for basic Home/Rating/Dashboard data remains p95 < 2s at normal load; the normal-load volume profile is not invented here.
