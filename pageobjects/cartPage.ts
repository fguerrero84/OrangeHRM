import { expect, Page } from '@playwright/test';

export default class CartPage {
    constructor(public page: Page) {}

    async enrollCourse() {
       await this.page.locator("//button[normalize-space(text())='Enroll Now']").click();
       await this.page.fill("#address",'272 S Main Fake St');
       await this.page.fill("#phone",'2987654621');
       await this.page.locator("//button[@class='action-btn white-action-btn']/following-sibling::button[1]").click();
       const enrollText = await this.page.locator(".uniqueId").innerText();
       expect(enrollText).toContain('Your order id');
       const orderId = await this.page.locator("//h4[@class='uniqueId']//b[1]").innerText();
       console.log(`Your order is: ${orderId}`);
       await this.page.locator(".btn-close").click();
    }
    
    async goToHome() {
       await Promise.all([
            this.page.waitForNavigation(),     
            this.page.locator("//div[@class='navbar-menu-logo']//img[1]").click()
        ]);
    }

        
};