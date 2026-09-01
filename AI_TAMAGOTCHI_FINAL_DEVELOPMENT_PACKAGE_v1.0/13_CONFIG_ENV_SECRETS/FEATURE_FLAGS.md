# FEATURE FLAGS — MVP BASELINE

- total: **33**
- runtime/dependency: **14**
- HARD_DISABLED_MVP: **19**
- every HARD_DISABLED_MVP flag is locked `false`.

Production startup must reject a hard-disabled MVP flag set to `true`.

Feature flags cannot override business/security invariants.
