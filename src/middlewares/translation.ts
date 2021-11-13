import { NextFunction, Request, Response } from 'express';
import i18next from 'i18next';
import httpMiddleware from 'i18next-http-middleware';

export const translationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return httpMiddleware.handle(i18next)(request, response, next);
};
