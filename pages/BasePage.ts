import { Locator, Page } from "@playwright/test";
import { IElementDefinition } from "../elements/IElementDefinition";
import { LocatorHealer } from "../healing/LocatorHealer";
import { WaitHelper } from "../utils/WaitHelper";
import { RetryHelper } from "../utils/retryHelper";

export class BasePage {
  protected page: Page;
  protected healer: LocatorHealer;

  constructor(page: Page) {
    this.page = page;
    this.healer = new LocatorHealer(page);
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  protected getLocator(element: IElementDefinition): Locator {
    return this.page.locator(element.locator);
  }

  async click(element: IElementDefinition): Promise<void> {
    try {
      const locator = this.getLocator(element);

      await WaitHelper.waitForElement(locator);
      await RetryHelper.retry(async () => {
        await locator.click();
      });
    } catch (error) {
      console.log(`[HEALING] Failed locator: ${element.locator}`);

      const healedLocator = await this.healer.heal(element);

      await WaitHelper.waitForElement(healedLocator);
      await RetryHelper.retry(async () => {
        await healedLocator.click();
      });
    }
  }

  async type(element: IElementDefinition, text: string): Promise<void> {
    try {
      const locator = this.getLocator(element);

      await WaitHelper.waitForElement(locator);

      await RetryHelper.retry(async () => {
        await locator.fill(text, {
          timeout: 2000,
        });
      });
    } catch (error) {
      console.log(`[HEALING] Failed locator: ${element.locator}`);

      const healedLocator = await this.healer.heal(element);

      await WaitHelper.waitForElement(healedLocator);
      await RetryHelper.retry(async () => {
        await healedLocator.fill(text);
      });
    }
  }
  async isVisible(element: IElementDefinition): Promise<boolean> {
    return await this.getLocator(element).isVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
