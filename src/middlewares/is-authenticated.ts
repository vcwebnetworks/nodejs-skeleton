import { NextFunction, Request, Response } from 'express';

import { ForbiddenError, UnauthorizedError } from '@errors/index';

import {
  ResourceModel,
  RoleModel,
  UserModel,
  UserResourceModel,
} from '@database/models';

const validateLoggedUser = async (request: Request) => {
  if (!request.jwtDecode?.sub) {
    throw new UnauthorizedError(
      'Access denied, please login and try again.',
      'token.invalid',
    );
  }

  const rowUser = await UserModel.findOne({
    where: { id: request.jwtDecode.sub },
    attributes: { exclude: ['role_id'] },
    include: [
      {
        model: RoleModel,
        attributes: ['id', 'name'],
      },
      {
        model: UserResourceModel,
        attributes: ['id'],
        include: [
          {
            model: ResourceModel,
            attributes: ['id', 'method', 'path'],
          },
        ],
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
      path: request.route.path.trim(),
    },
  });

  // TODO
  // VERIFY IF THERE CAN EXIST A ROUTE WITHOUT HAVING PERMISSION.

  // if (!rowResource) {
  //   throw new PageNotFoundError(request);
  // }

  if (rowResource) {
    const userHasPermissionInResource = request.loggedUser.resources?.some(
      row => row.resource!.id === rowResource.id,
    );

    if (!userHasPermissionInResource) {
      throw new ForbiddenError(
        `Resource access ([${rowResource.method}] ${rowResource.path}) not authorized.`,
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
