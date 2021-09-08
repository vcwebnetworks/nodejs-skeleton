import { Request, Response } from 'express';

import {
  ResourceModel,
  RoleModel,
  UserModel,
  UserResourceModel,
} from '@database/models';

class Find {
  public async index(request: Request, response: Response) {
    const { limit = 10, page = 1 } = request.query as any;
    const offset = (page - 1) * limit;

    const users = await UserModel.findAll({
      limit,
      offset,
      order: [['created_at', 'desc']],
      attributes: { exclude: ['role_id', 'password'] },
      include: [
        {
          model: RoleModel,
          attributes: ['id', 'name'],
        },
        {
          model: UserResourceModel,
          attributes: ['id', 'created_at'],
          include: [ResourceModel],
        },
      ],
    });

    return response.json(users);
  }
}

const userFindController = new Find();
export default userFindController;
