import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PopularCarsPage } from '../pages/PopularCarsPage';
import { FirstPopularCarPage } from '../pages/FirstPopularCarPage';

test.describe('Should display the name of the first popular car', () => {
    test('Navigate to popular cars and print first car name', async ({ page }) => {
        const homePage = new HomePage(page);
        const popularCarsPage = new PopularCarsPage(page);
        const firstPopularCarPage = new FirstPopularCarPage(page);

        await homePage.open();
        await homePage.navigateToPopularCars();
        await popularCarsPage.clickFirstPopularCar();
        await firstPopularCarPage.getCarName();
    });
});

test.describe('Should display the name and specifications of the first popular car', () => {
    test('Navigate to popular cars and print first car name and specifications', async ({ page }) => {
        const homePage = new HomePage(page);
        const popularCarsPage = new PopularCarsPage(page);
        const firstPopularCarPage = new FirstPopularCarPage(page);

        await homePage.open();
        await homePage.navigateToPopularCars();
        await popularCarsPage.clickFirstPopularCar();
        await firstPopularCarPage.getCarName();
        await firstPopularCarPage.getCarSpecifications();
    });
});
