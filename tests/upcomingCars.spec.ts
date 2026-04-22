import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { UpcomingCarsPage } from '../pages/UpcomingCarsPage';

test.describe('Should sort upcoming cars by popularity and verify Audi A6 2026 price', () => {
    //Should sort upcoming cars by popularity and verify Audi A6 2026 price
    test('Sort by popularity and check Audi A6 2026 price', async ({ page }) => {
        const homePage = new HomePage(page);
        const upcomingCarsPage = new UpcomingCarsPage(page);

        await homePage.open();
        await homePage.navigateToUpcomingCars();
        await upcomingCarsPage.sortByPopularity();
        await upcomingCarsPage.getCarPrice('Audi A6 2026');
    });
});


//   group all cars based on month they launch
test.describe('Should list all upcoming cars launching in May', () => {
    test('Filter and display cars with May launch date', async ({ page }) => {
        const homePage = new HomePage(page);
        const upcomingCarsPage = new UpcomingCarsPage(page);

        await homePage.open();
        await homePage.navigateToUpcomingCars();
        await upcomingCarsPage.getCarsByMonth('May');
    });
});

test.describe('Should display count of upcoming cars grouped by launch month', () => {
    test('Print all upcoming cars grouped by their launch month', async ({ page }) => {
        const homePage = new HomePage(page);
        const upcomingCarsPage = new UpcomingCarsPage(page);

        await homePage.open();
        await homePage.navigateToUpcomingCars();
        await upcomingCarsPage.getAllCarsGroupedByMonth();
    });
});

test.describe('Alert Me button is clicked of an ', () => {
    test('Click Alert Me on Hyundai Inster', async ({ page }) => {
        const homePage = new HomePage(page);
        const upcomingCarsPage = new UpcomingCarsPage(page);

        await homePage.open();
        await homePage.navigateToUpcomingCars();
        await upcomingCarsPage.clickCarByName('Hyundai Inster');
        await upcomingCarsPage.clickAlertMeButton();
    });
});
