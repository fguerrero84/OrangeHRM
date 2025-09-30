import { Page, expect, Locator } from '@playwright/test';
import path from "path";
import { format } from 'date-fns';

export default class ClaimsDetailsPage {
  readonly addExpenseBtn: Locator;
  readonly expenseTypeDwn: Locator;
  readonly datePicker: Locator;
  readonly amountTxt: Locator;
  readonly saveBtn: Locator;
  readonly submitClaimBtn: Locator;
  readonly claimLnk: Locator;

      constructor(public page: Page) {
          this.addExpenseBtn = page.locator('button:has-text("Add")').first();
          this.datePicker = page.getByPlaceholder('yyyy-dd-mm');
          this.expenseTypeDwn = page.locator("div.oxd-select-text-input");
          this.amountTxt = page.locator('.oxd-input-group').filter({
            hasText: 'Amount',
            }).locator('input');
          this.saveBtn = page.getByRole('button', { name: 'Save' });
          this.submitClaimBtn = page.getByRole('button', { name: 'Submit' });
          this.claimLnk = page.locator('li.oxd-main-menu-item-wrapper >> a:has(span:has-text("Claim"))');
       }
       // method that searches and select the employee
     
      async addFirstExpense(): Promise<void> {
        
        await this.addExpenseBtn.click();
        await this.expenseTypeDwn.click();
        await this.page.getByText('Transport').click();
        //getting current date
        const currDate = new Date();
        // two weeks prior of current date
        const twoWeeks = new Date(currDate);
        twoWeeks.setDate(currDate.getDate() - 14);
        await this.datePicker.fill(format(twoWeeks, 'yyyy-dd-MM'));
        //Filling the expense amount
        await this.amountTxt.fill('150');
        await this.saveBtn.click();
        
        // Verifying the expense was added
        const successMessage = this.page.locator('.oxd-toast-content', { hasText: 'Success' });
        await expect(successMessage).toBeVisible();
        console.log('First Expense added successfully.'); 
      }

      async addSecondExpense(): Promise<void> {
        
        await this.addExpenseBtn.click();
        await this.expenseTypeDwn.click();
        await this.page.getByText('Planned Surgery').click();
        //getting current date
        const currDate = new Date();
        // one week prior of current date
        const twoWeeks = new Date(currDate);
        twoWeeks.setDate(currDate.getDate() - 7);
        await this.datePicker.fill(format(twoWeeks, 'yyyy-dd-MM'));
        //Filling the expense amount
        await this.amountTxt.fill('350');
        await this.saveBtn.click();
        
        // Verifying the expense was added
        const successMessage = this.page.locator('.oxd-toast-content', { hasText: 'Success' });
        await expect(successMessage).toBeVisible();
        console.log('Second Expense added successfully.'); 
      }

  async confirmTotalAmount(): Promise<void> {
    // 1. Locate *only* the amount cells (the 5th cell in each row)
    const amountCells = this.page.locator(
      '.oxd-table-body .oxd-table-row .oxd-table-cell.oxd-padding-cell:nth-child(5) div'
    );

    // 2. Wait until at least 2 amounts are present (150.00 & 350.00)
    await expect(amountCells).toHaveCount(2, { timeout: 5_000 });

    // 3. Pull their text, parse to floats, and sum
    const texts = await amountCells.allInnerTexts();
    const computedTotal = texts
      .map(t => parseFloat(t.trim()))
      .reduce((sum, val) => sum + val, 0);

    console.log('Found rows:', texts, '→ computed total:', computedTotal.toFixed(2));

    // 4. Grab the UI’s displayed total and extract the number
    const summary = this.page.locator('p.oxd-text--p', {
      hasText: /^Total Amount \(Euro\) :/
    });
    await expect(summary).toBeVisible();
    const summaryText = await summary.innerText();
    const displayedTotal = parseFloat(summaryText.match(/\d+\.\d{2}$/)![0]);
    // 5. Assert they match
    expect(displayedTotal).toBeCloseTo(computedTotal, 2);
    console.log(
      `✅ Displayed total ${displayedTotal.toFixed(2)} matches computed ${computedTotal.toFixed(2)}`
    );
  }

  async submitClaim(): Promise<string> {
        await this.submitClaimBtn.click();
        // Verifying the claim was submitted
        const successMessage = this.page.locator('.oxd-toast-content', { hasText: 'Success' });
        await expect(successMessage).toBeVisible();
        console.log('Claim successfully Submitted.'); 
        // Storing the claim´s reference Id
            try {
        // 1. Locate the field by its label
        const referenceId = await this.page
        .locator('div.oxd-input-group__label-wrapper:has-text("Reference Id") + div input.oxd-input')
        .inputValue();
        console.log("Claim's Reference Id:", referenceId);
        //this returns the reference Id to be used in other methods
        return referenceId;
      } catch (error) {
        console.error("❌ Could not locate or read Reference Id field:", error);
        throw error;
        }
        
      }
  async navigateToClaimsPage(){
      await this.claimLnk.click();await this.claimLnk.click();
      await this.page.waitForTimeout(2000);

  }
       
}
     

              
        
        
        
        
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