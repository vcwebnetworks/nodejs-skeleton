import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export class BadRequestError extends AppError {
  constructor(message = 'BadRequest') {
    super(message, HttpStatusCode.BAD_REQUEST);

    this.name = 'BadRequestError';
    this.code = 'badrequest';
  }
}
