import { tp_expect, tp_test } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test('Submitting a claim and expenses', async ({ baseURL, loginPage, homePage, claimsDetailsPage, claimsPage, pimPage }) => {

    // navigate to login page  & login
    await loginPage.page.goto(baseURL!);
    await loginPage.login(data.userID, data.password);
    //navigate to pim page
    await homePage.navigateToPim();
    //Register new employee
    await pimPage.registerEmployee(data.name, data.lastname);
    //navigate to claims page
    await homePage.navigateToClaims();
    //create new claim
    const employee = data.employee;
    await claimsPage.addClaim(employee);
    // add the expenses & confirm total amount
    await claimsDetailsPage.addFirstExpense();
    await claimsDetailsPage.addSecondExpense();
    await claimsDetailsPage.confirmTotalAmount();
    const referenceId = await claimsDetailsPage.submitClaim();
    await claimsDetailsPage.navigateToClaimsPage();
    await claimsPage.verifyClaimExists(referenceId);

});