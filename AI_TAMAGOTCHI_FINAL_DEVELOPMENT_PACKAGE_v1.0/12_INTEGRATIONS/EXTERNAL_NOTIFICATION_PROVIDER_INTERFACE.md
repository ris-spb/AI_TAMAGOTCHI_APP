# EXTERNAL NOTIFICATION PROVIDER INTERFACE

**MVP status:** `FUTURE_DISABLED`  
**Current Product rule:** notifications are **in-app only**.

## 1. Stage-12 purpose

Architecture reserves a future external notification boundary so later push/email/Teams-like channels do not require domain redesign.

This interface is **not enabled in MVP**.

MVP notification source of truth:
- application `notifications` table;
- in-app notification API;
- unread indicator.

## 2. Future provider interface

```ts
type ExternalNotificationChannel = string;

type ExternalNotificationMessage = {
  recipientEmployeeId: string;
  templateKey: string;
  templateData: Record<string, string | number | boolean | null>;
  dedupeKey: string;
};

interface ExternalNotificationProvider {
  readonly providerKey: string;
  readonly channel: ExternalNotificationChannel;

  send(
    message: ExternalNotificationMessage,
    signal: AbortSignal
  ): Promise<
    | { ok: true; providerMessageId?: string | null }
    | {
        ok: false;
        code:
          | "timeout"
          | "rate_limited"
          | "unavailable"
          | "content_rejected"
          | "configuration_error"
          | "permanent_provider_error";
        retryable: boolean;
      }
  >;
}
```

## 3. MVP null provider

`NullExternalNotificationProvider`:
- performs no network call;
- reports channel disabled/not configured to infrastructure code;
- must not suppress creation of the in-app notification;
- must not create fake "delivered externally" state.

## 4. Future activation gate

A future external notification channel requires:
- explicit Product scope decision;
- provider/vendor contract;
- recipient addressing/source;
- privacy/security review;
- opt-out/consent rules where applicable;
- template/content governance;
- retry/deduplication policy;
- delivery-status semantics.

Stage 12 does not create a push/email/Teams MVP requirement.
