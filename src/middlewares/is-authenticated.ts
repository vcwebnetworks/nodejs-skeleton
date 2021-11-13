import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@src/errors';

import { UserModel } from '@database/models';

const validateLoggedUser = async (request: Request) => {
  const rowUser = await UserModel.findOne({
    where: { id: request.jwtDecode.sub },
  });

  if (!rowUser) {
    throw new UnauthorizedError({
      message: 'Invalid user.',
      code: 'token.invalid',
    });
  }

  request.userData = rowUser;
};

export const isAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  if (!request.jwtDecode?.sub) {
    throw new UnauthorizedError({
      message: 'Access denied, please login and try again.',
      code: 'token.invalid',
    });
  }

  await validateLoggedUser(request);

  return next();
};
