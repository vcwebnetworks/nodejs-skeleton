import { NextFunction, Request, Response } from 'express';
import i18next from 'i18next';
import httpMiddleware from 'i18next-http-middleware';
import { setLocale } from 'yup';

export const translationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return httpMiddleware.handle(i18next)(request, response, next);
};

export const translationYupMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  try {
    setLocale((await import(`@/translations/${request.language}/yup`)).default);
  } catch (e) {
    setLocale((await import('@/translations/pt_BR/yup')).default);
  }

  return next();
};
