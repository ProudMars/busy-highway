class LeakyBucket {
    #capacity: number
    #leakRate: number
    #bucket: number[]
    #lastLeaked: number

    /**
     * Creates an instance of the LeakyBucket class.
     * @param capacity - The maximum capacity of the bucket.
     * @param leakRate - The rate at which the bucket leaks.
     */
    constructor(capacity = 1, leakRate = 1) {
        this.#capacity = capacity // max tokens
        this.#leakRate = leakRate // leak rate per second
        this.#bucket = []
        this.#lastLeaked = Date.now()
    }

    /**
     * Allows a request to be processed if the bucket is not full.  
     * @returns {boolean} - Returns true if the request is allowed, false otherwise.
     */
    allowRequest() {
        // Logic to determine if a request is allowed
        const now = Date.now()

        const elapsed = (now - this.#lastLeaked) / 1000 // convert to seconds

        const leakedTokens = Math.floor(elapsed * this.#leakRate)
        if (leakedTokens > 0) {
            this.#bucket.splice(0, leakedTokens)
            this.#lastLeaked = now
        }

        if (this.#bucket.length < this.#capacity) {
            this.#bucket.push(now)
            return true
        }

        return false
    }
}

export default LeakyBucket;