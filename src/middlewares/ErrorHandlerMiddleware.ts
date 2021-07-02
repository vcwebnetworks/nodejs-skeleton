import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import Logger from '@src/helpers/Logger';

interface IError extends Error {
  code?: string;
  statusCode?: number;
}

const errorHandlerMiddleware = (
  error: IError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  let isJoi = false;
  let statusCode = 400;
  const validations: any[] = [];

  if (error?.statusCode) {
    statusCode = error.statusCode;
  }

  if (isCelebrateError(error)) {
    isJoi = true;

    error.details.forEach(value => {
      error.message = value.message;
      validations.push(value.details);
    });
  }

  if (process.env.NODE_ENV === 'development') {
    Logger.error(error.message, error);
  }

  return response.status(statusCode).json({
    name: isJoi ? 'CelebrateError' : error.name,
    statusCode,
    sentry: (<any>response).sentry,
    message: error?.name ? error.message : error,
    stack: error.stack?.split('\n'),
    code: error?.code ?? 'default',
    validations,
  });
};

export default errorHandlerMiddleware;
