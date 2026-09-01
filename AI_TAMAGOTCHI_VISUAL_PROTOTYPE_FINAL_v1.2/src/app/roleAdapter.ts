import type { DemoRole } from '../mock-api/contracts';
import type { AppRole } from '../routes/contracts';

const demoRoleMap: Record<DemoRole, AppRole> = {
  Employee: 'employee',
  Director: 'director',
  Executive: 'executive',
  Admin: 'admin',
};

export function demoRoleToAppRole(role: DemoRole): AppRole {
  return demoRoleMap[role];
}
