import { tp_expect, tp_test } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test('Submit bench timesheet', async ({ loginPage, homePage, timeSheets,submitConfirmationPage, baseURL }) => {
// navigate to apex timesheet login page  
await loginPage.page.goto(baseURL!);

// login to the application
await loginPage.login(data.userID, data.password);

// verify that the home page is displayed
await tp_expect(homePage.page).toHaveTitle(/Homepage/);

// navigate to the timesheet page
await homePage.selectTimeSheet();

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
await tp_expect(timeSheets.frame.locator('#DERIVED_TL_WEEK_TL_QUANTITY')).toHaveText('40.00');



});