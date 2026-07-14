import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage';

type Fixture = { inventoryPage: InventoryPage; }; // inventoryPage is the Fixture (navigated to inventory page) we will return to caller

export const test = base.extend<Fixture>({ //export an overriden test that has inventoryPage
    inventoryPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
       
        await use(inventoryPage); //hand control to the test now
    }
});

export { expect } from '@playwright/test'; //so that the caller doesn't need to import this seperately

