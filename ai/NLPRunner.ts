import { NLPTestGenerator } from "./NLPTestGenerator";

const commands = `
Login with standard_user
Add Sauce Labs Backpack to cart
Open cart
Remove item
`;

NLPTestGenerator.generate(commands, "NLPGenerated");

console.log("✅ NLP Test Generation Complete");
