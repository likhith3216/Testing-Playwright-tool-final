import { Page, expect } from '@playwright/test';

export class PopularCarsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyPageHeading() {
        const heading = this.page.getByText('Popular Cars in India 2026');
        await expect(heading).toBeVisible();
    }

    async clickFirstPopularCar() {
        await this.verifyPageHeading();
        await this.page.locator('ul>li>div>div>img').first().click();
    }
}
