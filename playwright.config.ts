import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    reporter: [['html']],
    workers: 1,
    projects: [
		{
			name: "chromium",
			use: {
				acceptDownloads: true,
				actionTimeout: 30 * 1000,
				launchOptions: {
					args: [
						"--start-maximized",
						"--allow-file-access-from-files",
						"--use-fake-device-for-media-stream",
						"--use-fake-ui-for-media-stream",
						"--hide-scrollbars",
						"--disable-features=IsolateOrigins,site-per-process,VizDisplayCompositor,SidePanelPinning,OptimizationGuideModelDownloading,OptimizationHintsFetching,OptimizationTargetPrediction,OptimizationHints",
						"--disable-popup-blocking",
						"--disable-search-engine-choice-screen",
						"--disable-infobars",
						"--disable-dev-shm-usage",
						"--disable-notifications",
						"--disable-blink-features=AutomationControlled",
					],
					headless: false,
				},
				navigationTimeout: 30 * 1000,
				viewport: null,
			},
		},
	],
});
