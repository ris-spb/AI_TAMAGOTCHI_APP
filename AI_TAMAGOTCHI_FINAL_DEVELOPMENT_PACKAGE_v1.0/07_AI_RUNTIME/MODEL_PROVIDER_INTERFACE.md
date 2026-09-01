# MODEL PROVIDER INTERFACE

**Status:** provider-neutral contract; production vendor/model/endpoint/credential intentionally unresolved.

## 1. TypeScript-oriented interface

```ts
type ModelProviderErrorCode =
  | "timeout"
  | "rate_limited"
  | "transient_provider_error"
  | "provider_unavailable"
  | "invalid_structured_output"
  | "content_rejected"
  | "permanent_provider_error"
  | "cancelled"
  | "configuration_error";

interface ModelInvocationRequest<TContext = unknown> {
  operation: "task_assessment" | "goal_generation";
  promptBundleId: string;
  promptBundleHash: string;
  schemaId: string;
  schemaHash: string;
  rubricVersionId?: string;
  taxonomyVersionId?: string;
  capabilityKnowledgeVersionId?: string;
  trustedContext: TContext;
  untrustedUserData: {
    rawInput: string;
    clarificationAnswers: Array<{
      sequenceNo: 1 | 2 | 3;
      question: string;
      answer: string;
    }>;
  };
  timeoutMs: number; // supplied by runtime configuration
}

interface ModelInvocationMetadata {
  providerKey: string;
  modelIdentifier: string;
  modelVersion?: string | null;
  providerRequestId?: string | null;
  attemptNo: number;
  startedAt: string;
  finishedAt: string;
  latencyMs: number;
  finishReason?: string | null;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
  } | null;
}

interface ModelInvocationSuccess<T> {
  ok: true;
  output: T;
  metadata: ModelInvocationMetadata;
}

interface ModelInvocationFailure {
  ok: false;
  error: {
    code: ModelProviderErrorCode;
    retryable: boolean;
    safeDetail?: string;
  };
  metadata?: Partial<ModelInvocationMetadata>;
}

interface ModelProvider {
  readonly providerKey: string;
  invoke<T>(
    request: ModelInvocationRequest,
    outputSchema: unknown,
    abortSignal: AbortSignal
  ): Promise<ModelInvocationSuccess<T> | ModelInvocationFailure>;
}
```

## 2. Adapter obligations

Adapter must:
- support a timeout/abort signal;
- request structured output when provider capability exists;
- return raw provider content only to controlled parser/validator, never domain code;
- validate/normalize provider error classes;
- never expose credentials to domain or frontend;
- record provider/model/request metadata;
- never write domain tables;
- never calculate Score/HP/XP/goals;
- never fetch URLs contained in task input;
- avoid logging raw sensitive content by default.

## 3. Structured-output handling

1. send versioned prompt + trusted context + untrusted user data;
2. parse provider response;
3. validate against the operation schema;
4. if invalid, return `invalid_structured_output`;
5. an orchestrator may apply a **versioned, bounded** repair/retry strategy;
6. only schema-valid typed output reaches the AI domain service.

Do not silently coerce an illegal numerical score field away and continue. Unexpected business-authority fields are contract violations.

## 4. Retry/fallback ownership

Provider adapter classifies an error and indicates whether it is retryable.
Runtime configuration owns:
- timeout;
- max attempts;
- backoff;
- provider/model route;
- fallback route.

No vendor-specific values are frozen in Stage 8.

## 5. Mock provider

Development must include a deterministic mock implementing this interface. It should support fixtures for:
- successful assessment;
- clarification request;
- schema-invalid output;
- timeout;
- rate limit;
- transient 5xx;
- permanent failure;
- stale delayed response.

Mock fixtures are test infrastructure, not a substitute for benchmark/model evaluation.

## 6. Production open items

Still unknown and must not be invented:
- vendor/provider;
- model identifier/revision;
- endpoint/base URL;
- credentials;
- regional/data-processing conditions;
- provider-specific structured-output capability;
- provider-specific token/context limits;
- provider-specific SLA/rate limits;
- approved fallback chain.
