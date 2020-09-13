import { NextFunction, Request, Response } from 'express';

import UnauthorizedError from '@src/errors/UnauthorizedError';

const { API_KEY } = process.env;

export default function ApiTokenMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  if (!request.query.dev) {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError('Header de autorização ausente.');
    }

    const [bearer, token] = authorization.split(' ');

    if (!token || bearer !== 'Bearer') {
      throw new UnauthorizedError(
        'Assinatura do token de autorização inválida.',
      );
    }

    if (token !== API_KEY) {
      throw new UnauthorizedError('Acesso negado.');
    }
  }

  next();
}
