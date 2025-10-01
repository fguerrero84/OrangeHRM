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
        await this.page.waitForTimeout(2000); // wait for 2 seconds to ensure the UI is updated
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
        await this.page.waitForTimeout(2000); // wait for 2 seconds to ensure the UI is updated
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
      await this.claimLnk.click();
      

  }
       
}