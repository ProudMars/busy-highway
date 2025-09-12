class TokenBucket {
    #tokens: number
    #lastRefill: number
    #capacity: number
    #refillRate: number // tokens per second

    /**
     * Creates an instance of the TokenBucket class.
     * @param capacity - The maximum capacity of the bucket.
     * @param refillRate - The rate at which tokens are added to the bucket.
     */
    constructor(capacity: number, refillRate: number) {
        this.#capacity = capacity
        this.#refillRate = refillRate
        this.#tokens = capacity
        this.#lastRefill = Date.now()
    }

    #refill() {
        const now = Date.now()
        const elapsed = (now - this.#lastRefill) / 1000 // convert to seconds
        const tokensToAdd = Math.floor(elapsed * this.#refillRate)
        if (tokensToAdd > 0) {
            this.#tokens = Math.min(this.#capacity, this.#tokens + tokensToAdd)
            this.#lastRefill = now
        }
    }

    /**
     * Allows a request to be processed if the bucket has tokens.
     * @returns {boolean} - Returns true if the request is allowed, false otherwise.
     */
    public allowRequest(): boolean {
        this.#refill()
        if (this.#tokens > 0) {
            this.#tokens--
            return true
        }
        return false
    }
}

export default TokenBucket;