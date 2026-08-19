import { UserStory } from "./Models/UserStory";

export class StoryParser {
  static parse(story: string): UserStory {
    const lines = story
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const actor =
      lines.find((line) => line.startsWith("As "))?.replace("As ", "") || "";

    const goal =
      lines.find((line) => line.startsWith("I want"))?.replace("I want ", "") ||
      "";

    const benefit =
      lines
        .find((line) => line.startsWith("So that"))
        ?.replace("So that ", "") || "";

    return {
      actor,

      goal,

      benefit,

      pageName: this.derivePageName(goal),

      actionName: this.deriveActionName(goal),

      validations: this.deriveValidations(benefit),
    };
  }

  private static derivePageName(goal: string): string {
    const lowerGoal = goal.toLowerCase();

    if (lowerGoal.includes("login")) {
      return "Login";
    }

    if (lowerGoal.includes("inventory")) {
      return "Inventory";
    }

    if (lowerGoal.includes("cart")) {
      return "Cart";
    }

    return "Generated";
  }

  private static deriveActionName(goal: string): string {
    const lowerGoal = goal.toLowerCase();

    if (lowerGoal.includes("login")) {
      return "login";
    }

    if (lowerGoal.includes("add")) {
      return "addItem";
    }

    if (lowerGoal.includes("checkout")) {
      return "checkout";
    }

    return "performAction";
  }

  private static deriveValidations(benefit: string): string[] {
    if (!benefit) {
      return [];
    }

    return [benefit];
  }
}
