import { NextFunction, Request, Response } from 'express';
import { ValidationError as SequelizeValidationError } from 'sequelize';
import { ValidationError as YupValidationError } from 'yup';

import logger from '@shared/logger';

const mapperValidationError = (item: any) => ({
  type: item.type,
  path: item.path,
  message: item.message,
});

export const errorHandlerMiddleware = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  let { message, errors } = error;
  const statusCode = error.statusCode ?? 400;

  if (error.name.startsWith('Sequelize')) {
    message = (<any>error).errors?.[0]?.message ?? error.message;
  }

  if (error instanceof YupValidationError) {
    message = error.errors[0] ?? message;
    errors = error.inner.map(mapperValidationError);
  }

  if (error instanceof SequelizeValidationError) {
    errors = error.errors.map(mapperValidationError);
  }

  if (process.env.NODE_ENV === 'production') {
    logger.error(error.message, error);
  }

  return response.status(statusCode).json({
    name: error.name,
    statusCode,
    sentry: (<any>response).sentry,
    message: message ?? error,
    stack: error.stack?.split('\n'),
    code: error?.code ?? 'default',
    errors,
  });
};
