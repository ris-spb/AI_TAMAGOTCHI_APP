import type { DemoRole, MascotState } from '../mock-api/contracts';

export type DemoIdentity = {
  readonly id: string;
  readonly displayName: string;
  readonly role: DemoRole;
};

export const demoIdentities: readonly DemoIdentity[] = [
  { id: 'demo-employee-001', displayName: 'Сотрудник Демо', role: 'Employee' },
  { id: 'demo-director-001', displayName: 'Директор Демо', role: 'Director' },
  { id: 'demo-executive-001', displayName: 'Руководитель Демо', role: 'Executive' },
  { id: 'demo-admin-001', displayName: 'Администратор Демо', role: 'Admin' },
] as const;

export const deterministicMascotHp: Readonly<Record<MascotState, number>> = {
  happy: 100,
  normal: 70,
  bored: 50,
  tired: 30,
  very_weak: 10,
  coma: 0,
};
