import AppError from './app';

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);

    this.name = 'UnprocessableEntityError';
    this.code = 'unprocessable_entity';
  }
}
