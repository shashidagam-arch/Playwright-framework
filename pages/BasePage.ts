import { Locator, Page } from "@playwright/test";
import { IElementDefinition } from "../elements/IElementDefinition";
import { LocatorHealer } from "../healing/LocatorHealer";

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
      await this.getLocator(element).click();
    } catch (error) {
      console.log(`[HEALING] Failed locator: ${element.locator}`);

      const healedLocator = await this.healer.heal(element);

      await healedLocator.click();
    }
  }

  async type(element: IElementDefinition, text: string): Promise<void> {
    try {
      await this.page.locator(element.locator).fill(text, {
        timeout: 2000,
      });
    } catch (error) {
      console.log(`[HEALING] Failed locator: ${element.locator}`);

      const healedLocator = await this.healer.heal(element);

      await healedLocator.fill(text);
    }
  }
  async isVisible(element: IElementDefinition): Promise<boolean> {
    return await this.getLocator(element).isVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
