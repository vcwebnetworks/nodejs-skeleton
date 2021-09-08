import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@src/errors';

export const isAdmin = (request: Request, _: Response, next: NextFunction) => {
  if (request.bearerToken !== process.env.ADMIN_KEY) {
    throw new UnauthorizedError('Access denied.');
  }

  request.isAdmin = true;

  return next();
};
