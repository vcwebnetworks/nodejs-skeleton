import AppError from './app';

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);

    this.name = 'ConflictError';
    this.code = 'conflict';
  }
}
