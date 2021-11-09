import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);

    this.name = 'NotFoundError';
    this.code = 'not_found';
  }
}
