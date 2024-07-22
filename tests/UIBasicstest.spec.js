const {test, expect} = require('@playwright/test');
const { sign } = require('crypto');
const { waitForDebugger } = require('inspector');
const { text } = require('stream/consumers');

// fixtures = global variables 
// function() and ()=> = anonymous function or you can specify a function name 
// JS is a async language, that means that all the methods will be executed randomly or at the same time 

test.only('First Playwright Test', async function({browser})
{
    //context= chrome - plugins/cookies, in this context all the plugins of my browser will be there to avoid this use the following to create a new context = a incognito mode
    const context = await browser.newContext();
    const page = await context.newPage();
    const userNAme = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const CardTitle = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.title();
    // locator css playwright only support CSS
    //rules for locator: if the ID is present css -> tagname#id or #id
   // await page.locator('input#input').type("playwright") deprecated
    await page.locator('input#input').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userNAme.fill("");
    await userNAme.fill("rahulshettyacademy");
    await signIn.click();
    //console.log(await CardTitle.first().textContent());
    // console.log(await CardTitle.nth().textContent());
    // intelligent waits
    await page.waitForLoadState('networkidle');
    const allTitles = await CardTitle.allTextContents();
    console.log(allTitles);

    

});
test('UI Controls', async function({page})
{
    // drop-down
    const dropdown = page.locator("select.from-control");
    await dropdown.selectOption('consult');
    // playwright inspector = debuger
    await page.pause();

    // radio button
    await expect(page.locator('.radiotextsty').click()).toBeChecked();
    
});

test("Child windows hadl", async function({browser})
{
// que debes hacer si tienes dos metodos que necesitan se ejecuatados uno tras otro, ya que JS es asincrono? respuesta: Promesas   
// existen tres status de promesas pending, reject, fullfilled
    const context = await browser.newContext();
    const page = await context.newPage();
    const userNAme = page.locator('#username');
    await page.goto();
    const documentLink = page.locator();

    const [newPage] = Promise.all(
    [
    context.waitForEvent('page'),// lsiten for any new page
    documentLink.click(),// new page is opened 
    ])
    text = await newPage.locator('.red').allTextContent();
    console.log(text); 


});
