import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT);

    this.name = 'ConflictError';
    this.code = 'conflict';
  }
}
