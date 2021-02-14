import { NextFunction, Request, Response } from 'express';
import IORedis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import configApp from '@src/config/app';
import RateLimiterError from '@src/errors/RateLimiterError';

const {
  REDIS_RATE_LIMIT_HOST,
  REDIS_RATE_LIMIT_PORT,
  REDIS_RATE_LIMIT_PASSWORD,
  REDIS_RATE_LIMIT_DATABASE,
} = process.env;

const rateLimiterMiddleware = async (request: Request, _response: Response, next: NextFunction) => {
  let connectionRedisError = false;

  try {
    if (configApp.isProduction) {
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

    throw new RateLimiterError();
  }
};

export default rateLimiterMiddleware;
