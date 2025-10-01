import { Locator, Page, expect } from '@playwright/test';

export default class PimPage {
    readonly nameInput:         Locator
    readonly lastnameInput:     Locator
    readonly addBtn:            Locator
    readonly saveBtn:           Locator
    readonly employeeIdInput:   Locator

    constructor(public page: Page) {
        this.nameInput = page.getByPlaceholder('First name');
        this.lastnameInput = page.getByPlaceholder('Last name');
        this.employeeIdInput = page.locator('text=Employee Id').locator('xpath=following::input[1]');
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
     }

    async registerEmployee(name: string, lastname: string): Promise<void> {
        await this.addBtn.click();
        await this.nameInput.fill(name);
        await this.lastnameInput.fill(lastname);
        // generates 4 digit random number for employee ID
        const randomId = Math.floor(1000 + Math.random() * 9000).toString();
        await this.employeeIdInput.fill(randomId);
        await this.saveBtn.click();
        // Verifying the employee was added
        const successMessage = this.page.locator('.oxd-toast-content', { hasText: 'Success' });
        await expect(successMessage).toBeVisible();
        console.log('Employee added successfully.'); 
    }
}