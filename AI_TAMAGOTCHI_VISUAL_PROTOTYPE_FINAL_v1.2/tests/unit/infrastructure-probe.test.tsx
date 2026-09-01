import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { InfrastructureProbe } from '../../src/app/InfrastructureProbe';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Stage 1 infrastructure probe', () => {
  it('renders deterministic mock API success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            status: 'ok',
            service: 'prototype-mock-api',
            deterministic: true,
            source: 'PROTOTYPE_STAGE_1',
            timestamp: '2026-09-01T00:00:00.000Z',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    );

    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={client}>
        <InfrastructureProbe />
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/ok \/ deterministic=true/)).toBeInTheDocument();
  });
});
