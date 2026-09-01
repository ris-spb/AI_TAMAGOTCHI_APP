# INTEGRATION CONFIG KEY CONTRACT

**Purpose:** define key names/meaning only.  
**Values and `.env.example` belong to Stage 13.**  
**No real secret values are stored here.**

## Common provider routing

```text
INTEGRATIONS_PERSONNEL_PROVIDER_KEY
INTEGRATIONS_LLM_PROVIDER_KEY
INTEGRATIONS_STT_PROVIDER_KEY
INTEGRATIONS_WEATHER_ENABLED
INTEGRATIONS_WEATHER_PROVIDER_KEY
INTEGRATIONS_OBJECT_STORAGE_PROVIDER_KEY
INTEGRATIONS_EXTERNAL_NOTIFICATIONS_ENABLED
```

## Weather config slots

```text
WEATHER_BASE_URL
WEATHER_CREDENTIAL_REF
WEATHER_LOCATION_KEY
WEATHER_TIMEOUT_MS
WEATHER_CACHE_TTL_SECONDS
```

Rules:
- `INTEGRATIONS_WEATHER_ENABLED=false` is a valid safe path;
- no real weather value is frozen here;
- location contract remains Saint Petersburg.

## Object storage config slots

```text
OBJECT_STORAGE_ENDPOINT
OBJECT_STORAGE_REGION
OBJECT_STORAGE_BUCKET
OBJECT_STORAGE_CREDENTIAL_REF
OBJECT_STORAGE_PREFIX_EXPORTS
OBJECT_STORAGE_TIMEOUT_MS
EXPORT_ARTIFACT_TTL_SECONDS
```

Rules:
- no production bucket/endpoint is selected;
- credential ref is a secret-manager reference/slot, not the secret itself;
- Stage 13/14/16 freeze lifecycle and timeout values.

## Future external notifications

```text
INTEGRATIONS_EXTERNAL_NOTIFICATIONS_ENABLED=false
EXTERNAL_NOTIFICATION_PROVIDER_KEY
EXTERNAL_NOTIFICATION_BASE_URL
EXTERNAL_NOTIFICATION_CREDENTIAL_REF
```

MVP invariant:
`INTEGRATIONS_EXTERNAL_NOTIFICATIONS_ENABLED` must remain false unless a later Product scope decision explicitly enables an external channel.

## Existing provider config ownership

Personnel/LLM/STT exact config slots will be consolidated by Stage 13 using their Stage-8/9 open contracts.

Stage 12 does not duplicate or invent their production values.
