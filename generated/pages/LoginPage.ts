
import { Page } from "@playwright/test";
import { LoginPageElements } from "../elements/LoginPageElements";
import { BasePage } from "../pages/BasePage";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async login(
        username: string,
        password: string
    ) {

        await this.type(
            LoginPageElements.usernameInput,
            username
        );

        await this.type(
            LoginPageElements.passwordInput,
            password
        );

        await this.click(
            LoginPageElements.loginButton
        );
    }
}
