import { test, expect } from '@playwright/test';

//test()
//parameters:
//   - title
//   - callback function which the actual test body
test('page has title', async ({ page }) => {
    await page.goto('http://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

test('verify menu tab items', async ({ page }) => {
    await page.goto('http://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', {name: 'MCP', exact: true})).toBeVisible();
    await expect(page.getByRole('link', {name: 'CLI', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Node.js', exact: true})).toBeVisible();
});