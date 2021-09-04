import { NextFunction, Request, Response } from 'express';

import logger from '@shared/logger';

interface IError extends Error {
  code?: string;
  statusCode?: number;
}

export const errorHandlerMiddleware = (
  error: IError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  let statusCode = 400;
  let errors: any[] = [];

  if (error?.statusCode) {
    statusCode = error.statusCode;
  }

  if (process.env.NODE_ENV === 'development') {
    logger.error(error.message, error);
  }

  if (error.name === 'SequelizeValidationError') {
    error.message = (<any>error).errors?.[0]?.message ?? error.message;
  }

  if ('errors' in error) {
    errors = (<any>error).errors;
  }

  return response.status(statusCode).json({
    name: error.name,
    statusCode,
    sentry: (<any>response).sentry,
    message: error?.name ? error.message : error,
    stack: error.stack?.split('\n'),
    code: error?.code ?? 'default',
    errors,
  });
};
