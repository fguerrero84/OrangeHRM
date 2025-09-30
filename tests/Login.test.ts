import { tp_test, tp_expect } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test.describe('Authentication Tests', () => {
  tp_test.beforeEach(async ({ loginPage, baseURL }) => {
    await loginPage.page.goto(baseURL!);
    //await loginPage.selectLogIn();
    await loginPage.login(data.userID, data.password);
  });

  tp_test('Login to site', async ({ homePage }) => {
    await tp_expect(homePage.page.locator("button.cartBtn")).toBeVisible();
  });

  tp_test('Log out of the site', async ({ homePage, loginPage }) => {
    await homePage.page.locator("//img[@alt='menu']").click();
    await homePage.page.locator("//button[normalize-space(text())='Sign out']").click();
    await tp_expect(loginPage.page.locator("#email1")).toBeVisible();
  });
});

