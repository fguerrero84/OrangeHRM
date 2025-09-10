import { tp_expect, tp_test } from "../base/myFixture";
import CategoriesPage from "../pageobjects/categoriesPage";
import * as data from "../testData/login-test-data.json";

tp_test('Course E2E', async ({ landingPage, loginPage, homePage, baseURL }) => {
// navigate to login page  
await landingPage.page.goto(baseURL!);
await landingPage.selectLogIn();

// login to the application
await loginPage.login(data.userID, data.password);
await loginPage.page.waitForTimeout(5000);

//Select Manage Categories from the menu
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
 await homePage.page.waitForTimeout(5000);



/* // verify that the home page is displayed
await tp_expect(homePage.page).toHaveTitle(/Homepage/);

//Verify timesheet is displayed and enter timesheet data
await tp_expect(timeSheets.page).toHaveTitle(/Timesheet/);
await timeSheets.fillWeekdayHours();
await timeSheets.selectTimeReportingCode();
await timeSheets.enterProjectID();
await timeSheets.enterActivityID();
await timeSheets.clickSubmit();

//confirming successful submission
await submitConfirmationPage.confirmSubmit();

// verify reported hours are 40 in timesheets page
try { 
    await tp_expect(timeSheets.frame.locator('#DERIVED_TL_WEEK_TL_QUANTITY')).toHaveText('40.00');
    console.log("Timesheets successfully submitted");
}catch (error){
    console.error("Something went wrong, timesheets were not submitted");
    console.error("Details: ", error.message);
}

 */

});