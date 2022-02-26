import { NextFunction, Request, Response } from 'express';
import IORedis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import configRateLimiter from '@/config/rate-limiter';
import { RateLimiterError } from '@/errors';

const {
  REDIS_RATE_LIMIT_HOST,
  REDIS_RATE_LIMIT_PORT,
  REDIS_RATE_LIMIT_PASSWORD,
  REDIS_RATE_LIMIT_DATABASE,
  REDIS_RATE_LIMIT_KEY_PREFIX,
} = process.env;

export const rateLimiterMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  let connectionRedisError = false;

  try {
    if (configRateLimiter.enable) {
      const storeClient = new IORedis({
        host: REDIS_RATE_LIMIT_HOST,
        port: Number(REDIS_RATE_LIMIT_PORT),
        password: REDIS_RATE_LIMIT_PASSWORD,
        db: Number(REDIS_RATE_LIMIT_DATABASE),
        keyPrefix: REDIS_RATE_LIMIT_KEY_PREFIX,
      });

      storeClient.on('error', error => {
        if (error?.code === 'ENOTFOUND') {
          storeClient.disconnect();

          connectionRedisError = true;
        }
      });

      const rateLimiter = new RateLimiterRedis({
        storeClient,
        ...configRateLimiter,
      });

      await rateLimiter.consume(request.ip);
    }

    return next();
  } catch {
    if (connectionRedisError) {
      return next();
    }

    throw new RateLimiterError();
  }
};
