import AppError from './AppError';

export default class RateLimiterError extends AppError {
  constructor(message = 'To many requests', code = 'rateLimit') {
    super(message, 429, code);

    this.name = 'RateLimiterError';
  }
}
