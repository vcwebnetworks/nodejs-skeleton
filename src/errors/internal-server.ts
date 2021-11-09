import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export class InternalServerError extends AppError {
  constructor(message?: string) {
    super(
      message ?? 'Internal Server Error',
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );

    this.name = 'InternalServerError';
    this.code = 'internal_server';
  }
}
