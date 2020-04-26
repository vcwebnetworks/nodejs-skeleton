import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default function ApiTokenMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Acesso negado.', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError('Token ausente na requisição.', 401);
  }

  if (token !== process.env.API_TOKEN) {
    throw new AppError('Acesso negado, token inválido.', 401);
  }

  next();
}
