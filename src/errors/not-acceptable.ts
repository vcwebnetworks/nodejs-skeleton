import AppError from './app';

export class NotAcceptableError extends AppError {
  constructor(message: string) {
    super(message, 406);

    this.name = 'NotAcceptableError';
    this.code = 'not_acceptable';
  }
}
