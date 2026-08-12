import { test, expect } from "@playwright/test";
import { LoginApi } from "../../api/Client/LoginApi";

test("verify Login API", async () => {
  const loginApi = new LoginApi();
  
  console.log("BASE_URL =", process.env.BASE_URL);
  console.log("API_URL =", process.env.API_URL);

  const response = await loginApi.login({
    username: "eve.holt@reqres.in",
    password: "cityslicka",
  });

  const body = await response.json();

  console.log("Status:", response.status());
  console.log("Response:", body);

  expect(response.status()).toBe(200);
  expect(body.token).toBeTruthy();
});
