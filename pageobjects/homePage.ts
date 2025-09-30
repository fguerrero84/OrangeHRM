import { Page, Locator } from '@playwright/test';

export default class HomePage {
    readonly claimLnk: Locator;

    constructor(public page: Page) {
        this.claimLnk = page.getByRole('link', { name: 'Claim' });
     }

    async navigateToClaims(): Promise<void> {
        await this.claimLnk.click();
        await this.page.waitForTimeout(2000);
    }
   

};