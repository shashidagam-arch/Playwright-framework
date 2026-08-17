import OpenAI from "openai";

export class AzureOpenAIService {

    private client: OpenAI;

    constructor() {

        const endpoint =
            process.env.AZURE_OPENAI_ENDPOINT;

        const apiKey =
            process.env.AZURE_OPENAI_API_KEY;

        if (!endpoint) {
            throw new Error(
                "AZURE_OPENAI_ENDPOINT is not configured."
            );
        }

        if (!apiKey) {
            throw new Error(
                "AZURE_OPENAI_API_KEY is not configured."
            );
        }

        this.client = new OpenAI({
            apiKey,
            baseURL:
                `${endpoint}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`
        });
    }

    async analyzeFailure(
        prompt: string
    ): Promise<string> {

        try {

            const response =
                await this.client.chat.completions.create({

                    model:
                        process.env.AZURE_OPENAI_DEPLOYMENT!,

                    messages: [

                        {
                            role: "system",
                            content:
                                "You are a Senior QA Automation Architect specializing in Playwright, API automation, Selenium migration, CI/CD pipelines, and root cause analysis."
                        },

                        {
                            role: "user",
                            content: prompt
                        }

                    ],

                    temperature: 0.2

                });

            return (
                response.choices[0]
                    ?.message?.content ||
                "No analysis returned."
            );

        } catch (error) {

            console.error(
                "[AI] Failure Analysis Error:",
                error
            );

            return "AI analysis failed.";
        }
    }
}