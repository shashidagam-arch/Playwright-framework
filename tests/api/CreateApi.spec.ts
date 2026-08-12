import { test, expect } from "@playwright/test";
import { PostApi } from "../../api/Client/PostApi";

test("Verify Create Post API", async () => {

    const postsApi = new PostApi();

    const response = await postsApi.createPost({
        title: "Playwright",
        body: "API Automation",
        userId: 1
    });

    const responseBody = await response.json();

    console.log(JSON.stringify(responseBody, null, 2));

    expect(response.status()).toBe(201);

    expect(responseBody.title)
        .toBe("Playwright");

    expect(responseBody.body)
        .toBe("API Automation");

    expect(responseBody.userId)
        .toBe(1);
});