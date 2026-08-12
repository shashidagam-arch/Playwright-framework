import { Locator, Page } from "@playwright/test";
import { IElementDefinition } from "../elements/IElementDefinition";

export class LocatorHealer {

    constructor(
        private page: Page
    ) {}

    async heal(
        element: IElementDefinition
    ): Promise<Locator> {

        console.log(
            `[HEALING] Attempting to heal ${element.name}`
        );

        const candidates =
            await this.extractCandidates();

        const match =
            this.findBestMatch(
                element,
                candidates
            );

        if (!match) {
            throw new Error(
                `Unable to heal locator: ${element.name}`
            );
        }

        console.log(
            `[HEALING] Healed using id=${match.id}`
        );

        return this.page.locator(
            `#${match.id}`
        );
    }

    private async extractCandidates() {

        return await this.page
            .locator("*")
            .evaluateAll(nodes =>
                nodes.map((node: any) => ({
                    tag: node.tagName?.toLowerCase(),
                    id: node.id,
                    text: node.innerText,
                    placeholder: node.placeholder
                }))
            );
    }

    private findBestMatch(
        original: IElementDefinition,
        candidates: any[]
    ) {

        let bestCandidate: any = null;
        let highestScore = 0;

        for (const candidate of candidates) {

            let score = 0;

            if (
                original.tag &&
                candidate.tag === original.tag
            ) {
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

        return highestScore >= 50
            ? bestCandidate
            : null;
    }
}