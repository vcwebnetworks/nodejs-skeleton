import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

import logger from '@/shared/logger';

export const loggerUuid = (
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  const loggerId = randomUUID();

  logger.defaultMeta = {
    ...logger.defaultMeta,
    loggerId,
  };

  response.setHeader('X-Logger-Id', loggerId);

  return next();
};
