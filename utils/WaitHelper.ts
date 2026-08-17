import { Locator, Page } from "@playwright/test";

export class WaitHelper {

    static async waitForElement(
        locator: Locator,
        timeout = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: "visible",
            timeout
        });
    }

    static async waitForPageLoad(
        page: Page
    ): Promise<void> {

        await page.waitForLoadState(
            "networkidle"
        );
    }

    static async waitForSpinnerToDisappear(
        page: Page,
        spinnerSelector: string
    ): Promise<void> {

        const spinner =
            page.locator(spinnerSelector);

        if (await spinner.count() > 0) {

            await spinner.waitFor({
                state: "hidden",
                timeout: 15000
            });

        }
    }
}