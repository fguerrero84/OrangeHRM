import { Page, Locator } from '@playwright/test';

export default class HomePage {
    readonly claimLnk: Locator;
    readonly PimLnk: Locator;

    constructor(public page: Page) {
        this.claimLnk = page.getByRole('link', { name: 'Claim' });
        this.PimLnk = page.getByRole('link', { name: 'PIM' });
     }

    async navigateToClaims(): Promise<void> {
        await this.claimLnk.click();
        await this.page.waitForLoadState('networkidle');
    }
   
    async navigateToPim(): Promise<void> {
        await this.PimLnk.click();
        await this.page.waitForLoadState('networkidle');
    }

};