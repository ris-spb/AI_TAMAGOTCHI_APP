import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../../src/design-system/components/Button';
import { TextField } from '../../src/design-system/components/Field';
import { NavigationPreview } from '../../src/design-system/components/NavigationPreview';
import { Toggle } from '../../src/design-system/components/SelectionControls';

describe('Stage 2 design-system contracts', () => {
  it('prevents duplicate action while loading', () => {
    render(<Button loading>Отправить</Button>);
    const button = screen.getByRole('button', { name: 'Загрузка…' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('exposes input validation semantically', () => {
    render(<TextField label="Поле" error="Ошибка" />);
    expect(screen.getByLabelText('Поле')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
  });

  it('uses the approved four mobile navigation labels', () => {
    render(<NavigationPreview active="Рейтинг" />);
    for (const label of ['Главная', 'История', 'Рейтинг', 'Профиль']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Рейтинг' })).toHaveAttribute('aria-current', 'page');
  });

  it('keeps toggle semantics accessible', () => {
    render(<Toggle label="В отпуске" />);
    const control = screen.getByRole('switch', { name: 'В отпуске' });
    fireEvent.click(control);
    expect(control).toBeChecked();
  });
});
