export const StoryMappings = {
  Login: {
    actionName: "login",

    parameters: ["username", "password"],

    testImports: "",

    testSteps: `
    await page.goto(process.env.BASE_URL!);

    await generatedPage.login(
      "standard_user",
      "secret_sauce"
    );
    `,

    elements: [
      {
        name: "usernameInput",
        locator: "#user-name",
        tag: "input",
        placeholder: "Username",
      },

      {
        name: "passwordInput",
        locator: "#password",
        tag: "input",
        placeholder: "Password",
      },

      {
        name: "loginButton",
        locator: "#login-button",
        tag: "button",
        text: "Login",
      },
    ],

    actions: [
      {
        type: "type",
        element: "usernameInput",
        value: "username",
      },

      {
        type: "type",
        element: "passwordInput",
        value: "password",
      },

      {
        type: "click",
        element: "loginButton",
      },
    ],
  },

  Cart: {
    actionName: "addToCart",

    parameters: [],

    testImports: `
import { LoginPage } from "../pages/LoginPage";
`,

    testSteps: `
    await page.goto(process.env.BASE_URL!);

    const loginPage =
      new LoginPage(page);

    await loginPage.login(
      "standard_user",
      "secret_sauce"
    );

    await generatedPage.addToCart();
    `,

    elements: [
      {
        name: "backpackItem",
        locator: "#add-to-cart-sauce-labs-backpack",
        tag: "button",
        text: "Add to cart",
      },

      {
        name: "cartIcon",
        locator: ".shopping_cart_link",
        tag: "a",
      },
    ],

    actions: [
      {
        type: "click",
        element: "backpackItem",
      },

      {
        type: "click",
        element: "cartIcon",
      },
    ],
  },
};
