import { HttpStatusCode } from '@/enums';

import { AppError, Options } from './app';

export class ForbiddenError extends AppError {
  constructor(options: Options) {
    super({
      code: 'forbidden',
      statusCode: HttpStatusCode.FORBIDDEN,
      ...options,
    });

    this.name = 'ForbiddenError';
  }
}
