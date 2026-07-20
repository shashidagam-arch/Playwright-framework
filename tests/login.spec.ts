import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.qa' });

test('Login Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const loginPage = new LoginPage(page);

  await loginPage.login(
    process.env.USERNAME!,
    process.env.PASSWORD!
  );
});