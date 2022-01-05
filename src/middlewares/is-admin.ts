import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/errors';
import { extractTokenInRequest } from '@/middlewares/is-bearer-token';

export const isAdmin = (request: Request, _: Response, next: NextFunction) => {
  const token = extractTokenInRequest(request);

  if (token !== process.env.ADMIN_KEY) {
    throw new UnauthorizedError({ message: 'Access denied.' });
  }

  request.isAdmin = true;

  return next();
};
