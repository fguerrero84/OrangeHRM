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
      async selectEmployee(name: string): Promise<void> {
          await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(name);
          await this.page.waitForSelector(`text=${name}`, { timeout: 5000 });
          await this.page.getByText(name).click();
          
        }

      async addClaim(employee:string): Promise<void> {
        // Click the "Add New Course" button
        await this.assignClaimBtn.click();
        // Searching for the employee name by calling selectEmployee method
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
      // Method not in use, but will check details of the employee 
      async viewExpensesDetails(employee:string): Promise<void>{
          const row = this.page.locator('.oxd-table-row').filter({
            has: this.page.getByText(employee),
          }).filter({
            has: this.page.getByText('Medical Reimbursement'),
          });
          await row.getByRole('button', { name: 'View Details' }).click();

      }
        
    };       