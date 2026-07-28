import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";


export class HomePage extends BasePage {

    readonly btnAddToCart;
    readonly itemCarts;
    readonly txtItemName;

    constructor(page: Page) {
        super(page);
        this.btnAddToCart = page.locator("//button[contains(@class,'btn_inventory')]");
        this.itemCarts = page.locator("//div[contains(@class,'inventory_item_description')]");
        this.txtItemName = page.locator("//div[contains(@class,'inventory_item_name ')]");


    }


    async clickOnAddToCartButton() {
        const count = await this.txtItemName.count();

        for (let i = 0; i < count; i++) {
            const itemName = await this.txtItemName.nth(i).textContent();

            if (itemName?.trim() === "Sauce Labs Bike Light") {
                await this.btnAddToCart.nth(i).click();
                break;
            }
        }
    }

}