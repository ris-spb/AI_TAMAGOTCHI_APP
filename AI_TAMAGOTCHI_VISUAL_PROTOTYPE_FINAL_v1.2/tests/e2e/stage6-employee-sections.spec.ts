import { expect, test } from '@playwright/test';

test('History → task detail exposes versions and owner edit without direct score editing', async ({ page }) => {
  await page.goto('/history');
  await expect(page.getByRole('heading', { name: 'История' })).toBeVisible();
  await page.getByRole('link', { name: /Проанализирован синтетический массив пассажиропотока/ }).click();
  await expect(page.getByRole('heading', { name: 'Детали' })).toBeVisible();
  await expect(page.getByText('Версия 2 · текущая')).toBeVisible();
  await expect(page.getByText('Версия 1')).toBeVisible();
  await page.getByRole('link', { name: 'Редактировать' }).click();
  await expect(page.getByRole('heading', { name: 'Редактировать AI-кейс' })).toBeVisible();
  await expect(page.getByLabel('Исходное описание')).toBeEditable();
  await expect(page.getByText(/Complexity и Score напрямую не редактируются/)).toBeVisible();
});

test('all primary bottom-nav sections are contentful', async ({ page }) => {
  for (const [route, heading] of [['/', 'Добавить AI-задачу'], ['/history', 'История'], ['/rating', 'Рейтинг'], ['/profile', 'Дмитрий Примеров']] as const) {
    await page.goto(route);
    if (route === '/') await expect(page.getByRole('button', { name: heading })).toBeVisible();
    else await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
});

test('rating analytics stays company-aggregate and public profile obeys privacy projection', async ({ page }) => {
  await page.goto('/rating/analytics');
  await expect(page.getByText(/company-wide aggregates/)).toBeVisible();
  await expect(page.getByText(/без разбивки по дирекциям/)).toBeVisible();
  await page.goto('/profiles/61000000-0000-4000-8000-000000000011');
  await expect(page.getByText('closed', { exact: false })).toBeVisible();
  await expect(page.getByText('Raw input, clarifications и ссылки')).toBeVisible();
});

test('profile settings expose privacy, vacation, earned achievements and goals', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.getByRole('link', { name: /Monthly Goals/ })).toBeVisible();
  await page.goto('/profile/privacy');
  await expect(page.getByRole('radio', { name: /Стандартный/ })).toBeChecked();
  await page.goto('/profile/vacation');
  await expect(page.getByRole('switch')).toBeVisible();
  await page.goto('/profile/achievements');
  await expect(page.getByText('Полученное достижение').first()).toBeVisible();
  await page.goto('/goals');
  await expect(page.getByText('1 из 3 выполнено')).toBeVisible();
});
