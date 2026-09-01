import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildHomeFixture } from '../../src/fixtures/home';
import { HomeScreen } from '../../src/features/home/HomeScreen';
import { useDemoControlStore } from '../../src/demo-controls/store';

function renderHome() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  useDemoControlStore.setState({
    role: 'Employee',
    dataScenario: 'success',
    mascotState: 'happy',
    streak: 7,
    goalProgress: [1, 2, 0],
    threeMode: 'off',
    reducedMotion: false,
    viewportPreset: 'responsive',
  });
});

describe('Stage 4 Home', () => {
  it('renders OpenAPI-shaped Home data without forbidden persistent metrics', async () => {
    const fixture = buildHomeFixture({ healthState: 'happy', streak: 7, goalProgress: [1, 2, 0] });
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(fixture), { status: 200, headers: { 'Content-Type': 'application/json' } })));
    renderHome();

    expect(await screen.findByRole('button', { name: 'Добавить AI-задачу' })).toBeInTheDocument();
    expect(screen.getByText('Цели месяца')).toBeInTheDocument();
    expect(screen.queryByText(/Annual Score/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Evolution XP/i)).not.toBeInTheDocument();
    expect(screen.queryByText('100 / 100')).not.toBeInTheDocument();
  });

  it('shows precise HP only on demand', async () => {
    const fixture = buildHomeFixture({ healthState: 'happy', streak: 7, goalProgress: [1, 2, 0] });
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(fixture), { status: 200, headers: { 'Content-Type': 'application/json' } })));
    renderHome();

    fireEvent.click(await screen.findByRole('button', { name: 'Бодрый' }));
    expect(screen.getByRole('dialog', { name: 'Бодрый' })).toBeInTheDocument();
    expect(screen.getByText('100 / 100')).toBeInTheDocument();
  });

  it('keeps CTA available in controlled loading state', () => {
    useDemoControlStore.setState({ dataScenario: 'loading' });
    renderHome();
    expect(screen.getByRole('button', { name: 'Добавить AI-задачу' })).toBeInTheDocument();
  });
});
