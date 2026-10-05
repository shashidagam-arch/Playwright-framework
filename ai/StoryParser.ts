import { UserStory } from "./Models/UserStory";

export class StoryParser {
  static parse(story: string): UserStory {
    console.log("========== STORY INPUT ==========");
    console.log(story);
    console.log("=================================");

    const normalizedStory = story
      .replace(/\r/g, " ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    console.log("NORMALIZED:");
    console.log(normalizedStory);

    const actorMatch = normalizedStory.match(/^As\s+(.*?)\s+I want/i);

    const goalMatch = normalizedStory.match(/I want\s+(.*?)\s+So that/i);

    const benefitMatch = normalizedStory.match(/So that\s+(.*)$/i);

    const actor = actorMatch?.[1]?.trim() || "";

    const goal = goalMatch?.[1]?.trim() || "";

    const benefit = benefitMatch?.[1]?.trim() || "";

    const userStory: UserStory = {
      actor,
      goal, 
      benefit,
      pageName: this.derivePageName(goal),
      actionName: this.deriveActionName(goal),
      validations: this.deriveValidations(benefit),
    };

    console.log("========== PARSED STORY ==========");
    console.log(userStory);
    console.log("==================================");

    return userStory;
  }

  private static derivePageName(goal: string): string {
    const text = goal.toLowerCase();

    if (text.includes("login")) {
      return "Login";
    }

    if (text.includes("inventory")) {
      return "Inventory";
    }

    if (text.includes("cart")) {
      return "Cart";
    }

    if (text.includes("checkout")) {
      return "Checkout";
    }

    return "Generated";
  }

  private static deriveActionName(goal: string): string {
    const text = goal.toLowerCase();

    if (text.includes("login")) {
      return "login";
    }

    if (text.includes("add")) {
      return "addToCart";
    }

    if (text.includes("checkout")) {
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
