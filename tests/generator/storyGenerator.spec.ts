// import fs from "fs";
// import path from "path";
// import { test } from "@playwright/test";
// import { TestGenerator } from "../../ai/TestGenerator";

// test("Generate Login and Cart Tests", async () => {
//   const storiesDir = path.resolve("stories");

//   if (!fs.existsSync(storiesDir)) {
//     fs.mkdirSync(storiesDir, {
//       recursive: true,
//     });
//   }

//   const loginStoryPath = path.join(storiesDir, "login.story");

//   const cartStoryPath = path.join(storiesDir, "cart.story");

//   if (!fs.existsSync(loginStoryPath)) {
//     fs.writeFileSync(
//       loginStoryPath,
//       `
// As a standard user
// I want to login into SauceDemo
// So that I can access the inventory
// `.trim(),
//     );
//   }

//   if (!fs.existsSync(cartStoryPath)) {
//     fs.writeFileSync(
//       cartStoryPath,
//       `
// As a standard user
// I want to add a backpack to cart
// So that I can purchase it later
// `.trim(),
//     );
//   }

//   const stories = [
//     {
//       file: loginStoryPath,
//       output: "LoginGenerated",
//     },
//     {
//       file: cartStoryPath,
//       output: "CartGenerated",
//     },
//   ];

//   for (const story of stories) {
//     const content = fs.readFileSync(story.file, "utf-8");

//     TestGenerator.generate(content, story.output);
//   }
// });
