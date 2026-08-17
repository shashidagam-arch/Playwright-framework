import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage"
import dotenv from "dotenv";
import { HomePage } from "../../pages/HomePage";

dotenv.config({ path: ".env.qa" });

test("Login Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // await page.pause();
  // await loginPage.login(
  //   process.env.USERNAME!,
  //   process.env.PASSWORD!
  // );
  await loginPage.login("standard_user", "secret_sauce");
  await homePage.clickOnAddToCartButton("Sauce Labs Backpack");
  await homePage.clickOnAddToCartButton("Sauce Labs Bike Light");
  await homePage.clickOnAddToCartButton("Sauce Labs Bolt T-Shirt");
  await homePage.clickOnAddToCartButton("Sauce Labs Fleece Jacket");
  await homePage.clickOnCartICon();
  await homePage.clickOnRemoveButton();
  const listOftext = await homePage.getCartItemNamesText();
  console.log(listOftext);
});
