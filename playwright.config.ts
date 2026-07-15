import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
	testDir: './tests',
	timeout: 30000,
	retries: isCI ? 1 : 0,
	reporter: [['html']],
	workers: 4,
	projects: [
		{
			name: "ui",
			testDir: './tests/ui',
			use: {
				acceptDownloads: true,
				actionTimeout: 30 * 1000,
				navigationTimeout: 30 * 1000,
				headless: isCI ? true : false,  // headed locally, headless on CI
				viewport: isCI ? { width: 1280, height: 720 } : null,  // fixed size needed once not maximized
				launchOptions: {
					args: [
						"--start-maximized",
						"--allow-file-access-from-files",
						"--use-fake-device-for-media-stream",
						"--use-fake-ui-for-media-stream",
						"--hide-scrollbars",
						"--disable-popup-blocking",
						"--disable-search-engine-choice-screen",
						"--disable-infobars",
						"--disable-dev-shm-usage",
						"--disable-notifications",
						"--disable-blink-features=AutomationControlled",
					],
				},
			},
		},
		{
			name: 'api',
			testDir: './tests/api',
			use: {
				baseURL: 'http://localhost:8089',
			},
		},
	],
});
