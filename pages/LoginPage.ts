import { Page } from "@playwright/test"
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {

    private usernameInput;
    private passwordInput;
    private loginButton;

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    async login(username: string, password: string) {

        await this.type(this.usernameInput, username);

        await this.type(this.passwordInput, password);

        await this.click(this.loginButton);
    }
}