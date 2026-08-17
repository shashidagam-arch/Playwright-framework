export class RootCausePrompt {

    static build(
        testName: string,
        errorMessage: string,
        stackTrace: string,
        pageUrl?: string
    ): string {

        return `
You are a Senior QA Automation Architect.

Analyze the following Playwright test failure and provide a detailed root cause analysis.

Test Name:
${testName}

Page URL:
${pageUrl ?? "N/A"}

Error Message:
${errorMessage}

Stack Trace:
${stackTrace}

Please provide:

1. Probable Root Cause
2. Confidence Score (0-100%)
3. Recommended Fix
4. Prevention Suggestion
5. Whether the issue is most likely:
   - Locator Issue
   - Synchronization Issue
   - Application Defect
   - Environment Issue
   - Test Script Issue

Provide the response in a clear structured format.
`;
    }
}