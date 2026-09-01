import { expect, test } from '@playwright/test';

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
] as const;

for (const viewport of viewports) {
  test(`Home has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}

test('login → onboarding → goal setup → Home critical gate flow', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Табельный номер').fill('DEMO-1001');
  await page.getByLabel('Номер телефона').fill('+7 900 000-00-01');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await expect(page).toHaveURL(/\/onboarding$/);
  for (let index = 0; index < 4; index += 1) await page.getByRole('button', { name: 'Далее' }).click();
  await page.getByRole('button', { name: 'Завершить onboarding' }).click();
  await expect(page).toHaveURL(/\/goals\/setup$/);
  const boxes = page.getByRole('checkbox');
  await expect(boxes).toHaveCount(5);
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await page.getByRole('button', { name: 'Подтвердить 2 цели' }).click();
  await expect(page.getByRole('heading', { name: 'Цели настроены' })).toBeVisible();
  await page.getByRole('button', { name: 'Перейти на главную' }).click();
  await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeVisible();
});

test('Home health dialog traps focus, closes on Escape and restores trigger focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Бодрый|Нормальный|Скучает|Уставший|Очень слабый|Кома/ });
  await trigger.focus();
  await trigger.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Закрыть состояние питомца' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('native reduced motion preserves functional Home UI', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Добавить AI-задачу' })).toBeEnabled();
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
});

test('desktop management uses a dedicated table/panel composition', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/admin/users');
  await page.getByRole('button', { name: 'DEMO' }).click();
  await page.getByLabel('Роль').selectOption('Admin');
  await page.getByRole('button', { name: 'Закрыть demo panel' }).click();
  await expect(page.getByRole('heading', { name: 'Пользователи и роли' })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
});
