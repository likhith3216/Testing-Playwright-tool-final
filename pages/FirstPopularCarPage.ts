import { Page } from '@playwright/test';

export class FirstPopularCarPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getCarName() {
        const carName = await this.page.locator('.model-right > h1').innerText();
        console.log('Car Name:', carName);
        // return carName;
    }

    async getCarSpecifications() {
        const specs = await this.page.locator('.topSpec > tbody > tr > td').allInnerTexts();
        console.log('Specifications:', specs);
        // return specs;
    }
}
