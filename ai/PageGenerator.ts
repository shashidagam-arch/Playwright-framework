import { UserStory } from "./Models/UserStory";
import { StoryMappings } from "./StoryMappings";

export class PageGenerator {
  static generate(story: UserStory): string {
    const mapping = StoryMappings[story.pageName as keyof typeof StoryMappings];

    if (!mapping) {
      throw new Error(`No mapping found for ${story.pageName}`);
    }

    const parameters = mapping.parameters?.length
      ? mapping.parameters.map((param) => `${param}: string`).join(", ")
      : "";

    let actionsContent = "";

    for (const action of mapping.actions) {
      if (action.type === "type") {
        const value = "value" in action ? action.value : '""';

        actionsContent += `
        await this.type(
            ${story.pageName}PageElements.${action.element},
            ${value}
        );
`;
      }

      if (action.type === "click") {
        actionsContent += `
        await this.click(
            ${story.pageName}PageElements.${action.element}
        );
`;
      }
    }

    return `
import { Page } from "@playwright/test";
import { ${story.pageName}PageElements } from "../elements/${story.pageName}PageElements";
import { BasePage } from "../../pages/BasePage";

export class ${story.pageName}Page extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async ${mapping.actionName}(
        ${parameters}
    ) {

${actionsContent}
    }
}
`;
  }
}
