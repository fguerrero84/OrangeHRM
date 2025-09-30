import { tp_expect, tp_test } from "../base/myFixture";
import * as data from "../testData/login-test-data.json";

tp_test('Submitting a claims and expenses', async ({ loginPage, homePage, claimsDetailsPage, claimsPage, baseURL }) => {

    // navigate to login page  & login
    await loginPage.page.goto(baseURL!);
    await loginPage.login(data.userID, data.password);
    //navigate to claims page
    await homePage.navigateToClaims();
    //create new claim
    const employee = 'Fernando Guerrero';
    await claimsPage.addClaim(employee);
    // navigates to claim details page
    //await claimsPage.viewExpensesDetails(employee);
    // add the expenses & confirm total amount
    await claimsDetailsPage.addFirstExpense();
    await claimsDetailsPage.addSecondExpense();
    await claimsDetailsPage.confirmTotalAmount();
    const referenceId = await claimsDetailsPage.submitClaim();
    await claimsDetailsPage.navigateToClaimsPage();
    await claimsPage.verifyClaimExists(referenceId);







});

/* // login to the application
await loginPage.login(data.userID, data.password);

//Select Manage Categories from the menu
const [catPage ] = await Promise.all([
    homePage.page.context().waitForEvent('page'),
    homePage.manageCategories()  // Opens a new tab
]);
 // initializing the categories page because of the new tab it opens
 const categoriesPage = new CategoriesPage(catPage);
 const catName = 'DemoPlay';
 // adding the new category if it doesnt exists
 await categoriesPage.addCategoryIfNotExists(catName);
 
 // Verify newly created category exists
 const categoryExists = await categoriesPage.verifyCategoryExists(catName);
 await tp_expect(categoryExists).toBe(true);
 console.log(`Category "${catName}" exists: ${categoryExists}`);
 await catPage.close();

 // Navigates to Courses page and adds a new course
 await homePage.manageCourses();
 const courseName = 'Playwright Five Auto Test';
 await coursesPage.addCourse(catName, courseName);
 await coursesPage.verifyCourseExists(courseName); 
 await coursesPage.goToHome();
 
 //initiating the add to cart and enrolling
 await homePage.addCourseToCart(courseName);
 await homePage.goToCart();
 await cartPage.enrollCourse();
 await cartPage.goToHome();

 // navigate to categories page & delete the category
 // handling the new tab
 const [ newcatPage ] = await Promise.all([
    homePage.page.context().waitForEvent('page'),
    homePage.manageCategories()
 ])
 const newcategoriesPage = new CategoriesPage(newcatPage);
 await newcategoriesPage.page.waitForLoadState('networkidle');
 await newcategoriesPage.deleteCategory(catName);
 const IsDeleted = await newcategoriesPage.confirmDelete(catName);
 await tp_expect(IsDeleted).toBe(true);
 await newcatPage.close();
 await loginPage.page.waitForTimeout(3000);// not needed but helps you see final glanze

 
}); */