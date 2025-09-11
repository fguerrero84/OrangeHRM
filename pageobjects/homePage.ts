import { Page } from '@playwright/test';

export default class HomePage {
    constructor(public page: Page) {}

    async manageCourses() {
        //hover over the manage menu
        await this.page.locator("//div[@class='nav-menu-item-manage']//span[1]").hover();
        //click on manage courses
        await this.page.locator("(//a[@class='nav-menu-item false'])[1]").click();
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