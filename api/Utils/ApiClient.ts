import { APIRequestContext, request } from "@playwright/test";

export class ApiClient {

    private static apiContext: APIRequestContext;

    static async getContext() {

        if (!this.apiContext) {

            console.log(
                `Using API URL: ${process.env.API_URL}`
            );

            this.apiContext = await request.newContext({
                baseURL: process.env.API_URL
            });
        }

        return this.apiContext;
    }
}