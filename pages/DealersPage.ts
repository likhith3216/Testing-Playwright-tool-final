import { Page, expect } from '@playwright/test';

export class DealersPage {
    private page: Page;

    // Locators
    // private pageHeading         = () => this.page.locator('h1').filter({ hasText: 'Car Dealers and Showrooms' });
    // private cityInput           = () => this.page.locator('#dealer_city');
    // private makeDropdown        = () => this.page.locator('#dealer_make');
    // private searchButton        = () => this.page.locator('button.btn-p');
    private brandSlider         = () => this.page.locator('#zwn-brandslider');
    private trendingSection     = () => this.page.locator('#trending');
    private trendingCards       = () => this.page.locator('#similarSlider li.sl-card');

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.zigwheels.com/dealers');
        await expect(this.page).toHaveURL(/zigwheels\.com\/dealers/);
    }

    // TC_01: Page load verification
    async verifyPageLoaded() {
        await expect(this.page.locator('h1').filter({ hasText: 'Car Dealers and Showrooms' })).toBeVisible();
        await expect(this.page).toHaveTitle(/Car Dealers/i);
    }

    // TC_02: Search with city + brand
    async searchShowrooms(city: string, make?: string) {
        await this.page.locator('#dealer_city').fill(city);

        // trigger city validation + make load
        await this.page.locator('#dealer_city').blur();

        if (make) {
            await this.page.waitForTimeout(1500); // wait for makes to populate dynamically
            await  this.page.locator('#dealer_make').selectOption({ label: make });
        }
        await this.page.locator('button.btn-p').click();
    }

    // TC_03: Search with only city
    async searchByCity(city: string) {
        await this.page.locator('#dealer_city').fill(city);
        await this.page.locator('#dealer_city').blur();
        await this.page.waitForTimeout(500);
        await this.page.locator('button.btn-p').click();
    }

    // TC_04: Click a top city link
    async clickTopCity(cityTitle: string) {
        const city = this.page.locator(`li.deal-cty a[title="${cityTitle}"]`);
        await expect(city).toBeVisible();
        await city.click();
    }

}
