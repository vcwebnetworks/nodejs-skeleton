import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

interface IError extends Error {
  statusCode?: number;
}

export default function ErrorHandlerMiddleware(
  error: IError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  const isJoi = isCelebrateError(error);
  let statusCode = isJoi ? 400 : 500;
  const { name, message = 'Internal server error' } = error;

  if (error?.statusCode) {
    statusCode = error.statusCode;
  }

  return response.status(statusCode).json({
    name: isJoi ? 'ValidationError' : name,
    statusCode,
    message,
    stack: error.stack?.split('\n'),
  });
}
