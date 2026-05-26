import { test, expect } from '@playwright/test';

test('app root renders', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const appRoot = page.locator('app-root');
  await expect(appRoot).toBeVisible();
});

test('shows create ticket form after clicking Create ticket button', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const createButton = page.locator('button.btn-primary');
  await expect(createButton).toBeVisible();
  await createButton.click();
  const createTicketForm = page.locator('app-create-ticket');
  await expect(createTicketForm).toBeVisible();
});
