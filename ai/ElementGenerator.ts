import { UserStory } from "./Models/UserStory";
import { StoryMappings } from "./StoryMappings";

export class ElementGenerator {
  static generate(story: UserStory): string {
    const mapping = StoryMappings[story.pageName as keyof typeof StoryMappings];

    if (!mapping) {
      throw new Error(`No mapping found for ${story.pageName}`);
    }

    let content = `
import { IElementDefinition } from "../../elements/IElementDefinition";

export const ${story.pageName}PageElements: Record<string, IElementDefinition> = {
`;

    for (const element of mapping.elements) {
      content += `
    ${element.name}: {
        name: "${element.name}",
        locator: "${element.locator}",
        tag: "${element.tag}",
`;

      if ("placeholder" in element) {
        content += `
        placeholder: "${element.placeholder}",
`;
      }

      if ("text" in element) {
        content += `
        text: "${element.text}",
`;
      }

      content += `
    },
`;
    }

    content += `
};
`;

    return content;
  }
}
