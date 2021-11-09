import { Request } from 'express';

import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class MethodNotAllowedError extends AppError {
  constructor(request: Request) {
    const { path, method } = request;

    super(
      `Method not allowed in request${
        path ? `: [${method.toUpperCase()}] ${path}` : '.'
      }`,
      HttpStatusCode.METHOD_ALLOWED,
    );

    this.name = 'MethodNotAllowedError';
    this.code = 'method_not_allowed';
  }
}
