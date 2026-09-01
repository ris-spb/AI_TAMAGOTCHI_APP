# MOCK WEATHER PROVIDER

Deterministic development/test implementation.

## Required synthetic fixtures

- `WEATHER_CLEAR`
- `WEATHER_CLOUDY`
- `WEATHER_RAIN`
- `WEATHER_SNOW`
- `WEATHER_UNKNOWN`
- `WEATHER_TIMEOUT`
- `WEATHER_RATE_LIMITED`
- `WEATHER_UNAVAILABLE`
- `WEATHER_INVALID_RESPONSE`

Example synthetic values may be used in test fixtures, but they must be explicitly labelled synthetic and must never be represented as current Saint Petersburg weather.

## Contract tests

Verify:
- valid snapshot normalization;
- optional temperature;
- allowed precipitation enum;
- no geolocation/user-location input;
- failure returns no ambient weather instead of Home failure;
- provider metadata contains no secrets.
