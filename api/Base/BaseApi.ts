import { APIResponse } from "@playwright/test";
import { ApiClient } from "../Utils/ApiClient";

export class BaseApi {

    protected async post(
        endpoint: string,
        payload: unknown
    ): Promise<APIResponse> {

        const api = await ApiClient.getContext();

        return await api.post(endpoint, {
            data: payload
        });
    }

    protected async get(
        endpoint: string
    ): Promise<APIResponse> {

        const api = await ApiClient.getContext();

        return await api.get(endpoint);
    }

    protected validateStatus(
        response: APIResponse,
        expectedStatus: number
    ): void {

        if (response.status() !== expectedStatus) {

            throw new Error(
                `Expected ${expectedStatus} but got ${response.status()}`
            );
        }
    }
}