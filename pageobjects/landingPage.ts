import { Page } from '@playwright/test';

export default class LandingPage {
    constructor(public page: Page) {}

    async selectLogIn() {
        await this.page.locator("(//div[@class='navbar-menu-links']//img)[1]").click();
        await this.page.locator("//button[@class='nav-menu-item']").click();
    }
};