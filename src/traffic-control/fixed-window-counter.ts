class FixedWindowCounter {
    #requests: number;
    #windowSize: number;
    #maxRequests: number;
    #currentWindowStart: number;

    /**
     * Creates an instance of the FixedWindowCounter class.
     * @param maxRequests - The maximum number of requests allowed in the window.
     * @param windowSizeInSeconds - The size of the fixed window in seconds.
     */
    constructor(maxRequests: number, windowSizeInSeconds: number) {
        this.#windowSize = windowSizeInSeconds * 1000 // convert to milliseconds
        this.#maxRequests = maxRequests
        this.#requests = 0
        this.#currentWindowStart = Date.now()
    }

    /**
     * Allows a request to be processed if it is within the rate limit.
     * @returns {boolean} - Returns true if the request is allowed, false otherwise.
     */
    public allowRequest(): boolean {
        const now = Date.now()

        // If the current time has exceeded the window, reset the counter
        if (now - this.#currentWindowStart >= this.#windowSize) {
            this.#requests = 0
            this.#currentWindowStart = now
        }

        // Check if adding a new request would exceed the limit
        if (this.#requests < this.#maxRequests) {
            this.#requests++
            return true // Request is allowed
        }

        return false
    }
}

export default FixedWindowCounter