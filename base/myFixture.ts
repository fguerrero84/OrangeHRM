import { test as baseTest } from '@playwright/test';
import LandingPage from '../pageobjects/landingPage';
import LoginPage from '../pageobjects/loginPage';
import HomePage from '../pageobjects/homePage';
import CoursesPage from '../pageobjects/coursesPage';
import CategoriesPage from '../pageobjects/categoriesPage';
import CartPage from '../pageobjects/cartPage';


type pages = {
    landingPage: LandingPage;
    loginPage: LoginPage;
    homePage: HomePage;
    coursesPage: CoursesPage;
    categoriesPage: CategoriesPage;
    cartPage: CartPage;
};

const testPages = baseTest.extend<pages>({
    landingPage: async ({ page }, use) => {
        await use (new LandingPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use (new HomePage(page));
    },
    coursesPage: async ({ page }, use) => {
        await use (new CoursesPage(page)); 
    },
    categoriesPage: async ({ page }, use) => {
        await use (new CategoriesPage(page)); 
    },
    cartPage: async ({ page }, use) => {
        await use (new CartPage(page)); 
    },

});

export const tp_test = testPages;
export const tp_expect = testPages.expect;