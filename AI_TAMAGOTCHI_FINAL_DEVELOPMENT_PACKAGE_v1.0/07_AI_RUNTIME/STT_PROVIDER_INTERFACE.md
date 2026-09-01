# STT PROVIDER INTERFACE

**Status:** provider-neutral contract; production STT vendor/model/endpoint/credential unresolved.

## 1. Product flow

`record → STT → transcript preview → employee correction → submit`

The AI-case assessment receives the **employee-confirmed transcript**, not the source audio.

## 2. TypeScript-oriented interface

```ts
interface SttTranscriptionRequest {
  mediaType: string;
  localeHint?: string | null;
  audio: AsyncIterable<Uint8Array>;
  timeoutMs: number;
}

interface SttTranscriptionSuccess {
  ok: true;
  transcript: string;
  providerKey: string;
  modelIdentifier: string;
  modelVersion?: string | null;
  providerRequestId?: string | null;
  startedAt: string;
  finishedAt: string;
  latencyMs: number;
}

interface SttTranscriptionFailure {
  ok: false;
  code:
    | "timeout"
    | "rate_limited"
    | "provider_unavailable"
    | "unsupported_audio"
    | "content_rejected"
    | "permanent_provider_error"
    | "configuration_error";
  retryable: boolean;
}

interface SttProvider {
  readonly providerKey: string;
  transcribe(
    request: SttTranscriptionRequest,
    abortSignal: AbortSignal
  ): Promise<SttTranscriptionSuccess | SttTranscriptionFailure>;
}
```

## 3. Audio lifecycle

- source audio is transient processing material only;
- it must not become a task attachment;
- it must not be retained after successful or failed transcription workflow;
- if an adapter/provider requires temporary buffering, storage must be ephemeral and deleted by controlled cleanup;
- database stores transcript/provider metadata required by the product, not the audio payload.

Exact temporary-storage mechanism is Stage 12–14 implementation policy.

## 4. Failure behavior

On STT failure:
- preserve no source audio beyond the controlled transient lifecycle;
- offer safe retry while audio is still in the active client/session flow when technically possible;
- always allow text fallback;
- do not create an AI-case until the employee submits a transcript/text;
- downstream LLM must never be called with an unconfirmed partial transcript as if it were final user input.

## 5. Production open items

Not frozen:
- provider;
- model;
- endpoint;
- credential;
- supported codecs/size limits;
- timeout/retry values;
- language-detection policy;
- corporate data-transfer approval.
