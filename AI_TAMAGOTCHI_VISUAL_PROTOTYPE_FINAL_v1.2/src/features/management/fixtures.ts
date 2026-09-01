import { DIRECTORATE_IDS, employeeLeaderboard, directorateLeaderboard, personalDashboard } from '../employee-sections/fixtures';
import type { AdminEmployee, AuditEvent, CalendarDay, Directorate, DirectorDashboard, ExecutiveDashboard, ScoringTrace, TaxonomyVersion, Tool, UnrecognizedTool } from './contracts';

export const MANAGEMENT_EMPLOYEE_IDS = {
  director: '71000000-0000-4000-8000-000000000001',
  executive: '71000000-0000-4000-8000-000000000002',
  admin: '71000000-0000-4000-8000-000000000003',
} as const;

export const directorDashboard: DirectorDashboard = {
  directorate_id: DIRECTORATE_IDS.commercial,
  authorized_headcount: 32,
  total_score: 6298,
  average_score: 196.8,
  rank: 2,
  task_count: 337,
  employees: employeeLeaderboard.filter((item) => item.directorate_id === DIRECTORATE_IDS.commercial),
};

export const executiveDashboard: ExecutiveDashboard = {
  authorized_headcount: 118,
  task_count: 1264,
  average_score_per_employee: 184.6,
  directorates: directorateLeaderboard,
};

export const adminEmployees: readonly AdminEmployee[] = [
  { employee_id: MANAGEMENT_EMPLOYEE_IDS.director, personnel_number: 'D-1001', full_name: 'Алексей Ветров', phone: '+7 900 000-10-01', directorate_id: DIRECTORATE_IDS.commercial, role: 'director', account_status: 'active', profile_hidden: false, privacy_level: 'standard' },
  { employee_id: MANAGEMENT_EMPLOYEE_IDS.executive, personnel_number: 'E-1001', full_name: 'Елена Демонстрационная', phone: '+7 900 000-10-02', directorate_id: DIRECTORATE_IDS.operations, role: 'executive', account_status: 'active', profile_hidden: false, privacy_level: 'closed' },
  { employee_id: MANAGEMENT_EMPLOYEE_IDS.admin, personnel_number: 'A-1001', full_name: 'Системный Администратор', phone: '+7 900 000-10-03', directorate_id: DIRECTORATE_IDS.digital, role: 'admin', account_status: 'active', profile_hidden: true, privacy_level: 'closed' },
  { employee_id: employeeLeaderboard[0]!.employee_id, personnel_number: 'EMP-1011', full_name: employeeLeaderboard[0]!.full_name, phone: '+7 900 000-20-11', directorate_id: DIRECTORATE_IDS.digital, role: 'employee', account_status: 'active', profile_hidden: false, privacy_level: 'closed' },
  { employee_id: employeeLeaderboard[1]!.employee_id, personnel_number: 'EMP-1012', full_name: employeeLeaderboard[1]!.full_name, phone: '+7 900 000-20-12', directorate_id: DIRECTORATE_IDS.commercial, role: 'employee', account_status: 'active', profile_hidden: false, privacy_level: 'standard' },
  { employee_id: employeeLeaderboard[3]!.employee_id, personnel_number: 'EMP-1018', full_name: employeeLeaderboard[3]!.full_name, phone: '+7 900 000-20-18', directorate_id: DIRECTORATE_IDS.commercial, role: 'employee', account_status: 'active', profile_hidden: false, privacy_level: 'standard' },
  { employee_id: employeeLeaderboard[2]!.employee_id, personnel_number: 'EMP-1013', full_name: employeeLeaderboard[2]!.full_name, phone: '+7 900 000-20-13', directorate_id: DIRECTORATE_IDS.finance, role: 'employee', account_status: 'blocked', profile_hidden: false, privacy_level: 'open' },
];

export const adminDirectorates: readonly Directorate[] = directorateLeaderboard.map((item, index) => ({
  directorate_id: item.directorate_id,
  name: item.name,
  director_employee_id: index === 1 ? MANAGEMENT_EMPLOYEE_IDS.director : null,
  active: true,
}));

