import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code?: string) {
    super(message, HttpStatusCode.UNAUTHORIZED);

    this.name = 'UnauthorizedError';
    this.code = code ?? 'unauthorized';
  }
}
