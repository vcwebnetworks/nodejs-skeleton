import { NextFunction, Request, Response } from 'express';

import MethodNotAllowedError from '@src/errors/MethodNotAllowedError';
import NotFoundError from '@src/errors/NotFoundError';

const notFoundMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  if (request?.originalMethod && request.originalMethod.toUpperCase() !== request.method.toUpperCase()) {
    return next(new MethodNotAllowedError(request));
  }

  return next(new NotFoundError(request));
};

export default notFoundMiddleware;