export const calendarDays: readonly CalendarDay[] = [
  { date: '2026-09-01', is_working_day: true, reason: 'Working day' },
  { date: '2026-09-05', is_working_day: false, reason: 'Weekend' },
  { date: '2026-09-06', is_working_day: false, reason: 'Weekend' },
  { date: '2026-09-14', is_working_day: false, reason: 'Corporate day · DEMO' },
];

export const taxonomyVersions: readonly TaxonomyVersion[] = [
  {
    taxonomy_version_id: '72000000-0000-4000-8000-000000000001', version_code: '1.0', status: 'active',
    categories: [
      { category_id: '72100000-0000-4000-8000-000000000001', name: 'Аналитика и работа с данными', active: true },
      { category_id: '72100000-0000-4000-8000-000000000002', name: 'Research / поиск информации', active: true },
      { category_id: '72100000-0000-4000-8000-000000000003', name: 'Автоматизация и workflows', active: true },
    ],
    subcategories: [
      { subcategory_id: '72200000-0000-4000-8000-000000000001', category_id: '72100000-0000-4000-8000-000000000001', name: 'Анализ таблиц и массивов данных', active: true },
      { subcategory_id: '72200000-0000-4000-8000-000000000002', category_id: '72100000-0000-4000-8000-000000000002', name: 'Market / desk research', active: true },
      { subcategory_id: '72200000-0000-4000-8000-000000000003', category_id: '72100000-0000-4000-8000-000000000003', name: 'Reusable workflow', active: true },
    ],
  },
  { taxonomy_version_id: '72000000-0000-4000-8000-000000000002', version_code: '1.1-draft', status: 'draft', categories: [], subcategories: [] },
];

export const tools: readonly Tool[] = [
  { tool_id: '73000000-0000-4000-8000-000000000001', tool_name: 'ChatGPT', provider: 'OpenAI', tool_type: 'general-purpose assistant', active: true, aliases: ['chat gpt'] },
  { tool_id: '73000000-0000-4000-8000-000000000002', tool_name: 'Perplexity', provider: 'Perplexity AI', tool_type: 'AI search/research', active: true, aliases: ['perplexity ai'] },
  { tool_id: '73000000-0000-4000-8000-000000000003', tool_name: 'n8n', provider: 'n8n', tool_type: 'automation/orchestration', active: true, aliases: [] },
];

export const unrecognizedTools: readonly UnrecognizedTool[] = [
  { name: 'Demo AI Tool', task_count: 3, last_seen_at: '2026-08-31T14:20:00.000Z' },
];

export const auditEvents: readonly AuditEvent[] = [
  { audit_id: '74000000-0000-4000-8000-000000000001', actor_type: 'admin', actor_id: MANAGEMENT_EMPLOYEE_IDS.admin, action: 'employee.update', entity_type: 'employee', entity_id: adminEmployees[4]!.employee_id, changes: [{ field: 'account_status', old_value: 'active', new_value: 'blocked' }], reason: 'DEMO audit event', created_at: '2026-09-01T07:40:00.000Z' },
  { audit_id: '74000000-0000-4000-8000-000000000002', actor_type: 'ai', actor_id: null, action: 'task.scored', entity_type: 'task', entity_id: '50000000-0000-4000-8000-000000000001', changes: [{ field: 'complexity_level', old_value: null, new_value: 'C3' }], reason: null, created_at: '2026-09-01T06:35:22.000Z' },
];

export const scoringTrace: ScoringTrace = {
  task_id: '50000000-0000-4000-8000-000000000001',
  task_version_id: '50000000-0000-4000-8000-000000000101',
  processing_run_id: '50000000-0000-4000-8000-000000000901',
  model_provider: 'DEMO_PROVIDER_NONPRODUCTION',
  model_id: 'DEMO_MODEL_NONPRODUCTION',
  prompt_bundle_version: 'prototype-stage7',
  scoring_rubric_version: '1.0',
  taxonomy_version_code: '1.0',
  complexity_level: 'C3', score: 15, clarification_count: 2,
  evidence_flags: ['multi_step', 'data_processing', 'coding', 'iterative_validation'],
};

export function managementEmployeeDashboard(seed = 0) {
  return {
    ...personalDashboard,
    annual_score: 452 - seed * 31,
    lifetime_task_score: 1320 - seed * 120,
    evolution_xp: 1450 - seed * 110,
    task_count: 78 - seed * 8,
    active_days: 62 - seed * 5,
  };
}
