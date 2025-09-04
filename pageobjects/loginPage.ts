import { Page } from '@playwright/test';

export default class LoginPage {
    constructor(public page:Page) {}

async login(userID:string, password:string) {
    await this.enterUserID(userID);
    await this.enterPassword(password);
    await this.clickSignIn();
}

async enterUserID(userID:string) {
    await this.page.locator('#userid').fill(userID);
}

async enterPassword(password:string) {
    await this.page.locator('#pwd').fill(password);
}

async clickSignIn() {
    await this.page.locator("input[name='Submit']").click();
}
};



     