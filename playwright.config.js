import { defineConfig, devices } from '@playwright/test';

const config = {
  testDir: './tests',
  testMatch: /.*\.js/,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace: 'retain-on-failure'
    //video: 'on'
  },
};

export default config;

