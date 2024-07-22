const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
//const { DashboardPage } = require('../pageobjects/DashboardPage');
const dataset =  JSON.parse(JSON.stringify(require("../utils/TestDataLoginPage.json")));



test('@Regression Client App login for', async ({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username,dataset.password); 
// validating Dashboard page
    const dashboardPage = poManager.gatDashboardPage();
    await dashboardPage.validDashboard();
    

});




