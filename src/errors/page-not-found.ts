import { Request } from 'express';

import { HttpStatusCode } from '@/enums';

import { AppError } from './app';

export class PageNotFoundError extends AppError {
  constructor(request: Request) {
    const { path, method } = request;

    super({
      code: 'page_not_found',
      metadata: { path, method },
      statusCode: HttpStatusCode.NOT_FOUND,
      message: `Page not found in request${
        path ? `: [${method.toUpperCase()}] ${path}` : '.'
      }`,
    });

    this.name = 'PageNotFoundError';
  }
}
