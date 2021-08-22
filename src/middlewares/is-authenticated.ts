import { NextFunction, Request, Response } from 'express';

import { ForbiddenError, UnauthorizedError } from '@errors/index';

import { ResourceModel, UserModel, UserResourceModel } from '@database/models';

const validateLoggedUser = async (request: Request) => {
  if (!request.jwtDecode?.sub) {
    throw new UnauthorizedError('Jwt invalid.', 'token.invalid');
  }

  const rowUser = await UserModel.findOne({
    where: { id: request.jwtDecode.sub },
    include: [
      {
        model: UserResourceModel,
        include: [ResourceModel],
      },
    ],
  });

  if (!rowUser) {
    throw new UnauthorizedError('Invalid user.', 'token.invalid');
  }

  request.loggedUser = rowUser;
};

const validatePermission = async (request: Request) => {
  const rowResource = await ResourceModel.findOne({
    where: {
      method: request.method.toLowerCase(),
      path: request.route.path,
    },
  });

  if (rowResource) {
    const userHasPermissionInResource = request.loggedUser.resources?.some(
      row => row.resource_id === rowResource.id,
    );

    if (!userHasPermissionInResource) {
      throw new ForbiddenError(
        `Access to resource "${rowResource.name}" not authorized.`,
      );
    }
  }
};

export const isAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  await validateLoggedUser(request);
  await validatePermission(request);

  return next();
};
