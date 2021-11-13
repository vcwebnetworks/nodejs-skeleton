import { HttpStatusCode } from '@src/enums';

import { AppError, Options } from './app';

export class NotFoundError extends AppError {
  constructor(options: Options) {
    super({
      code: 'not_found',
      statusCode: HttpStatusCode.NOT_FOUND,
      ...options,
    });

    this.name = 'NotFoundError';
  }
}
