import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export class NotAcceptableError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_ACCEPTABLE);

    this.name = 'NotAcceptableError';
    this.code = 'not_acceptable';
  }
}
