import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";

test("NLP Generated Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const loginPage = new LoginPage(page);

  const homePage = new HomePage(page);

  await loginPage.login("standard_user", "standard_password");

  await homePage.clickOnAddToCartButton("Sauce Labs Backpack");

  await homePage.clickOnCartICon();

  await homePage.clickOnRemoveButton();
});
