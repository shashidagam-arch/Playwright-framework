import { test } from "@playwright/test";
import { TestGenerator } from "../../ai/TestGenerator";

test("Generate Login Test", async () => {

    const story = `
As a standard user
I want to login into SauceDemo
So that I can access the inventory
`;

    TestGenerator.generate(
        story,
        "LoginGenerated"
    );
});