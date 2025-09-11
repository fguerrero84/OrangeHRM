import { tp_expect, tp_test } from "../base/myFixture";
import CategoriesPage from "../pageobjects/categoriesPage";
//import CoursesPage from "../pageobjects/coursesPage";
import * as data from "../testData/login-test-data.json";

tp_test('Course E2E', async ({ landingPage, loginPage, homePage, baseURL, coursesPage }) => {
// navigate to login page  
await landingPage.page.goto(baseURL!);
await landingPage.selectLogIn();

// login to the application
await loginPage.login(data.userID, data.password);

/* //Select Manage Categories from the menu
const [catPage ] = await Promise.all([
    homePage.page.context().waitForEvent('page'),
    homePage.manageCategories()  // Opens a new tab
]);
 const categoriesPage = new CategoriesPage(catPage);
 const catName = 'DemoPlay';
 await categoriesPage.addCategoryIfNotExists(catName);
 // Verify newly created category exists
 const categoryExists = await categoriesPage.verifyCategoryExists(catName);
 await tp_expect(categoryExists).toBe(true);
 console.log(`Category "${catName}" exists: ${categoryExists}`);
 await catPage.close();

 await homePage.manageCourses();
 await coursesPage.addCourse(catName);
 await coursesPage.verifyCourseExists(); */
await homePage.goToCart();
await loginPage.page.waitForTimeout(5000);

 
});