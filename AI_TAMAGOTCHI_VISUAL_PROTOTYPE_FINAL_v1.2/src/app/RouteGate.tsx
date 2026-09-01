import type { ReactNode } from 'react';

import { useDemoControlStore } from '../demo-controls/store';
import type { RouteAudience } from '../routes/contracts';
import { demoRoleToAppRole } from './roleAdapter';
import { ForbiddenState } from './shell/RouteStates';

export function RouteGate({ roles, children }: { roles: readonly RouteAudience[]; children: ReactNode }) {
  const demoRole = useDemoControlStore((state) => state.role);
  const currentRole = demoRoleToAppRole(demoRole);

  if (roles.includes('public')) {
    return children;
  }

  if (roles.includes('authenticated') || roles.includes(currentRole)) {
    return children;
  }

  return <ForbiddenState />;
}
