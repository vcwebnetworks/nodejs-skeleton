import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

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
