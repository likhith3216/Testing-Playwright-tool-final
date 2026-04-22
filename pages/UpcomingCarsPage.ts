import { Page, expect } from '@playwright/test';

export class UpcomingCarsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async sortByPopularity() {
        await this.page.locator('#sorting').selectOption('Popularity');
    }

    async getCarPrice(carName: string): Promise<string> {
        await this.page.getByRole('link', { name: carName }).click();
        const price = this.page.locator('div>ul>li>span>span', { hasText: '70.00 Lakh' }).first();
        const priceText = await price.innerText();
        console.log(`Price of ${carName}:`, priceText);
        return priceText;
    }

    async getCarsByMonth(month: string) {
        const allTexts = await this.page.locator('.clr-try.fnt-14').allTextContents();
        const filteredCars = allTexts.filter(text => text.includes(month));
        console.log(`Cars launching in ${month}:`, filteredCars);
        await expect(filteredCars.length).toBeGreaterThan(0);
    }

    async getAllCarsGroupedByMonth() {
        const allTexts = await this.page.locator('.clr-try.fnt-14').allTextContents();
        const monthMap: Record<string, number> = {};

        allTexts.forEach((text: string) => {
            const match = text.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/);
            if (match) {
                const month = match[0];
                monthMap[month] = (monthMap[month] || 0) + 1;
            }
        });

        console.log('Cars grouped by month:', monthMap);
    }

    async clickCarByName(carName: string) {
        await this.page.locator(`//strong[@class="lnk-hvr block of-hid h-height txt-ulne" and text()='${carName}']`).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickAlertMeButton() {
        await this.page.locator('span.btn.btn-primary', { hasText: 'Alert Me When Launched' }).click();
    }

}
