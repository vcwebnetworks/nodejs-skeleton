import { NextFunction, Response, Request } from 'express';
import AppError from '../errors/AppError';

export default function ErrorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  const { name } = error;
  const message = error.message || 'Internal server error';
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  return response.status(statusCode).json({
    error: { name, statusCode, message },
  });
}
