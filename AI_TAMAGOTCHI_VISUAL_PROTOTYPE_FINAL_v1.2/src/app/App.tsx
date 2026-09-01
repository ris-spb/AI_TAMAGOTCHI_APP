import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { DemoControlPanel } from '../demo-controls/DemoControlPanel';
import { router } from '../routes/router';
import { FatalBootstrapBoundary } from './error-boundary/FatalBootstrapBoundary';
import { queryClient } from './queryClient';

export function App() {
  return (
    <FatalBootstrapBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV ? <DemoControlPanel /> : null}
      </QueryClientProvider>
    </FatalBootstrapBoundary>
  );
}
