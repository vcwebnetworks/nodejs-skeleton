import { NextFunction, Request, Response } from 'express';

import logger from '@shared/logger';
import { errorToObject, hideKeysFromAnObject } from '@src/utils';

const loggerRequestInformation = (request: Request) => {
  logger.error('request information ->', {
    path: request.path,
    method: request.method,
    cookies: request.cookies,
    headers: request.headers,
    params: request.params,
    query: request.query,
    body: hideKeysFromAnObject(request.body),
  });
};

export const errorHandlerMiddleware = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent) {
    return next(error);
  }

  if (request?.bearerToken && process.env.NODE_ENV === 'production') {
    loggerRequestInformation(request);
  }

  const errorObject = errorToObject(error);

  response.statusCode = errorObject.statusCode;

  return response.json(errorObject);
};
