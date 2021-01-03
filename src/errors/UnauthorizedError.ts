import AppError from './AppError';

export default class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code = 'unauthorized') {
    super(message, 401, code);

    this.name = 'UnauthorizedError';
  }
}
