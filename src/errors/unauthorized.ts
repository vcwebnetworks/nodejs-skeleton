import { HttpStatusCode } from '@src/enums';

import { AppError, Options } from './app';

export class UnauthorizedError extends AppError {
  constructor(options?: Partial<Options>) {
    super({
      code: 'unauthorized',
      statusCode: HttpStatusCode.UNAUTHORIZED,
      message: 'Unauthorized',
      ...options,
    });

    this.name = 'UnauthorizedError';
  }
}
