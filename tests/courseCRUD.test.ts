import { tp_expect, tp_test } from "../base/myFixture";
import CategoriesPage from "../pageobjects/categoriesPage";
import * as data from "../testData/login-test-data.json";

tp_test('Course E2E', async ({ landingPage, loginPage, homePage, baseURL, coursesPage, cartPage }) => {

    // navigate to login page  
await landingPage.page.goto(baseURL!);
await landingPage.selectLogIn();

// login to the application
await loginPage.login(data.userID, data.password);

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

 // Navigates to Courses page and adds a new course
 await homePage.manageCourses();
 const courseName = 'Playwright Four Auto Test';
 await coursesPage.addCourse(catName, courseName);
 await coursesPage.verifyCourseExists(courseName); 
 await coursesPage.goToHome();
 
 //initializing the adding to cart and enrolling
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

 
});