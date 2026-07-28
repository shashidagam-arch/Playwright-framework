import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
import { HomePage } from '../pages/HomePage';

dotenv.config({ path: '.env.qa' });

test('Login Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // await page.pause();
  // await loginPage.login(
  //   process.env.USERNAME!,
  //   process.env.PASSWORD!
  // );
  await loginPage.login('standard_user'
    , 'secret_sauce'

  );
  await homePage.clickOnAddToCartButton();

});

