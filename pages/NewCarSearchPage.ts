import { Page } from '@playwright/test';

export class NewCarSearchPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchCar(query: string) {
        await this.page.locator('//input[@id="headerSearch" and @type="text"]').fill(query);
        await this.page.locator('//span[@class="icon-zw-search abs i-b c-p" and @role="button"]').click();
        await this.page.getByText('All Maruti Cars').click();
        await this.page.waitForTimeout(3000);
    }

    async selectCarByName(carName: string) {
        await this.page.locator(`a[title='${carName}']`).click();
        await this.page.waitForTimeout(3000);
    }
}
