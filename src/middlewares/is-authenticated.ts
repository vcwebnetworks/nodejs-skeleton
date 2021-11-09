import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@errors/index';

import { UserModel } from '@database/models';

const validateLoggedUser = async (request: Request) => {
  if (!request.jwtDecode?.sub) {
    throw new UnauthorizedError(
      'Access denied, please login and try again.',
      'token.invalid',
    );
  }

  const rowUser = await UserModel.findOne({
    where: { id: request.jwtDecode.sub },
  });

  if (!rowUser) {
    throw new UnauthorizedError('Invalid user.', 'token.invalid');
  }

  request.userData = rowUser;
};

export const isAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  await validateLoggedUser(request);

  return next();
};
