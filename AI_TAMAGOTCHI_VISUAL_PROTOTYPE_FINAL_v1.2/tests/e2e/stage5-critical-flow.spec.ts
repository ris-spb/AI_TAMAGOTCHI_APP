import { expect, test } from '@playwright/test';

test('critical text AI-case flow reaches result through at most 3 clarifications', async ({ page }) => {
  await page.goto('/ai-cases/new');
  await expect(page.getByRole('heading', { name: 'Добавить AI-задачу' })).toBeVisible();
  await page.getByLabel('Что вы сделали с помощью ИИ?').fill('Проанализировал данные по пассажиропотоку с ИИ и подготовил выводы для рабочей справки.');
  await page.getByRole('button', { name: 'Отправить на обработку' }).click();

  await expect(page).toHaveURL(/\/ai-cases\/[^/]+\/(processing|clarify|result)/);
  for (let i = 0; i < 3; i += 1) {
    if (/\/clarify$/.test(page.url())) {
      await expect(page.getByText(/Вопрос [1-3] из максимум 3/)).toBeVisible();
      await page.getByLabel('Ваш ответ').fill('Да, это отдельная выполненная рабочая задача с анализом данных.');
      await page.getByRole('button', { name: 'Ответить' }).click();
      await page.waitForURL(/\/(processing|clarify|result)$/);
    }
    if (/\/result$/.test(page.url())) break;
  }

  await page.waitForURL(/\/result$/);
  await expect(page.getByRole('heading', { name: 'AI-задача учтена' })).toBeVisible();
  await expect(page.getByText('C3')).toBeVisible();
  await expect(page.getByText('+15', { exact: true })).toBeVisible();
});

test('voice route exposes editable transcript before submission', async ({ page }) => {
  await page.goto('/ai-cases/new/voice');
  await page.getByRole('button', { name: 'Начать запись' }).click();
  await page.getByRole('button', { name: 'Завершить запись' }).click();
  await page.waitForURL('/ai-cases/new/transcript');
  await expect(page.getByLabel('Распознанный текст')).toBeEditable();
});
