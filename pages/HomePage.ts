import { Page, expect } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.zigwheels.com');
        await expect(this.page).toHaveURL('https://www.zigwheels.com/');
    }

    async navigateToNewCarsSearch() {
        await this.page.getByText('NEW CARS', { exact: true }).click();
        await this.page.getByText('Search New Cars').click();
    }

    async navigateToPopularCars() {
        await this.page.getByText('NEW CARS', { exact: true }).click();
        await this.page.getByRole('link', { name: 'Popular Cars', exact: true }).click();
    }

    async navigateToUpcomingCars() {
        await this.page.getByText('NEW CARS', { exact: true }).click();
        await this.page.getByRole('link', { name: 'Upcoming Cars' }).click();
    }
}
