import fs from "fs";
import path from "path";

import { StoryParser } from "./StoryParser";

export class TestGenerator {
  static generate(story: string, fileName: string): void {
    const userStory = StoryParser.parse(story);

    const testContent = `
import { test, expect } from "@playwright/test";

test("${userStory.goal}", async ({ page }) => {

    // TODO:
    // Generated from user story

});
`;

    const outputPath = path.join("tests", "generated", `${fileName}.spec.ts`);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    fs.writeFileSync(outputPath, testContent);

    console.log(`Generated: ${outputPath}`);
  }
}
