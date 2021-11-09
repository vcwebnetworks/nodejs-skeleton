import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);

    this.name = 'UnprocessableEntityError';
    this.code = 'unprocessable_entity';
  }
}
