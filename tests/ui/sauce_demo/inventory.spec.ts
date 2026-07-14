import { test, expect } from "../../../src/fixtures/fixtures"

test('verify logo', async ({ inventoryPage }) => {
    await expect(inventoryPage.logo).toBeVisible();
});

test('items count is 6', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
});