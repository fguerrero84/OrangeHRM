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
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
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


