import { test, expect } from '@playwright/test';

test('Home functional overlay survives Tier-F fallback and reduced motion', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: /основная навигация/i })).toBeVisible();
  await expect(page.locator('[data-runtime-tier="F"]')).toBeVisible();

  await page.getByRole('button', { name: 'DEMO' }).click();
  await page.getByLabel('3D requested mode').selectOption('error');
  await page.getByLabel('HP / mascot state').selectOption('coma');
  await page.getByText('Reduced motion simulation').click();

  const scene = page.locator('[data-runtime-tier="F"]');
  await expect(scene).toHaveAttribute('data-health-state', 'coma');
  await expect(scene).toHaveAttribute('data-scene-lifecycle', 'fallback');
  await expect(page.getByAltText('Любознайка — Кома')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeEnabled();
  await expect(page.locator('[data-demo-reduced-motion="true"]')).toBeVisible();
});
