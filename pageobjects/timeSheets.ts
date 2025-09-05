import { Page, FrameLocator } from '@playwright/test';

export default class TimeSheets {
    constructor(public page: Page, public frame: FrameLocator) {}
      
        async fillWeekdayHours(hours: string = '8') {
           
            const daySelectors = {
                monday: '//input[@id="QTY_DAY2$0"]',
                tuesday: '//input[@id="QTY_DAY3$0"]',
                wednesday: '//input[@id="QTY_DAY4$0"]',
                thursday: '//input[@id="QTY_DAY5$0"]',
                friday: '//input[@id="QTY_DAY6$0"]',
            };

            for (const [day, xpath] of Object.entries(daySelectors)) {
                const input = this.frame.locator(xpath);
                try {
                await input.waitFor({ state: 'visible' });
                await input.fill(hours);
                await input.evaluate(el => el.blur()); // triggers onchange if needed
                } catch (error) {
                console.warn(`Failed to fill hours for ${day}:`, error);
                }
            }
        }
        
    
        // this is the value for working hours .- can be changed if needed to lookup for visible text
        async selectTimeReportingCode() {
        await this.frame.locator('#TRC\\$0').selectOption('MHRSI'); // remember to escape $ with \\ for the locator´s id
        await this.page.waitForTimeout(4000) 
            
    }
        // this just fills the Project ID directly instead of the lookup & will get verified 
        // by the test in the project description field that get autopopulated
        async enterProjectID() {
        const input = this.frame.locator('#AX_PROJECT_ID\\$0');
        await input.type('04179');
        await input.press('Enter');
        await this.frame.locator('//span[contains(text(), "General Non Billable")]').waitFor({ state: 'visible' });
    }

        // this just fills the activity ID directly instead of the lookup & will get verified 
        // by the test in the activity description field that get autopopulated
        async enterActivityID() {
        const input = this.frame.locator('#ACTIVITY_ID\\$0')
        await input.type('NB_HRS');
        await input.press('Enter');
        await this.frame.locator('//span[contains(text(), "GENERAL_NON_BILLABLE_HOURS")]').waitFor({ state: 'visible' });
    }
        async clickSubmit() {
        await this.frame.locator('#TL_SAVE_PB').click();
    }

};