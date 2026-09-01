import type { DataScenario } from '../../mock-api/contracts';
import type {
  AuthVerifyRequest,
  AuthVerifyResponse,
  GoalCycle,
  GoalSetupState,
  GoalSetupSubmitRequest,
  OnboardingCompleteRequest,
  OnboardingStatus,
} from './contracts';

async function parse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
  if (!response.ok) {
    const message = typeof payload === 'object' && payload && 'message' in payload ? String((payload as { message?: unknown }).message) : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload as T;
}

function scenarioQuery(scenario: DataScenario) {
  return `?scenario=${encodeURIComponent(scenario === 'loading' ? 'success' : scenario)}`;
}

export async function verifyPersonnel(request: AuthVerifyRequest, scenario: DataScenario): Promise<AuthVerifyResponse> {
  const response = await fetch(`/v1/auth/verify${scenarioQuery(scenario)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return parse<AuthVerifyResponse>(response);
}

export async function getOnboarding(scenario: DataScenario): Promise<OnboardingStatus> {
  const response = await fetch(`/v1/me/onboarding${scenarioQuery(scenario)}`);
  return parse<OnboardingStatus>(response);
}

export async function completeOnboarding(request: OnboardingCompleteRequest, idempotencyKey: string): Promise<OnboardingStatus> {
  const response = await fetch('/v1/me/onboarding/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(request),
  });
  return parse<OnboardingStatus>(response);
}

export async function getGoalSetup(scenario: DataScenario): Promise<GoalSetupState> {
  const response = await fetch(`/v1/goals/setup${scenarioQuery(scenario)}`);
  return parse<GoalSetupState>(response);
}

export async function submitGoalSetup(request: GoalSetupSubmitRequest, idempotencyKey: string): Promise<GoalCycle> {
  const response = await fetch('/v1/goals/setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(request),
  });
  return parse<GoalCycle>(response);
}
