import { Page } from '@playwright/test';

export default class LoginPage {
    constructor(public page:Page) {}

async login(userID:string, password:string) {
    await this.enterEmail(userID);
    await this.enterPassword(password);
    await this.clickLogin();
}

async enterEmail(userID:string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(userID);
}

async enterPassword(password:string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
}

async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
}
};



     