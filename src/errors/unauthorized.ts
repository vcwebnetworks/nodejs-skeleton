import AppError from './app';

export default class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code?: string) {
    super(message, 401);

    this.name = 'UnauthorizedError';
    this.code = code ?? 'unauthorized';
  }
}
