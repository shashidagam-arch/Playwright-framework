export interface NLPAction {
  action: string;
  args: string[];
}

export class NLPCommandParser {
  static parse(commands: string): NLPAction[] {
    const actions: NLPAction[] = [];

    const lines = commands
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (const line of lines) {
      const text = line.toLowerCase();

      if (text.startsWith("login with")) {
        const username = line.replace(/login with/i, "").trim();

        actions.push({
          action: "login",
          args: [username],
        });

        continue;
      }

      if (text.startsWith("add") && text.includes("to cart")) {
        const product = line
          .replace(/add/i, "")
          .replace(/to cart/i, "")
          .trim();

        actions.push({
          action: "addToCart",
          args: [product],
        });

        continue;
      }

      if (text === "open cart") {
        actions.push({
          action: "openCart",
          args: [],
        });

        continue;
      }

      if (text === "remove item") {
        actions.push({
          action: "removeItem",
          args: [],
        });

        continue;
      }

      if (text === "verify cart is empty") {
        actions.push({
          action: "verifyCartEmpty",
          args: [],
        });

        continue;
      }
    }

    return actions;
  }
}
