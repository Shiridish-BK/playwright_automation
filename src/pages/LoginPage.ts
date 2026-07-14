import { Page, Locator } from '@playwright/test'

export class LoginPage {
    private page: Page;
    private userName: Locator;
    private password: Locator;
    private loginBtn: Locator;

    // Constructor + Element Locators
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('[dta-test="login-button"]');
    }

    // Actions
    async goto() : Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}