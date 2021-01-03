import { NextFunction, Request, Response } from 'express';

import UnauthorizedError from '@src/errors/UnauthorizedError';

const { API_KEY } = process.env;

export const extractTokenInRequest = (request: Request): string => {
  let token: string;
  const { authorization } = request.headers;

  if (authorization) {
    const [bearer, authToken] = authorization.split(' ');

    if (bearer.trim() !== 'Bearer') {
      throw new UnauthorizedError('Assinatura do token de autorização inválida.');
    }

    token = authToken.trim();
  } else {
    token = request.query.apiToken as string;
  }

  if (!token) {
    throw new UnauthorizedError('Token ausente na requisição.');
  }

  return token;
};

const apiTokenMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  if (!request.query.dev) {
    const token = extractTokenInRequest(request);

    if (token !== API_KEY) {
      throw new UnauthorizedError('Acesso negado.');
    }
  }

  return next();
};

export default apiTokenMiddleware;
