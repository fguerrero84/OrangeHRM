import { test as baseTest } from '@playwright/test';
import LoginPage from '../pageobjects/loginPage';
import HomePage from '../pageobjects/homePage';
import TimeSheets from '../pageobjects/timeSheets';
import SubmitConfirmationPage from '../pageobjects/submitConfirmationPage';

type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    timeSheets: TimeSheets;
    submitConfirmationPage: SubmitConfirmationPage;
};

const testPages = baseTest.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use (new HomePage(page));
    },
    timeSheets: async ({ page }, use) => {
        const frame = page.frameLocator('#ptifrmtgtframe');
        await use (new TimeSheets(page, frame));
    },
    submitConfirmationPage: async ({ page }, use) => {
        const frame = page.frameLocator('#ptifrmtgtframe');
        await use (new SubmitConfirmationPage(frame)); 
    },
});

export const tp_test = testPages;
export const tp_expect = testPages.expect;