import dotenv from 'dotenv';
dotenv.config(); // This MUST be at the very top

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a rate limiter: 10 requests per 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // ✅ requires .env to be loaded BEFORE this
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;
