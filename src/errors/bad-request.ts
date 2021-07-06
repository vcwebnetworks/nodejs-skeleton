import AppError from './app';

export class BadRequestError extends AppError {
  constructor(message = 'BadRequest') {
    super(message, 400);

    this.name = 'BadRequestError';
    this.code = 'badrequest';
  }
}
