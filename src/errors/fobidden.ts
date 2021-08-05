import AppError from './app';

export default class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', code?: string) {
    super(message, 403);

    this.name = 'ForbiddenError';
    this.code = code ?? 'forbidden';
  }
}
