import { Locator, Page, expect } from "@playwright/test";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) || "";
    }

    async isVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async getPageTitle() {
        return await this.page.title();
    }
}
