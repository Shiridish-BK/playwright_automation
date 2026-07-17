import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { CustomWorld } from './world';

// One browser for the whole run (fast), one context+page per scenario
// (isolation) — same tradeoff Playwright's own test runner makes.
let browser: Browser;
let context: BrowserContext;

BeforeAll({ timeout: 30 * 1000 }, async function () {
  browser = await chromium.launch({ headless: !!process.env.CI });
});

Before(async function (this: CustomWorld) {
  context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  await context.close();
});

AfterAll({ timeout: 30 * 1000 }, async function () {
  await browser.close();
});