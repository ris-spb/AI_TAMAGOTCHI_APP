import { expect, test, type Page } from '@playwright/test';

async function setRole(page: Page, role: 'Employee'|'Director'|'Executive'|'Admin') {
  await page.getByRole('button', { name: 'DEMO' }).click();
  await page.getByLabel('Роль').selectOption(role);
  await page.getByRole('button', { name: 'Закрыть demo panel' }).click();
}

test('Director dashboard is own-directorate only and Admin route is forbidden', async ({ page }) => {
  await page.goto('/director');
  await setRole(page, 'Director');
  await expect(page.getByRole('heading', { name: 'Director Dashboard' })).toBeVisible();
  await expect(page.getByText('Своя дирекция')).toBeVisible();
  await page.goto('/admin/audit');
  await expect(page.getByText(/Доступ запрещён|403/)).toBeVisible();
});

test('Executive has company drilldown but no Admin settings', async ({ page }) => {
  await page.goto('/executive');
  await setRole(page, 'Executive');
  await expect(page.getByRole('heading', { name: 'Executive Dashboard' })).toBeVisible();
  await expect(page.getByText(/company-wide drill-down/i)).toBeVisible();
  await page.goto('/admin/users');
  await expect(page.getByText(/Доступ запрещён|403/)).toBeVisible();
});

test('Admin surfaces technical trace without score edit control', async ({ page }) => {
  await page.goto('/admin');
  await setRole(page, 'Admin');
  await expect(page.getByRole('heading', { name: 'Admin Panel' })).toBeVisible();
  await page.goto('/admin/audit');
  await expect(page.getByRole('heading', { name: 'Audit / Technical Trace' })).toBeVisible();
  await expect(page.getByText('C3 · 15')).toBeVisible();
  await expect(page.getByText(/read-only/)).toBeVisible();
  await expect(page.getByRole('button', { name: /изменить score/i })).toHaveCount(0);
});

test('Export scope is role-derived', async ({ page }) => {
  await page.goto('/exports');
  await setRole(page, 'Director');
  await expect(page.getByText(/только свою дирекцию/)).toBeVisible();
  await expect(page.getByLabel('Scope')).toBeDisabled();
});
