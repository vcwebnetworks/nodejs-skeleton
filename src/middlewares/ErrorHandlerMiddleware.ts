import { NextFunction, Response, Request } from 'express';

interface IError extends Error {
  statusCode?: number;
}

export default function ErrorHandlerMiddleware(
  error: IError,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  let statusCode = 500;
  const { name } = error;
  const message = error.message || 'Internal server error';

  if ('statusCode' in error) {
    statusCode = error.statusCode as number;
  }

  return response.status(statusCode).json({
    error: { name, statusCode, message },
  });
}
