import AppError from './app';

export class InternalServerError extends AppError {
  constructor(message?: string) {
    super(message ?? 'Internal Server Error', 500);

    this.name = 'InternalServerError';
    this.code = 'internal_server';
  }
}
