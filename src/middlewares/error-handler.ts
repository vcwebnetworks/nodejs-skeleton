import { NextFunction, Request, Response } from 'express';

import logger from '@/shared/logger';
import { errorToObject, hideKeysFromAnObject } from '@/utils';

import { NodeEnv } from '../../../api-v1.powpay.com/src/enums';

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

  if (request?.bearerToken && process.env.NODE_ENV !== NodeEnv.LOCAL) {
    loggerRequestInformation(request);
  }

  const errorObject = errorToObject(error);

  errorObject.message = request.i18n.t(errorObject.message);

  if (errorObject.metadata?.validators?.length) {
    errorObject.metadata.validators = errorObject.metadata.validators.map(
      row => ({
        ...row,
        message: request.i18n.t(row.message),
      }),
    );
  }

  response.statusCode = errorObject.statusCode;

  return response.json(errorObject);
};
