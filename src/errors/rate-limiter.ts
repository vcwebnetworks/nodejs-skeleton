import { HttpStatusCode } from '@src/enums';

import { AppError, Options } from './app';

export class RateLimiterError extends AppError {
  constructor(options?: Partial<Options>) {
    super({
      code: 'rate_limiter',
      statusCode: HttpStatusCode.MANY_REQUEST,
      message: 'To many requests',
      ...options,
    });

    this.name = 'RateLimiterError';
  }
}
