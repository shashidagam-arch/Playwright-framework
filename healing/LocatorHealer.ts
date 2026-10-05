import { Locator, Page } from "@playwright/test";
import { IElementDefinition } from "../elements/IElementDefinition";
import { LocatorRepository } from "./LocatorRepository";

interface Candidate {
  tag?: string;
  id?: string;
  text?: string;
  placeholder?: string;
}

export class LocatorHealer {
  constructor(private page: Page) {{}}

  async heal(element: IElementDefinition): Promise<Locator> {
    console.log(`[HEALING] Attempting to heal ${element.name}`);

    const knownLocator = LocatorRepository.getLocator(element.locator);

    if (knownLocator) {
      console.log(`[LEARNING] Reusing known locator: ${knownLocator}`);

      return this.page.locator(knownLocator);
    }

    const candidates = await this.extractCandidates();

    const match = this.findBestMatch(element, candidates);

    if (!match || !match.id) {
      throw new Error(`Unable to heal locator: ${element.name}`);
    }

    const healedLocator = `#${match.id}`;

    console.log(`[HEALING] Healed using ${healedLocator}`);

    LocatorRepository.saveLocator(element.locator, healedLocator);

    console.log(
      `[LEARNING] Saved locator mapping: ${element.locator} -> ${healedLocator}`,
    );

    return this.page.locator(healedLocator);
  }

  private async extractCandidates(): Promise<Candidate[]> {
    return await this.page.locator("*").evaluateAll((nodes) =>
      nodes.map((node: any) => ({
        tag: node.tagName?.toLowerCase(),
        id: node.id,
        text: node.innerText,
        placeholder: node.placeholder,
      })),
    );
  }

  private findBestMatch(
    original: IElementDefinition,
    candidates: Candidate[],
  ): Candidate | null {
    let bestCandidate: Candidate | null = null;
    let highestScore = 0;

    for (const candidate of candidates) {
      let score = 0;

      if (original.tag && candidate.tag === original.tag) {
        score += 40;
      }

      if (
        original.text &&
        candidate.text &&
        candidate.text.includes(original.text)
      ) {
        score += 40;
      }

      if (
        original.placeholder &&
        candidate.placeholder === original.placeholder
      ) {
        score += 20;
      }

      if (score > highestScore) {
        highestScore = score;
        bestCandidate = candidate;
      }
    }

    return highestScore >= 50 ? bestCandidate : null;
  }
}