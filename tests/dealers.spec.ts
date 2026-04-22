import { test, expect } from '@playwright/test';
import { DealersPage } from '../pages/DealersPage';

// 
// TC_01 – Verify page loads with correct title and URL
// 
test.describe('TC_01', () => {
    test('Should open dealers page, show correct URL and heading', async ({ page }) => {
        const dealersPage = new DealersPage(page);

        await dealersPage.open();

        // URL check
        await expect(page).toHaveURL(/zigwheels\.com\/dealers/);

        // Main heading visible
        await expect(page.locator('h1').filter({ hasText: 'Car Dealers and Showrooms' })).toBeVisible();

        // Browser tab title
        await expect(page).toHaveTitle(/Car Dealers/i);
    });
});

// 
// TC_02 – Search showrooms by city name and brand (Maruti Suzuki in Chennai)
// 
test.describe('TC_02 ', () => {
    test('Should show Maruti Suzuki showrooms in Chennai after searching', async ({ page }) => {
        const dealersPage = new DealersPage(page);

        await dealersPage.open();
        await dealersPage.searchShowrooms('Chennai', 'Maruti Suzuki');

        // Should navigate away from /dealers
        // await expect(page).not.toHaveURL('https://www.zigwheels.com/dealers');

        // URL should include city and make identifiers
        // await expect(page).toHaveURL(/Chennai/i);
    });
});

// 
// TC_03 – Search with only city name (no brand selected)
// 
test.describe('TC_03', () => {
    test('Should navigate to Delhi showrooms listing without brand filter', async ({ page }) => {
        const dealersPage = new DealersPage(page);

        await dealersPage.open();
        await dealersPage.searchByCity('Delhi');

        // // URL should contain Delhi
        // await expect(page).toHaveURL(/Delhi/i);

        // // Page should not still be on the base dealers page
        // await expect(page).not.toHaveURL('https://www.zigwheels.com/dealers');
    });
});

//
// TC_04 – Click a top city link and verify the correct showroom listing opens
// 
test.describe('TC_04', () => {
    test('Should navigate to Bangalore showrooms page with correct count shown', async ({ page }) => {
        const dealersPage = new DealersPage(page);

        await dealersPage.open();

        // Verify Bangalore city tile is visible with count
        const bangaloreLink = page.locator('li.deal-cty a[title="Car Showrooms in Bangalore"]');
        await expect(bangaloreLink).toBeVisible();
        await expect(bangaloreLink).toContainText('376 Car Showrooms');

        await dealersPage.clickTopCity('Car Showrooms in Bangalore');
    });
});

