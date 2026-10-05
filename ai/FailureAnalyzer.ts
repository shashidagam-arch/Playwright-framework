import { AzureOpenAIService } from "./AzureOpenAIService";
import { FailureContext } from "./Models/FailureContext";
import { RootCausePrompt } from "./Prompts/RootCausePrompt";

export class FailureAnalyzer {
  private aiService = new AzureOpenAIService();

  async analyze(context: FailureContext): Promise<string> {
    const prompt = RootCausePrompt.build(
      context.testName,
      context.errorMessage,
      context.stackTrace,
      context.pageUrl,
    );

    return await this.aiService.analyzeFailure(prompt);
  }
}
