import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class HomePage extends BasePage {
  readonly btnAddToCart;
  readonly itemCarts;
  readonly txtItemName;
  readonly iconCart;
  readonly listofCartItems;
  readonly listOfItemNamesInCart;
  readonly btnRemove;

  constructor(page: Page) {
    super(page);
    this.btnAddToCart = page.locator(
      "//button[contains(@class,'btn_inventory')]",
    );
    this.itemCarts = page.locator(
      "//div[contains(@class,'inventory_item_description')]",
    );
    this.txtItemName = page.locator(
      "//div[contains(@class,'inventory_item_name ')]",
    );
    this.iconCart = page.locator("//a[@class='shopping_cart_link']");
    this.listofCartItems = page.locator("//div[@class='cart_item']");
    this.listOfItemNamesInCart = page.locator(
      "//div[@data-test='inventory-item-name']",
    );
    this.btnRemove = page.getByRole("button", { name: "Remove" });
  }
  async clickOnRemoveButton() {
    await this.btnRemove.nth(1).click();
  }
  async getCartItemNamesText() {
    return await this.listOfItemNamesInCart.allTextContents();
  }

  async clickOnCartICon() {
    await this.iconCart.click();
  }

  async clickOnAddToCartButton(itemName: string): Promise<void> {
    const count = await this.txtItemName.count();

    for (let i = 0; i < count; i++) {
      const currentItemName = await this.txtItemName.nth(i).textContent();

      if (currentItemName?.trim() === itemName) {
        await this.btnAddToCart.nth(i).click();
        break;
      }
    }
  }
}
