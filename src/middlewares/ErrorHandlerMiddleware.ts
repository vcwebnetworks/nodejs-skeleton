import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import Logger from '@src/helpers/Logger';

interface IError extends Error {
  code?: string;
  statusCode?: number;
}

const errorHandlerMiddleware = (error: IError, _request: Request, response: Response, _next: NextFunction) => {
  const isJoi = isCelebrateError(error);
  const { name, message = 'Internal server error' } = error;

  let statusCode = isJoi ? 400 : 500;

  if (error?.statusCode) {
    statusCode = error.statusCode;
  }

  if (process.env.NODE_ENV === 'development') {
    Logger.error(message, error);
  }

  return response.status(statusCode).json({
    name: isJoi ? 'CelebrateError' : name,
    statusCode,
    sentry: (<any>response).sentry,
    message,
    stack: error.stack?.split('\n'),
    code: error?.code ?? 'default',
  });
};

export default errorHandlerMiddleware;
