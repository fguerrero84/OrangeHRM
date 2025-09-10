import { Page } from '@playwright/test';

export default class LoginPage {
    constructor(public page:Page) {}

async login(userID:string, password:string) {
    await this.enterEmail(userID);
    await this.enterPassword(password);
    await this.clickSignIn();
}

async enterEmail(userID:string) {
    await this.page.locator('#email1').fill(userID);
}

async enterPassword(password:string) {
    await this.page.locator('#password1').fill(password);
}

async clickSignIn() {
    await this.page.locator("//button[@type='submit']").click();
}
};



     