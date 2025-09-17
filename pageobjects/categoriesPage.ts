import { expect, Page } from '@playwright/test';

export default class CategoriesPage {
    constructor(public page: Page) {}
    // method that returns the category locators in a promised string array
    
    async getCategoryNames(): Promise<string[]> {
    //await this.page.waitForTimeout(3000);
    const categoryElements = this.page.locator('.category-table tbody tr td:first-child');
    const count = await categoryElements.count();
    const names: string[] = [];
    // stores the names of the categories by iterating the category locators
    for (let i = 0; i < count; i++) {
      const name = await categoryElements.nth(i).innerText();
      names.push(name.trim());
    }
    return names;
  }

  // checks for a specific category and adds it if it doesnt
  async addCategoryIfNotExists(catName: string) {
    await this.page.waitForSelector('.category-table tbody tr td:first-child', { state: 'visible' });
    const categoriesName = await this.getCategoryNames();
      if (categoriesName.includes(catName)) {
        console.log(`${catName}, already exists.`);
        return
      }else{
        // handle the alert popup to add catName and click OK
          this.page.on('dialog', async dialog => {
          await dialog.accept(catName);
        });
        // Click the add category button to trigger the alert
        await this.page.click("//div[@class='manage-btns']//button[1]");
        await this.page.waitForLoadState('networkidle');
        console.log(`Category "${catName}" added.`);
      }
  }
  // verifies if a category exists, returns true or false
  async verifyCategoryExists(catName: string): Promise<boolean> {
    const categoriesName = await this.getCategoryNames();
    return categoriesName.includes(catName);
  }

  // Delete the category you just created
  async deleteCategory(catName: string) {
    const categoriesName = await this.getCategoryNames();
    //console.log(categoriesName); only when debugging
    if (categoriesName.includes(catName)) {
      const row = this.page.locator('tr', { hasText: catName });
      await expect(row).toBeVisible();
      await row.locator('button.delete-btn').click();
      //confirm the delete popup
      await expect (this.page.locator('.modal-content')).toBeVisible();
      await this.page.locator("//button[text()='Delete']").click();
      await this.page.waitForTimeout(2000);
    //console.log(`Category "${catName}" deleted.`);
    } else {
    console.log(`Category "${catName}" not found, cannot delete.`);
    }
  }

  // Verify the category you just created was deleted
  async confirmDelete(catName: string): Promise<boolean> {
    const updatedCategoriesName = await this.getCategoryNames();
    const isDeleted = !updatedCategoriesName.includes(catName)
    if (isDeleted) {
      console.log(`Category "${catName}" successfully deleted.`);
    } else {
    console.log(`Category "${catName}" not found, cannot delete.`);
    }
  return isDeleted;
  }

};