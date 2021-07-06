import AppError from './app';

export default class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);

    this.name = 'ForbiddenError';
    this.code = 'forbidden';
  }
}
