# Busy Highway

A simple and efficient rate limiting library for Node.js that implements various rate limiting algorithms.

## Installation

```sh
npm install @proudmars/busy-highway
```

## Features

- Multiple rate limiting algorithms:
  - Token Bucket
  - Leaky Bucket 
  - Fixed Window Counter
  - Sliding Window Counter
  - Sliding Window Log

## Usage

```typescript
import { 
  TokenBucket,
  LeakyBucket,
  FixedWindowCounter,
  SlidingWindowCounter,
  SlidingWindowLog
} from '@proudmars/busy-highway';

// Token Bucket Example
const tokenBucket = new TokenBucket(10, 2); // 10 tokens, refills 2 tokens/second
if (tokenBucket.allowRequest()) {
  // Process request
}

// Leaky Bucket Example
const leakyBucket = new LeakyBucket(5, 1); // 5 requests capacity, leaks 1 request/second
if (leakyBucket.allowRequest()) {
  // Process request
}

// Fixed Window Example
const fixedWindow = new FixedWindowCounter(100, 60); // 100 requests per 60 seconds
if (fixedWindow.allowRequest()) {
  // Process request
}

// Sliding Window Counter Example
const slidingWindow = new SlidingWindowCounter(100, 60); // 100 requests per 60 seconds
if (slidingWindow.allowRequest()) {
  // Process request
}

// Sliding Window Log Example
const slidingLog = new SlidingWindowLog(100, 60); // 100 requests per 60 seconds
if (slidingLog.allowRequest()) {
  // Process request
}
```

## Algorithm Details

### Token Bucket
- Maintains a bucket of tokens that refills at a fixed rate
- Each request consumes one token
- Good for handling bursts while maintaining average rate

### Leaky Bucket
- Requests enter a fixed-capacity bucket
- Requests leak out at a constant rate
- Good for smoothing out traffic spikes

### Fixed Window Counter
- Counts requests in fixed time windows
- Resets counter at window boundaries
- Simple but can allow twice the rate at window boundaries

### Sliding Window Counter
- Uses weighted sliding window approach
- Smooths out boundary conditions of fixed windows
- Good balance of accuracy and memory usage

### Sliding Window Log
- Keeps track of timestamp of each request
- Most accurate but higher memory usage
- Good for precise rate limiting

## Development

```sh
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run linting
pnpm lint

# Run in development mode with watch
pnpm dev
```

## License

MIT © [ProudMars](https://github.com/ProudMars)