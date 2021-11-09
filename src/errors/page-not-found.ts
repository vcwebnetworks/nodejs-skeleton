import { Request } from 'express';

import { HttpStatusCode } from '@src/enums';

import AppError from './app';

export default class PageNotFoundError extends AppError {
  constructor(request: Request) {
    const { path, method } = request;

    super(
      `Page not found in request${
        path ? `: [${method.toUpperCase()}] ${path}` : '.'
      }`,
      HttpStatusCode.NOT_FOUND,
    );

    this.name = 'PageNotFoundError';
    this.code = 'page_not_found';
  }
}
