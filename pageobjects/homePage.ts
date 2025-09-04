import { Page } from '@playwright/test';

export default class HomePage {
    constructor(public page:Page) {}

    async selectTimeSheet() {
        await this.page.locator("#PTNUI_DEFAULT_ICN$2").click();
    }
};