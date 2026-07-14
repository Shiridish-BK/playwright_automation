import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    page: Page;
    logo: Locator;
    items: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.app_logo');
        this.items = page.locator('.inventory_item');
    }

    async loaded(): Promise<boolean> {
        return await this.logo.isVisible();
    }
}