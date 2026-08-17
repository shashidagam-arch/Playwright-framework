export class RetryHelper {

    static async retry<T>(
        action: () => Promise<T>,
        retries = 3,
        delay = 1000
    ): Promise<T> {

        let lastError: Error;

        for (let attempt = 1; attempt <= retries; attempt++) {

            try {

                return await action();

            } catch (error) {

                lastError = error as Error;

                console.log(
                    `[RETRY] Attempt ${attempt} failed`
                );

                if (attempt < retries) {

                    await new Promise(resolve =>
                        setTimeout(resolve, delay)
                    );
                }
            }
        }

        throw lastError!;
    }
}