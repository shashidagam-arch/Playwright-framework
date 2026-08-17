import { IElementDefinition } from "./IElementDefinition";

export const LoginPageElements: Record<string, IElementDefinition> = {
  usernameInput: {
    name: "usernameInput",
    locator: "#user-name-broken",
    tag: "input",
    placeholder: "Username",
  },

  passwordInput: {
    name: "passwordInput",
    locator: "#password",
    tag: "input",
    placeholder: "Password",
  },

  loginButton: {
    name: "loginButton",
    locator: "#login-button",
    tag: "button",
    text: "Login",
  },
};
