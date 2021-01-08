import { NextFunction, Request, Response } from 'express';
import IORedis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import RateLimiterErrorError from '@src/errors/RateLimiterErrorError';

const {
  REDIS_RATE_LIMIT_HOST,
  REDIS_RATE_LIMIT_PORT,
  REDIS_RATE_LIMIT_PASSWORD,
  REDIS_RATE_LIMIT_DATABASE,
} = process.env;

const rateLimiterMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  let connectionRedisError = false;

  try {
    if (process.env.NODE_ENV === 'production') {
      const storeClient = new IORedis({
        host: REDIS_RATE_LIMIT_HOST,
        port: Number(REDIS_RATE_LIMIT_PORT),
        password: REDIS_RATE_LIMIT_PASSWORD,
        db: Number(REDIS_RATE_LIMIT_DATABASE),
      });

      storeClient.on('error', error => {
        if (error?.code === 'ENOTFOUND') {
          storeClient.disconnect();

          connectionRedisError = true;
        }
      });

      const rateLimiter = new RateLimiterRedis({
        storeClient,
        points: 10,
        duration: 60,
        keyPrefix: 'rt',
      });

      await rateLimiter.consume(request.ip);
    }

    return next();
  } catch {
    if (connectionRedisError) {
      return next();
    }

    throw new RateLimiterErrorError();
  }
};

export default rateLimiterMiddleware;
