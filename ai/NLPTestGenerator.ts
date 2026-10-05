import fs from "fs";
import path from "path";

import { NLPCommandParser } from "./NLPCommandParser";
import { ActionRegistry } from "./ActionRegistry";

export class NLPTestGenerator {
  static generate(commands: string, fileName: string): void {
    const actions = NLPCommandParser.parse(commands);

    const imports = new Set<string>();

    const pages = new Set<string>();

    let testSteps = `
    await page.goto(
        process.env.BASE_URL!
    );

`;

    for (const action of actions) {
      const mapping =
        ActionRegistry[action.action as keyof typeof ActionRegistry];

      if (!mapping) {
        continue;
      }

      imports.add(
        `import { ${mapping.page} } from "../../pages/${mapping.page}";`,
      );

      pages.add(mapping.page);
    }

    for (const page of pages) {
      const variableName = page.charAt(0).toLowerCase() + page.slice(1);

      testSteps += `
    const ${variableName} =
        new ${page}(page);

`;
    }

    for (const action of actions) {
      const mapping =
        ActionRegistry[action.action as keyof typeof ActionRegistry];

      if (!mapping) {
        continue;
      }

      const variableName =
        mapping.page.charAt(0).toLowerCase() + mapping.page.slice(1);

      const args = action.args.map((arg) => `"${arg}"`).join(", ");

      testSteps += `
    await ${variableName}.${mapping.method}(
        ${args}
    );

`;
    }

    const testContent = `
import { test } from "@playwright/test";
${[...imports].join("\n")}

test("NLP Generated Test", async ({ page }) => {

${testSteps}

});
`;

    const outputDir = path.join("generated", "nlp");

    fs.mkdirSync(outputDir, { recursive: true });

    fs.writeFileSync(path.join(outputDir, `${fileName}.spec.ts`), testContent);

    console.log(
      `Generated NLP Test:
generated/nlp/${fileName}.spec.ts`,
    );
  }
}
