import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { UnauthorizedError } from '@/errors';
import jwt from '@/shared/jwt';

const { API_KEY, ADMIN_KEY } = process.env;

function checkIfTheRouteIsAllowedInTheRequest(request: Request): boolean {
  let allowedRoute = false;
  const allowedRoutes = ['/swagger', '/favicon.ico', '/sw.js', '/socket.io'];

  allowedRoutes.forEach(route => {
    if (request.path.startsWith(route)) {
      allowedRoute = true;
    }
  });

  return allowedRoute;
}

export const extractTokenInRequest = (request: Request): string => {
  let token: string;
  const { authorization } = request.headers;

  if (authorization) {
    const [bearer, authToken] = authorization.split(' ');

    if (bearer.trim() !== 'Bearer') {
      throw new UnauthorizedError({
        message: 'Invalid authorization token signature.',
      });
    }

    token = authToken.trim();
  } else {
    token = request.query.apiToken as string;
  }

  if (!token) {
    throw new UnauthorizedError({ message: 'Token missing in the request.' });
  }

  return token;
};

async function validateJwtToken(request: Request) {
  try {
    request.jwtDecode = await jwt.decode(request.bearerToken);
  } catch (e) {
    let errorCode = 'token.invalid';

    if (e instanceof TokenExpiredError) {
      errorCode = 'token.expired';
    }

    throw new UnauthorizedError({
      message: 'Access denied.',
      code: errorCode,
    });
  }
}

export const isBearerToken = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const token = extractTokenInRequest(request);
  request.bearerToken = token;

  if (
    'dev' in request.query ||
    checkIfTheRouteIsAllowedInTheRequest(request) ||
    token === API_KEY ||
    token === ADMIN_KEY
  ) {
    return next();
  }

  await validateJwtToken(request);

  return next();
};
