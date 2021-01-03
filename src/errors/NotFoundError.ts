import { Request } from 'express';

import AppError from './AppError';

export default class NotFoundError extends AppError {
  constructor(request: Request) {
    const { path, method } = request;

    super(`Page not found in request${path ? `: [${method.toUpperCase()}] ${path}` : '.'}`, 404);

    this.name = 'NotFoundError';
  }
}
