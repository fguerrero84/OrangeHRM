import { expect, Page } from '@playwright/test';

export default class CartPage {
    constructor(public page: Page) {}

    async enrollCourse() {
       await this.page.locator("//button[normalize-space(text())='Enroll Now']").click();
       await this.page.fill("#address",'272 S Main Fake St');
       await this.page.fill("#phone",'2987654621');
       await this.page.locator("//button[@class='action-btn white-action-btn']/following-sibling::button[1]").click();
       expect(this.page.locator("uniqueId")).toContainText('Your order id');
       const orderId = await this.page.locator("//h4[@class='uniqueId']//b[1]").innerText();
       console.log(`Your order is: ${orderId}`);
    }
    
    async manageCategories() {
        //hover over the manage menu
        await this.page.locator("//div[@class='nav-menu-item-manage']//span[1]").hover();
        //clicking on manage categories will open a new tab
        await this.page.locator("(//a[@class='nav-menu-item false'])[2]").click();
    }

    async addCourseToCart(){
        await this.page.locator('.course-card', { hasText: 'play test' }).getByRole('button', { name: 'Add to Cart' }).click();
    }

    async goToCart(){
        await this.page.locator("button.cartBtn").click();
    }
    
};