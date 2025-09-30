import { Page, expect, Locator } from '@playwright/test';
import path from "path";
import { format } from 'date-fns';

export default class ClaimsPage {
  readonly assignClaimBtn: Locator;
  readonly empNameTxt: Locator;
  readonly eventDwn: Locator;
  readonly currencyDwn: Locator;
  readonly createBtn: Locator;

      constructor(public page: Page) {
          this.assignClaimBtn = page.getByRole('button', { name: 'Assign Claim' });
          this.empNameTxt = page.getByRole('button', { name: 'Assign Claim' });
          this.eventDwn = page.locator("(//div[@class='oxd-select-text-input'])[1]");
          this.currencyDwn = page.locator("(//div[@class='oxd-select-text oxd-select-text--active'])[2]");
          this.createBtn = page.getByRole('button', { name: 'Create' });
       }
       // method that searches and select the employee
      async selectEmployee(name: string) {
          await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(name);
          await this.page.waitForSelector(`text=${name}`, { timeout: 5000 });
          await this.page.getByText(name).click();
          
        }

      async addClaim(employee:string): Promise<void> {
        // Click the "Add New Course" button
        await this.assignClaimBtn.click();
        // Searching for the employee name by calling separate method
        await this.selectEmployee(employee);
        // fill the claim
        await this.eventDwn.click();
        await this.page.getByText('Medical Reimbursement').click();
        await this.currencyDwn.click();
        await this.page.getByText('Euro').click();
        await this.createBtn.click();
        
        // Verifying the claim was created
        const successMessage = this.page.locator('.oxd-toast-content', { hasText: 'Success' });
        await expect(successMessage).toBeVisible();
        console.log('New claim was created successfully.'); 
      }

      async verifyClaimExists(referenceId:string): Promise<boolean | void> {
        try{
          await this.page.waitForSelector(`//div[normalize-space(text())="${referenceId}"]`, { timeout:5000 });
          const refIdVisible = await this.page.isVisible(`//div[normalize-space(text())="${referenceId}"]`);
          expect(refIdVisible).toBe(true);
          console.log(`✅ Reference Id ${referenceId} found.`);
          return refIdVisible;
        }
        catch (error) {
        console.error("❌ Reference Id not found", error);
      }
    }

      async viewExpensesDetails(employee:string): Promise<void>{
          const row = this.page.locator('.oxd-table-row').filter({
            has: this.page.getByText(employee),
          }).filter({
            has: this.page.getByText('Medical Reimbursement'),
          });
          await row.getByRole('button', { name: 'View Details' }).click();

      }
        
    };       
        
        
        
       /*  // Error dialog catch
        this.page.on('dialog', async dialog => {
            const errorMessage = dialog.message();
            console.log(`File upload error: ${errorMessage}`)
            expect(errorMessage).toContain('File size should be less than 1MB');
            await dialog.accept();
        })
        // submitting large file for error
        const largeFilePath = path.resolve('C:/Users/fguerrero/Pictures/largeFileError.jpg');
        await this.page.setInputFiles("//input[@type='file']",largeFilePath,{ timeout:5000 });
        //await this.page.waitForTimeout(2000);
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

  // manual category
  async manualAddCourse(courseName: string) {
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
        await this.page.setInputFiles("//input[@type='file']",largeFilePath,{ timeout:5000 });
        //await this.page.waitForTimeout(2000);
        // uploading valid file
        const filePath = path.resolve('C:/Users/fguerrero/Pictures/logo1.jpg');
        await this.page.setInputFiles("//input[@type='file']",filePath);
        // filling text fields
        await this.page.fill('#name', courseName);
        await this.page.fill('#description', 'Automation Playwright');
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
        await this.page.locator('.menu-items .menu-item').first().click();
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
       


    
}; */