import type { ReactNode } from 'react';

import { useDemoControlStore } from '../../demo-controls/store';
import { EmptyState, ForbiddenState, RouteErrorState, RouteLoadingState } from './RouteStates';

export function ScreenStateBoundary({ children, bypass = false }: { children: ReactNode; bypass?: boolean }) {
  const scenario = useDemoControlStore((state) => state.dataScenario);

  if (bypass) return children;
  if (scenario === 'loading') return <RouteLoadingState />;
  if (scenario === 'error') return <RouteErrorState />;
  if (scenario === 'empty') return <EmptyState />;
  if (scenario === 'forbidden') return <ForbiddenState />;

  return children;
}
