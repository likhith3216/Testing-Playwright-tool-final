import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NewCarSearchPage } from '../pages/NewCarSearchPage';

test.describe('Search for a new car by name', () => {
    test('Should navigate to new cars, search and select Maruti Suzuki Swift', async ({ page }) => {
        const homePage = new HomePage(page);
        const newCarSearchPage = new NewCarSearchPage(page);

        await homePage.open();
        await homePage.navigateToNewCarsSearch();
        await newCarSearchPage.searchCar('Maruthi suziki');
        await newCarSearchPage.selectCarByName('Maruti Suzuki Swift');
    });
});
