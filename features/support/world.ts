import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';

// Cucumber's World is the per-scenario state bag. We extend it so every
// step definition gets a typed `this` with the live Playwright page and
// the same Page Objects the Playwright-native specs already use — no
// parallel page-object infra, per AGENTS.MD.
export class CustomWorld extends World {
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);