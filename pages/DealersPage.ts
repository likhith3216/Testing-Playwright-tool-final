import { Page, expect } from '@playwright/test';

export class DealersPage {
    private page: Page;

    // Locators
    readonly pageHeading         = () => this.page.locator('h1').filter({ hasText: 'Car Dealers and Showrooms' });
    readonly cityInput           = () => this.page.locator('#dealer_city');
    readonly makeDropdown        = () => this.page.locator('#dealer_make');
    readonly searchButton        = () => this.page.locator('button.btn-p');
    readonly brandSlider         = () => this.page.locator('#zwn-brandslider');
    readonly trendingSection     = () => this.page.locator('#trending');
    readonly trendingCards       = () => this.page.locator('#similarSlider li.sl-card');

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.zigwheels.com/dealers');
        await expect(this.page).toHaveURL(/zigwheels\.com\/dealers/);
    }

    // TC_01: Page load verification
    async verifyPageLoaded() {
        await expect(this.pageHeading()).toBeVisible();
        await expect(this.page).toHaveTitle(/Car Dealers/i);
    }

    // TC_02: Search with city + brand
    async searchShowrooms(city: string, make?: string) {
        await this.cityInput().fill(city);

        // trigger city validation + make load
        await this.cityInput().blur();

        if (make) {
            await this.page.waitForTimeout(1500); // wait for makes to populate dynamically
            await this.makeDropdown().selectOption({ label: make });
        }
        await this.searchButton().click();
    }

    // TC_03: Search with only city
    async searchByCity(city: string) {
        await this.cityInput().fill(city);
        await this.cityInput().blur();
        await this.page.waitForTimeout(500);
        await this.searchButton().click();
    }

    // TC_04: Click a top city link
    async clickTopCity(cityTitle: string) {
        const city = this.page.locator(`li.deal-cty a[title="${cityTitle}"]`);
        await expect(city).toBeVisible();
        await city.click();
    }

}
