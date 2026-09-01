import { expect, test } from '@playwright/test';

test('Home retains functional UI when 3D/fallback visual bytes are unavailable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
  await expect(page.getByText('Цели месяца')).toBeVisible();
  await expect(page.getByText(/Annual Score/i)).toHaveCount(0);
  await expect(page.getByText(/Evolution XP/i)).toHaveCount(0);
});
