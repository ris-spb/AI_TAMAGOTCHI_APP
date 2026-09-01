import { expect, test } from '@playwright/test';

test('Stage 1 infrastructure diagnostic and mock API are healthy', async ({ page }) => {
  await page.goto('/__prototype/infrastructure');
  await expect(page.getByRole('heading', { name: 'AI-Тамагочи · Prototype Stage 1' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('ok / deterministic=true');
});
