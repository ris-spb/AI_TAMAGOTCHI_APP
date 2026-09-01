# WEATHER PROVIDER INTERFACE

**Status:** optional / non-critical provider-neutral contract.

## 1. Product boundary

Weather may enrich ambient Saint Petersburg context only.

Allowed external weather context:
- temperature;
- precipitation / precipitation condition.

Other ambient inputs such as:
- season;
- time of day;
- day of week;
- official holidays

are deterministic/local application context and do not require the WeatherProvider.

News, politics and complex information search are explicitly outside the ambient integration.

## 2. Interface

```ts
type WeatherCondition =
  | "clear"
  | "cloudy"
  | "rain"
  | "snow"
  | "mixed"
  | "unknown";

type WeatherSnapshot = {
  locationKey: "saint_petersburg";
  observedAt: string;
  temperatureC: number | null;
  precipitation: WeatherCondition;
  providerKey: string;
  providerRequestId?: string | null;
};

type WeatherResult =
  | { kind: "available"; snapshot: WeatherSnapshot }
  | { kind: "unavailable"; reason: "no_provider" | "provider_failure" | "stale_or_invalid" };

interface WeatherProvider {
  readonly providerKey: string;
  getSaintPetersburgWeather(
    signal: AbortSignal
  ): Promise<
    | { ok: true; snapshot: WeatherSnapshot }
    | {
        ok: false;
        code:
          | "timeout"
          | "rate_limited"
          | "unavailable"
          | "invalid_response"
          | "configuration_error"
          | "permanent_provider_error";
        retryable: boolean;
      }
  >;
}
```

## 3. Runtime rules

- fixed application location key = Saint Petersburg;
- do not derive user geolocation;
- do not ask for device location permission;
- do not use weather as a business/game scoring input;
- weather may affect only optional ambient presentation/reaction selection;
- failed provider returns no weather context;
- a stale/invalid response is treated as unavailable, not fabricated;
- exact freshness interval is runtime configuration, not Product.

## 4. Cache

A rebuildable cache may be used to avoid unnecessary provider calls.

Cache:
- is non-authoritative;
- may hold only safe weather metadata;
- must not make Home unavailable when empty/expired;
- freshness TTL is configured later.

## 5. Provider call tracking

Weather calls may use existing `provider_call_attempts(provider_kind='weather')`.

No raw provider credential is stored in metadata.
