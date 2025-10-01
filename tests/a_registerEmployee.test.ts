import { tp_expect, tp_test } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test('Registering new employee', async ({ loginPage, homePage, baseURL, pimPage }) => {

    // navigate to login page  & login
    await loginPage.page.goto(baseURL!);
    await loginPage.login(data.userID, data.password);
    //navigate to pim page
    await homePage.navigateToPim();
    //Register new employee
    await pimPage.registerEmployee(data.name, data.lastname);
    

});