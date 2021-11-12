import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class RateLimiterError extends AppError {
  constructor(message = 'To many requests') {
    super(message, HttpStatusCode.MANY_REQUEST);

    this.name = 'RateLimiterError';
    this.code = 'rate_limiter';
  }
}
