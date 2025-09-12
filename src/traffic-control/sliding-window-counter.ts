class SlidingWindowCounter {
    #windowSize: number
    #maxRequests: number
    #requestCounts: number
    #currentWindow: number
    #previousCounts: number

    /**
     * Creates an instance of the SlidingWindowCounter class.
     * @param maxRequests - The maximum number of requests allowed in the window.
     * @param windowSizeInSeconds - The size of the sliding window in seconds.
     */
    constructor(maxRequests: number, windowSizeInSeconds: number) {
        this.#windowSize = windowSizeInSeconds
        this.#maxRequests = maxRequests
        this.#currentWindow = Math.floor((Date.now() / 1000) / windowSizeInSeconds)
        this.#requestCounts = 0
        this.#previousCounts = 0
    }

    /**
     * Allows a request to be processed if it is within the rate limit.
     * @returns {boolean} - Returns true if the request is allowed, false otherwise.
     */
    public allowRequest(): boolean {
        const now = Date.now() / 1000
        const currentWindow = Math.floor(now / this.#windowSize)

        if (currentWindow !== this.#currentWindow) {
            this.#previousCounts = this.#requestCounts
            this.#requestCounts = 0
            this.#currentWindow = currentWindow
        }

        const elapsedTime = (now % this.#windowSize) / this.#windowSize
        const weightedPrevious = this.#previousCounts * (1 - elapsedTime)
        const totalRequests = this.#requestCounts + weightedPrevious

        if (totalRequests < this.#maxRequests) {
            this.#requestCounts++
            return true // Request is allowed
        }

        return false
    }
}

export default SlidingWindowCounter