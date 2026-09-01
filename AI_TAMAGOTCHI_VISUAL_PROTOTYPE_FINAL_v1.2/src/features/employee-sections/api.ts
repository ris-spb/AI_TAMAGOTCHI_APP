import type { TaskAcceptedResponse, TaskEditRequest } from '../ai-case/contracts';
import { PrototypeApiError } from '../../mock-api/client';
import type { DataScenario } from '../../mock-api/contracts';
import type {
  Achievement,
  CompanyAnalytics,
  DirectorateCard,
  DirectorateLeaderboardItem,
  EmployeeLeaderboardItem,
  GoalCycle,
  HistoryEvent,
  MeResponse,
  NotificationItem,
  PersonalDashboard,
  PrivacyResponse,
  PublicProfile,
  ScoringInfo,
  TaskDetail,
  TaskSummary,
  TaskVersion,
  VacationState,
} from './contracts';

type Page<T> = { readonly items: readonly T[]; readonly next_cursor: string | null };
type EmployeeLeaderboardPage = Page<EmployeeLeaderboardItem> & { readonly own_rank: number | null };

type ApiErrorPayload = { code: string; message: string; trace_id: string; field_errors?: readonly { field: string; code: string; message: string }[] };

function scenarioParam(scenario: DataScenario): string {
  return `scenario=${encodeURIComponent(scenario)}`;
}

function addScenario(path: string, scenario: DataScenario): string {
  return `${path}${path.includes('?') ? '&' : '?'}${scenarioParam(scenario)}`;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) {
    const payload = await response.json() as ApiErrorPayload;
    throw new PrototypeApiError(response.status, {
      code: payload.code as never,
      message: payload.message,
      trace_id: payload.trace_id,
      field_errors: payload.field_errors,
    });
  }
  return response.json() as Promise<T>;
}

export const employeeApi = {
  historyTasks: (scenario: DataScenario, search = '', complexity = '') => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (complexity) params.append('complexity', complexity);
    return requestJson<Page<TaskSummary>>(addScenario(`/v1/history/tasks${params.size ? `?${params.toString()}` : ''}`, scenario));
  },
  historyEvents: (scenario: DataScenario) => requestJson<Page<HistoryEvent>>(addScenario('/v1/history/events', scenario)),
  taskDetail: (taskId: string, scenario: DataScenario) => requestJson<TaskDetail>(addScenario(`/v1/tasks/${encodeURIComponent(taskId)}`, scenario)),
  taskVersions: (taskId: string, scenario: DataScenario) => requestJson<Page<TaskVersion>>(addScenario(`/v1/tasks/${encodeURIComponent(taskId)}/versions`, scenario)),
  editTask: (taskId: string, payload: TaskEditRequest, idempotencyKey: string) => requestJson<TaskAcceptedResponse>(`/v1/tasks/${encodeURIComponent(taskId)}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(payload),
  }),
  deleteTask: async (taskId: string, idempotencyKey: string) => {
    const response = await fetch(`/v1/tasks/${encodeURIComponent(taskId)}`, { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey } });
    if (!response.ok) {
      const payload = await response.json() as ApiErrorPayload;
      throw new PrototypeApiError(response.status, { code: payload.code as never, message: payload.message, trace_id: payload.trace_id, field_errors: payload.field_errors });
    }
  },
  goalsCurrent: (scenario: DataScenario) => requestJson<GoalCycle>(addScenario('/v1/goals/current', scenario)),
  goalsHistory: (scenario: DataScenario) => requestJson<Page<GoalCycle>>(addScenario('/v1/goals/history', scenario)),
  employeeRating: (scenario: DataScenario, search = '', directorateId = '') => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (directorateId) params.set('directorate_id', directorateId);
    return requestJson<EmployeeLeaderboardPage>(addScenario(`/v1/ratings/employees${params.size ? `?${params.toString()}` : ''}`, scenario));
  },
  directorateRating: (scenario: DataScenario, sort = 'rank:asc') => requestJson<Page<DirectorateLeaderboardItem>>(addScenario(`/v1/ratings/directorates?sort=${encodeURIComponent(sort)}`, scenario)),
  companyAnalytics: (scenario: DataScenario, periodFrom: string, periodTo: string) => requestJson<CompanyAnalytics>(addScenario(`/v1/analytics/company?period_from=${encodeURIComponent(periodFrom)}&period_to=${encodeURIComponent(periodTo)}`, scenario)),
  directorateCard: (directorateId: string, scenario: DataScenario) => requestJson<DirectorateCard>(addScenario(`/v1/directorates/${encodeURIComponent(directorateId)}`, scenario)),
  publicProfile: (employeeId: string, scenario: DataScenario) => requestJson<PublicProfile>(addScenario(`/v1/profiles/${encodeURIComponent(employeeId)}`, scenario)),
  me: (scenario: DataScenario) => requestJson<MeResponse>(addScenario('/v1/me', scenario)),
  dashboard: (scenario: DataScenario) => requestJson<PersonalDashboard>(addScenario('/v1/me/dashboard', scenario)),
  achievements: (scenario: DataScenario) => requestJson<Page<Achievement>>(addScenario('/v1/me/achievements', scenario)),
  scoring: (scenario: DataScenario) => requestJson<ScoringInfo>(addScenario('/v1/scoring-info', scenario)),
  notifications: (scenario: DataScenario) => requestJson<Page<NotificationItem>>(addScenario('/v1/notifications', scenario)),
  updatePrivacy: (privacy_level: PrivacyResponse['privacy_level']) => requestJson<PrivacyResponse>('/v1/me/privacy', {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ privacy_level }),
  }),
  setVacation: (enabled: boolean, idempotencyKey: string) => requestJson<VacationState>('/v1/me/vacation', {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ enabled }),
  }),
  markNotificationRead: async (notificationId: string) => {
    const response = await fetch(`/v1/notifications/${encodeURIComponent(notificationId)}/read`, { method: 'POST' });
    if (!response.ok) {
      const payload = await response.json() as ApiErrorPayload;
      throw new PrototypeApiError(response.status, { code: payload.code as never, message: payload.message, trace_id: payload.trace_id, field_errors: payload.field_errors });
    }
  },
};
