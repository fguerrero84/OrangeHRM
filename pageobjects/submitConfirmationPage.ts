import { FrameLocator } from '@playwright/test';

export default class SubmitConfirmationPage {
    constructor( public frame: FrameLocator) {}

    async confirmSubmit() {
        await this.frame.locator('//span[contains(text(), "The Submit was successful.")]').waitFor({ state: 'visible' });
        await this.frame.locator("#DERIVED_ETEO_SAVE_PB").click();
    }
};