import fs from "fs";
import path from "path";

import { StoryParser } from "./StoryParser";
import { ElementGenerator } from "./ElementGenerator";
import { PageGenerator } from "./PageGenerator";
import { StoryMappings } from "./StoryMappings";

export class TestGenerator {
  static generate(story: string, fileName: string): void {
    const userStory = StoryParser.parse(story);

    console.log("UserStory......", userStory);

    const mapping =
      StoryMappings[userStory.pageName as keyof typeof StoryMappings];

    if (!mapping) {
      throw new Error(`No mapping found for ${userStory.pageName}`);
    }

    const elementsContent = ElementGenerator.generate(userStory);

    const pageContent = PageGenerator.generate(userStory);
    const testContent = `
import { test } from "@playwright/test";
import { ${userStory.pageName}Page } from "../pages/${userStory.pageName}Page";
${mapping.testImports ?? ""}

test("${userStory.goal}", async ({ page }) => {

    const generatedPage =
        new ${userStory.pageName}Page(page);

${mapping.testSteps}

});
`;

    const generatedRoot = path.join("generated");

    const elementsDir = path.join(generatedRoot, "elements");

    const pagesDir = path.join(generatedRoot, "pages");

    const testsDir = path.join(generatedRoot, "tests");

    fs.mkdirSync(elementsDir, { recursive: true });

    fs.mkdirSync(pagesDir, { recursive: true });

    fs.mkdirSync(testsDir, { recursive: true });

    fs.writeFileSync(
      path.join(elementsDir, `${userStory.pageName}PageElements.ts`),
      elementsContent,
    );

    fs.writeFileSync(
      path.join(pagesDir, `${userStory.pageName}Page.ts`),
      pageContent,
    );

    fs.writeFileSync(path.join(testsDir, `${fileName}.spec.ts`), testContent);

    console.log(
      `Generated Elements:
generated/elements/${userStory.pageName}PageElements.ts`,
    );

    console.log(
      `Generated Page:
generated/pages/${userStory.pageName}Page.ts`,
    );

    console.log(
      `Generated Test:
generated/tests/${fileName}.spec.ts`,
    );
  }
}
