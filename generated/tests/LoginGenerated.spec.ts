
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("to login into SauceDemo", async ({ page }) => {

    const generatedPage =
        new LoginPage(page);

    // TODO:
    // Generated from user story

});
