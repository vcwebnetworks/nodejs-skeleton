import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import UnauthorizedError from '@errors/unauthorized';
import jwt from '@shared/jwt';

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
      throw new UnauthorizedError('Invalid authorization token signature.');
    }

    token = authToken.trim();
  } else {
    token = request.query.apiToken as string;
  }

  if (!token) {
    throw new UnauthorizedError('Token missing in the request.');
  }

  return token;
};

export const isBearerToken = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  if (
    !('dev' in request.query) &&
    !checkIfTheRouteIsAllowedInTheRequest(request)
  ) {
    const token = extractTokenInRequest(request);
    request.bearerToken = token;

    if (token !== API_KEY && token !== ADMIN_KEY) {
      try {
        request.jwtDecode = await jwt.decode<Request['jwtDecode']>(token);
      } catch (e) {
        let errorCode = 'token.invalid';

        if (e instanceof TokenExpiredError) {
          errorCode = 'token.expired';
        }

        throw new UnauthorizedError('Access denied.', errorCode);
      }
    }
  }

  return next();
};
