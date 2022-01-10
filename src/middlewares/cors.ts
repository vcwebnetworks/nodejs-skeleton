import { NextFunction, Request, Response } from 'express';

export const corsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const allowOrigin = '*';
  const allowMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  const allowHeaders = [
    'Accept',
    'Origin',
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'X-Requested-With',
    'X-HTTP-Method-Override',
    'X-Refresh-Token',
    'X-Aws-IdToken',
    'X-Test',
  ];

  response.header('Access-Control-Allow-Origin', allowOrigin);
  response.header('Access-Control-Allow-Methods', allowMethods.join(','));
  response.header('Access-Control-Allow-Headers', allowHeaders.join(','));
  response.header('Access-Control-Allow-Credentials', 'true');

  if (request.method.toUpperCase() === 'OPTIONS') {
    return response.sendStatus(200);
  }

  return next();
};
