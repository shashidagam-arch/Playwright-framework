export class UserStoryPrompt {
  static build(actor: string, goal: string, benefit: string): string {
    return `
Generate a Playwright TypeScript test.

Actor:
${actor}

Goal:
${goal}

Benefit:
${benefit}

Generate:
1. Test Name
2. Playwright Test
3. Meaningful Assertions

Return only TypeScript code.
`;
  }
}
