import { Given, When, Then, IWorldOptions } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CustomWorld } from '../support/world';

Given('I am on the Sauce Demo login page', async function (this: CustomWorld) {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    await this.loginPage.goto();
});

When('I log in with username {string} and password {string}',
    async function (this: CustomWorld, username: string, password: string) {
        await this.loginPage.login(username, password);
    }
);

Then('the inventory page should be loaded',
    async function (this: CustomWorld) {
        expect(await this.inventoryPage.loaded()).toBeTruthy();
    }
);

Then('I should see {int} inventory items',
    async function (this: CustomWorld, count: number) {
        await expect(this.inventoryPage.items).toHaveCount(count);
    }
);