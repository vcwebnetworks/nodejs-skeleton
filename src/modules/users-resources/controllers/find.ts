import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';

import { ResourceModel, UserModel, UserResourceModel } from '@database/models';

class Find {
  public async index(request: Request, response: Response) {
    const { limit = 10, page = 1, userId } = request.query as any;
    const offset = (page - 1) * limit;
    const where: WhereOptions = {};

    if (userId) {
      where.user_id = userId;
    }

    const resources = await UserResourceModel.findAll({
      limit,
      offset,
      where,
      order: [['created_at', 'desc']],
      attributes: ['id', 'created_at'],
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name'],
        },
        {
          model: ResourceModel,
          attributes: ['id', 'method', 'path'],
        },
      ],
    });

    return response.json(resources);
  }
}

const userResourceFindController = new Find();
export default userResourceFindController;
