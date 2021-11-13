import { Request } from 'express';

import { HttpStatusCode } from '@src/enums';

import { AppError } from './app';

export class MethodNotAllowedError extends AppError {
  constructor(request: Request) {
    const { path, method } = request;

    super({
      code: 'method_not_allowed',
      metadata: { path, method },
      statusCode: HttpStatusCode.METHOD_NOT_ALLOWED,
      message: `Method not allowed in request${
        path ? `: [${method.toUpperCase()}] ${path}` : '.'
      }`,
    });

    this.name = 'MethodNotAllowedError';
  }
}
