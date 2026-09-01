import { PrototypeApiError } from '../../mock-api/client';
import type { DataScenario } from '../../mock-api/contracts';
import type { PersonalDashboard } from '../employee-sections/contracts';
import type {
  AdminEmployee,
  AdminEmployeePatch,
  AuditPage,
  CalendarDay,
  CalendarPage,
  Directorate,
  DirectoratePage,
  DirectorDashboard,
  EmployeePage,
  ExecutiveDashboard,
  ExportAccepted,
  ExportCreateRequest,
  ExportStatusResponse,
  ScoringTrace,
  TaxonomyVersion,
  TaxonomyVersionList,
  Tool,
  ToolPage,
  UnrecognizedToolPage,
} from './contracts';

type DemoRoleHeader = 'Director' | 'Executive' | 'Admin';
type ApiErrorPayload = { code: string; message: string; trace_id: string; field_errors?: readonly { field: string; code: string; message: string }[] };

function addScenario(path: string, scenario: DataScenario): string {
  return `${path}${path.includes('?') ? '&' : '?'}scenario=${encodeURIComponent(scenario)}`;
}

async function requestJson<T>(path: string, role: DemoRoleHeader, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { 'X-Prototype-Role': role, ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    const payload = await response.json() as ApiErrorPayload;
    throw new PrototypeApiError(response.status, { code: payload.code as never, message: payload.message, trace_id: payload.trace_id, field_errors: payload.field_errors });
  }
  return response.json() as Promise<T>;
}

