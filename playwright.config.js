import { defineConfig, devices } from '@playwright/test';

const config = {
  testDir: './tests',
  testMatch: /.*\.ts/,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    { name: 'chromium',
    use: {
    baseURL: 'https://hrms.apexsystemsinc.com/psc/HRPRD/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL',
        browserName: 'chromium', 
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false,
        viewport: null, //disable the default 1280x720 viewport size
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
      ],
    reporter: [["dot"], ["json", { outputFile: "test-results.json" }], ["html", { open: "never" }]],
};

export default config;

