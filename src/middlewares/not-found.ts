import { NextFunction, Request, Response } from 'express';

import MethodNotAllowedError from '@errors/method-not-allowed';
import PageNotFoundError from '@errors/page-not-found';

export const notFoundMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  if (
    request?.originalMethod &&
    request.originalMethod.toUpperCase() !== request.method.toUpperCase()
  ) {
    return next(new MethodNotAllowedError(request));
  }

  return next(new PageNotFoundError(request));
};
