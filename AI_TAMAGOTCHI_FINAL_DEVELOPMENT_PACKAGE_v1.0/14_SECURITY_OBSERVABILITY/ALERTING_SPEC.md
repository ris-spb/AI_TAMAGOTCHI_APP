# ALERTING SPEC

Mandatory alert domains: error rate, latency and queue backlog (PRD‑NFR‑006), plus provider/DB, auth abuse, backup/restore, export, release-secret and production-config integrity.

`ALERT_CATALOG.csv` defines **20** alert classes. Exact numeric thresholds/windows, paging routes and operations ownership are production configuration and are deliberately not fabricated. Where Product provides a target (core Home/Rating/Dashboard p95 < 2s under normal load), alert evaluation still requires a defined normal-load profile.
