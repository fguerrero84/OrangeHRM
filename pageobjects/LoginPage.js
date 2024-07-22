class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInbutton= page.locator("input[value='Sign In']");
        this.userName = page.locator("input#userid");
        this.password = page.locator("input#pwd");
    
    }
    
    async goTo()
    {
        await this.page.goto("https://myapexinternal.apexsystemsinc.com/psp/INTERNAL/?cmd=login&languageCd=ENG");
    }
   
    async validLogin(username,password)
    {
         await  this.userName.fill(username);
         await this.password.fill(password);
         await this.signInbutton.click();
    
    }
    
    }
    module.exports = {LoginPage};