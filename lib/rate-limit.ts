interface RateLimitRecord {
  tokens: number;
  lastRefill: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitOptions {
  limit: number; // Maximum number of tokens
  windowMs: number; // Time window in ms
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 60, windowMs: 60 * 1000 }
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const { limit, windowMs } = options;

  let record = rateLimitStore.get(identifier);

  if (!record) {
    record = { tokens: limit, lastRefill: now };
    rateLimitStore.set(identifier, record);
  }

  // Refill tokens based on elapsed time
  const elapsed = now - record.lastRefill;
  if (elapsed > windowMs) {
    record.tokens = limit;
    record.lastRefill = now;
  } else {
    const refillAmount = (elapsed / windowMs) * limit;
    record.tokens = Math.min(limit, record.tokens + refillAmount);
    record.lastRefill = now;
  }

  if (record.tokens >= 1) {
    record.tokens -= 1;
    return {
      success: true,
      remaining: Math.floor(record.tokens),
      reset: Math.ceil((windowMs - (now - record.lastRefill)) / 1000),
    };
  }

  return {
    success: false,
    remaining: 0,
    reset: Math.ceil((windowMs - (now - record.lastRefill)) / 1000),
  };
}
