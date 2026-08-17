export interface FailureContext {

    testName: string;

    errorMessage: string;

    stackTrace: string;

    pageUrl?: string;
}