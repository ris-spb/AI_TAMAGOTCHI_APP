# OPEN INTEGRATION ITEMS

See `OPEN_INTEGRATION_ITEMS.csv` for the machine-readable register.

## Gate semantics

These open external values do **not** block Stage 13 because all provider boundaries have an interface and mock/null/safe no-provider path.

They **do** block claims that the corresponding real provider is production-connected.

## No owner decision now

No Product Owner choice is required to continue:
- weather can remain disabled;
- external notifications must remain disabled in MVP;
- object storage remains provider-neutral;
- Personnel/LLM/STT production vendor values remain external dependencies already isolated by Stage 8/9.
