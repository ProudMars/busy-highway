class SlidingWindowLog {
    #timestamps: number[] = []
    #windowSize: number
    #maxRequests: number

    /**
     * Creates an instance of the SlidingWindowLog class.
     * @param maxRequests - The maximum number of requests allowed in the window.
     * @param windowSizeInSeconds - The size of the sliding window in seconds.
     */
    constructor(maxRequests: number, windowSizeInSeconds: number) {
        this.#maxRequests = maxRequests
        this.#windowSize = windowSizeInSeconds * 1000 // convert to milliseconds
    }

    /**
     * Allows a request to be processed if it is within the rate limit.
     * @returns {boolean} - Returns true if the request is allowed, false otherwise.
     */
    public allowRequest(): boolean {
        const now = Date.now()

        //@ts-ignore
        // Remove timestamps that are outside the current window
        while (this.#timestamps.length > 0 && this.#timestamps[0] <= now - this.#windowSize) {
            this.#timestamps.shift()
        }

        if (this.#timestamps.length < this.#maxRequests) {
            this.#timestamps.push(now)
            return true // Request is allowed
        }

        return false
    }
}

export default SlidingWindowLog