export const managementApi = {
  directorDashboard: (scenario: DataScenario, periodFrom = '', periodTo = '') => {
    const params = new URLSearchParams();
    if (periodFrom) params.set('period_from', periodFrom);
    if (periodTo) params.set('period_to', periodTo);
    return requestJson<DirectorDashboard>(addScenario(`/v1/director/dashboard${params.size ? `?${params}` : ''}`, scenario), 'Director');
  },
  directorEmployees: (scenario: DataScenario, search = '', sort = 'annual_score:desc') => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    return requestJson<EmployeePage>(addScenario(`/v1/director/employees?${params}`, scenario), 'Director');
  },
  directorEmployee: (employeeId: string, scenario: DataScenario) => requestJson<PersonalDashboard>(addScenario(`/v1/director/employees/${encodeURIComponent(employeeId)}`, scenario), 'Director'),
  executiveDashboard: (scenario: DataScenario, periodFrom = '', periodTo = '') => {
    const params = new URLSearchParams();
    if (periodFrom) params.set('period_from', periodFrom);
    if (periodTo) params.set('period_to', periodTo);
    return requestJson<ExecutiveDashboard>(addScenario(`/v1/executive/dashboard${params.size ? `?${params}` : ''}`, scenario), 'Executive');
  },
  executiveDirectorate: (directorateId: string, scenario: DataScenario, periodFrom = '', periodTo = '') => {
    const params = new URLSearchParams();
    if (periodFrom) params.set('period_from', periodFrom);
    if (periodTo) params.set('period_to', periodTo);
    return requestJson<DirectorDashboard>(addScenario(`/v1/executive/directorates/${encodeURIComponent(directorateId)}${params.size ? `?${params}` : ''}`, scenario), 'Executive');
  },
  executiveEmployee: (employeeId: string, scenario: DataScenario) => requestJson<PersonalDashboard>(addScenario(`/v1/executive/employees/${encodeURIComponent(employeeId)}`, scenario), 'Executive'),

  adminEmployees: (scenario: DataScenario, search = '') => requestJson<EmployeePage>(addScenario(`/v1/admin/employees${search ? `?search=${encodeURIComponent(search)}` : ''}`, scenario), 'Admin'),
  updateAdminEmployee: (employeeId: string, payload: AdminEmployeePatch) => requestJson<AdminEmployee>(`/v1/admin/employees/${encodeURIComponent(employeeId)}`, 'Admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  adminDirectorates: (scenario: DataScenario) => requestJson<DirectoratePage>(addScenario('/v1/admin/directorates', scenario), 'Admin'),
  createDirectorate: (name: string) => requestJson<Directorate>('/v1/admin/directorates', 'Admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-directorate-${name}` }, body: JSON.stringify({ name }) }),
  updateDirectorate: (directorateId: string, payload: Partial<Pick<Directorate, 'name' | 'director_employee_id' | 'active'>>) => requestJson<Directorate>(`/v1/admin/directorates/${encodeURIComponent(directorateId)}`, 'Admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  calendar: (scenario: DataScenario, from = '2026-09-01', to = '2026-09-30') => requestJson<CalendarPage>(addScenario(`/v1/admin/calendar?from=${from}&to=${to}`, scenario), 'Admin'),
  setCalendarDay: (date: string, is_working_day: boolean, reason: string) => requestJson<CalendarDay>(`/v1/admin/calendar/${encodeURIComponent(date)}`, 'Admin', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-calendar-${date}-${is_working_day}` }, body: JSON.stringify({ is_working_day, reason }) }),
  taxonomyVersions: (scenario: DataScenario) => requestJson<TaxonomyVersionList>(addScenario('/v1/admin/taxonomy/versions', scenario), 'Admin'),
  taxonomyVersion: (id: string, scenario: DataScenario) => requestJson<TaxonomyVersion>(addScenario(`/v1/admin/taxonomy/versions/${encodeURIComponent(id)}`, scenario), 'Admin'),
  createTaxonomyVersion: (version_code: string) => requestJson<TaxonomyVersion>('/v1/admin/taxonomy/versions', 'Admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-taxonomy-${version_code}` }, body: JSON.stringify({ version_code }) }),
  activateTaxonomyVersion: (id: string) => requestJson<TaxonomyVersion>(`/v1/admin/taxonomy/versions/${encodeURIComponent(id)}/activate`, 'Admin', { method: 'POST', headers: { 'Idempotency-Key': `prototype-stage7-taxonomy-activate-${id}` } }),
  createTaxonomyCategory: (versionId: string, name: string) => requestJson<{ category_id: string; name: string; active: boolean }>(`/v1/admin/taxonomy/versions/${encodeURIComponent(versionId)}/categories`, 'Admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-category-${name}` }, body: JSON.stringify({ name }) }),
  updateTaxonomyCategory: (versionId: string, categoryId: string, payload: { name?: string; active?: boolean }) => requestJson<{ category_id: string; name: string; active: boolean }>(`/v1/admin/taxonomy/versions/${encodeURIComponent(versionId)}/categories/${encodeURIComponent(categoryId)}`, 'Admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  createTaxonomySubcategory: (versionId: string, category_id: string, name: string) => requestJson<{ subcategory_id: string; category_id: string; name: string; active: boolean }>(`/v1/admin/taxonomy/versions/${encodeURIComponent(versionId)}/subcategories`, 'Admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-subcategory-${name}` }, body: JSON.stringify({ category_id, name }) }),
  updateTaxonomySubcategory: (versionId: string, subcategoryId: string, payload: { name?: string; active?: boolean }) => requestJson<{ subcategory_id: string; category_id: string; name: string; active: boolean }>(`/v1/admin/taxonomy/versions/${encodeURIComponent(versionId)}/subcategories/${encodeURIComponent(subcategoryId)}`, 'Admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  tools: (scenario: DataScenario, search = '') => requestJson<ToolPage>(addScenario(`/v1/admin/tools${search ? `?search=${encodeURIComponent(search)}` : ''}`, scenario), 'Admin'),
  unrecognizedTools: (scenario: DataScenario) => requestJson<UnrecognizedToolPage>(addScenario('/v1/admin/unrecognized-tools', scenario), 'Admin'),
  createTool: (payload: Pick<Tool, 'tool_name'> & Partial<Pick<Tool, 'provider' | 'tool_type' | 'aliases'>>) => requestJson<Tool>('/v1/admin/tools', 'Admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-tool-${payload.tool_name}` }, body: JSON.stringify(payload) }),
  updateTool: (toolId: string, payload: Partial<Omit<Tool, 'tool_id'>>) => requestJson<Tool>(`/v1/admin/tools/${encodeURIComponent(toolId)}`, 'Admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  audit: (scenario: DataScenario) => requestJson<AuditPage>(addScenario('/v1/admin/audit', scenario), 'Admin'),
  scoringTrace: (taskId: string, scenario: DataScenario) => requestJson<ScoringTrace>(addScenario(`/v1/admin/tasks/${encodeURIComponent(taskId)}/scoring-trace`, scenario), 'Admin'),

  createExport: (role: DemoRoleHeader, payload: ExportCreateRequest) => requestJson<ExportAccepted>('/v1/exports', role, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `prototype-stage7-export-${role}-${payload.export_type}-${payload.format}` }, body: JSON.stringify(payload) }),
  exportStatus: (role: DemoRoleHeader, exportId: string, scenario: DataScenario) => requestJson<ExportStatusResponse>(addScenario(`/v1/exports/${encodeURIComponent(exportId)}`, scenario), role),
  downloadExport: async (role: DemoRoleHeader, exportId: string) => {
    const response = await fetch(`/v1/exports/${encodeURIComponent(exportId)}/download`, { headers: { 'X-Prototype-Role': role } });
    if (!response.ok) {
      const payload = await response.json() as ApiErrorPayload;
      throw new PrototypeApiError(response.status, { code: payload.code as never, message: payload.message, trace_id: payload.trace_id, field_errors: payload.field_errors });
    }
    return response.text();
  },
};
