import { NextFunction, Request, Response } from 'express';

import AppError from '@src/errors/AppError';

export default function NotFoundMiddleware(
  _request: Request,
  _response: Response,
  next: NextFunction,
): void {
  next(new AppError('Error 404 (Not Found)', 404));
}
