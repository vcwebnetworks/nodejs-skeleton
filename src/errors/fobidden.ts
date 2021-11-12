import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', code?: string) {
    super(message, HttpStatusCode.FORBIDDEN);

    this.name = 'ForbiddenError';
    this.code = code ?? 'forbidden';
  }
}
