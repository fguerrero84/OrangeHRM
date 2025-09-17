import { Page, expect } from '@playwright/test';
import path from "path";
import { format } from 'date-fns';

export default class CoursesPage {
    constructor(public page: Page) {}

    async addCourse(catName: string, courseName: string) {
        // Click the "Add New Course" button
        await this.page.locator("//button[normalize-space(text())='Add New Course']").click();
        // Fill the form
        // Error dialog catch
        this.page.on('dialog', async dialog => {
            const errorMessage = dialog.message();
            console.log(`File upload error: ${errorMessage}`)
            expect(errorMessage).toContain('File size should be less than 1MB');
            await dialog.accept();
        })
        // submitting large file for error
        const largeFilePath = path.resolve('C:/Users/fguerrero/Pictures/largeFileError.jpg');
        await this.page.setInputFiles("//input[@type='file']",largeFilePath);
        await this.page.waitForTimeout(2000);
        // uploading valid file
        const filePath = path.resolve('C:/Users/fguerrero/Pictures/logo1.jpg');
        await this.page.setInputFiles("//input[@type='file']",filePath);
        // filling text fields
        await this.page.fill('#name', courseName);
        await this.page.fill('#description', 'Automation Playwright Adv checkpoint 35');
        await this.page.fill('#instructorNameId', 'Tech Thread');
        await this.page.fill('#price', '9999');

        // start date 1 month from today & formats it to correct format
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() + 1);
        const fStartDate = format(startDate, 'MM/dd/yyyy');
        await this.page.fill("input[name='startDate']", fStartDate);
        // end date 1 month from start date & formats it to correct format
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        const fEndDate = format(endDate, 'MM/dd/yyyy');
        await this.page.fill("input[name='endDate']", fEndDate);
        // Click outside to close any open date pickers
        await this.page.click(".modal-body");

        // mark permanent checkbox
        await this.page.check('#isPermanent');

        // selecting category from dropdown
        await this.page.locator('.menu-btn').click();
        await this.page.waitForSelector('.menu-items', { state: 'visible' });
        await this.page.locator(`.menu-item:has-text("${catName}")`).click();
        //submit the form now
        await this.page.locator("//button[normalize-space(text())='Save']").click();
    }

    // will get the list of courses 
    async getCoursesName(courseName: string) {
        await this.page.locator('.courses-table tbody tr td:nth-child(2)',{ hasText: courseName }).waitFor({ state: 'visible' });
        const courseElements = this.page.locator('.courses-table tbody tr td:nth-child(2)');
        const count = await courseElements.count();
        const names: string[] = [];
        // stores the names of the courses by iterating the courses locators
        for (let i = 0; i < count; i++) {
            const name = await courseElements.nth(i).innerText();
            names.push(name.trim());
        }
       // await this.page.waitForSelector('.courses-table tbody tr td:nth-child(2)', { state: 'visible' });
        //console.log(names); <-- used for debugging only
        return names;
  }

  // checks for a specific category and adds it if it doesnt
  async verifyCourseExists(courseName: string) {
    //await this.page.waitForSelector('.courses-table tbody tr td:nth-child(2)', { state: 'visible' });
    const coursesName = await this.getCoursesName(courseName);
      if (coursesName.some(name => name.includes(courseName))) {
        console.log(`Course is availble.`);
        
      }else{
        console.log('Course is not available.');
      }
  }

  async goToHome(){
    await this.page.locator("//div[@class='navbar-menu-logo']//img[1]").click();
    await this.page.waitForLoadState('networkidle');
  }
       


    
};