import { IRateLimiterStoreOptions } from 'rate-limiter-flexible';

type Config = Omit<IRateLimiterStoreOptions, 'storeClient'> & {
  enable: boolean;
};

const configRateLimiter = {
  enable: false,
  points: 10,
  duration: 60,
} as Config;

export default configRateLimiter;
