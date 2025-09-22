import { tp_expect, tp_test } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test('Enroll Course', async ({ landingPage, loginPage, homePage, baseURL, cartPage }) => {

    // navigate to login page  
await landingPage.page.goto(baseURL!);
await landingPage.selectLogIn();

// login to the application
await loginPage.login(data.userID, data.password);

 //initiating the add to cart and enrolling
 await homePage.addFirstCourseToCart();
 await homePage.goToCart();
 await cartPage.enrollCourse();
 await cartPage.goToHome();
 await loginPage.page.waitForTimeout(3000);// not needed but helps you see final glanze

 
});