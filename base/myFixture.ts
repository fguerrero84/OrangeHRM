import { test as baseTest } from '@playwright/test';
import LoginPage from '../pageobjects/loginPage';
import HomePage from '../pageobjects/homePage';
import ClaimsDetailsPage from '../pageobjects/claimsDetailsPage';
import ClaimsPage from '../pageobjects/claimsPage';


type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    claimsDetailsPage: ClaimsDetailsPage;
    claimsPage: ClaimsPage;
};

const testPages = baseTest.extend<pages>({
    
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use (new HomePage(page));
    },
    claimsDetailsPage: async ({ page }, use) => {
        await use (new ClaimsDetailsPage(page)); 
    },
    claimsPage: async ({ page }, use) => {
        await use (new ClaimsPage(page)); 
    },

});

export const tp_test = testPages;
export const tp_expect = testPages.expect;