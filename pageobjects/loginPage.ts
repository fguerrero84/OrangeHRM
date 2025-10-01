import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginBtn:      Locator

    constructor(public page: Page) {
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
     }

    async login(userID: string, password: string): Promise<void> {
        await this.enterUsername(userID);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async enterUsername(userID: string): Promise<void> {
        await this.usernameInput.fill(userID);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginBtn.click();
    }
};



