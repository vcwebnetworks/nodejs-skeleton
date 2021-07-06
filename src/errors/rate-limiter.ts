import AppError from './app';

export default class RateLimiterError extends AppError {
  constructor(message = 'To many requests') {
    super(message, 429);

    this.name = 'RateLimiterError';
    this.code = 'rate_limiter';
  }
}
