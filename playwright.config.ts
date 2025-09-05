import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5000 },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://hrms.apexsystemsinc.com/psc/HRPRD/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false,
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
  reporter: [['dot'], ['json', { outputFile: 'test-results.json' }], ['html', { open: 'never' }]],
});


