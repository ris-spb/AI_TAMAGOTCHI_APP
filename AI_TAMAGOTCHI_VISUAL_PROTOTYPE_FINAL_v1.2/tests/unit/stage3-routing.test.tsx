import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MobileBottomNavigation } from '../../src/app/shell/MobileBottomNavigation';
import { HOME_PRIMARY_CTA, MOBILE_PRIMARY_NAV, screenRouteCatalog } from '../../src/routes/routeCatalog';

describe('Stage 3 route contract', () => {
  it('contains exactly 36 active product screens', () => {
    expect(screenRouteCatalog).toHaveLength(36);
  });

  it('keeps exact four-item mobile navigation and separate Home CTA', () => {
    expect(MOBILE_PRIMARY_NAV.map((item) => item.label)).toEqual(['Главная', 'История', 'Рейтинг', 'Профиль']);
    expect(HOME_PRIMARY_CTA).toEqual({ label: 'Добавить AI-задачу', to: '/ai-cases/new' });
  });

  it('renders exact mobile navigation labels', () => {
    render(<MemoryRouter><MobileBottomNavigation /></MemoryRouter>);
    expect(screen.getByRole('navigation', { name: 'Основная навигация' })).toBeInTheDocument();
    for (const label of ['Главная', 'История', 'Рейтинг', 'Профиль']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
    expect(screen.queryByRole('link', { name: 'Добавить' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Задачи' })).not.toBeInTheDocument();
  });
});
