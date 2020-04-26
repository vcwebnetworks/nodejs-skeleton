import { Request, Response, NextFunction } from 'express';

import configCors from '../config/cors';

export default function CorsMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const { methods, headers, origin } = configCors;

  response.header('Access-Control-Allow-Origin', origin);
  response.header('Access-Control-Allow-Methods', methods.join(','));
  response.header('Access-Control-Allow-Headers', headers.join(','));

  if (request.method.toUpperCase() === 'OPTIONS') {
    return response.sendStatus(200);
  }

  return next();
}
