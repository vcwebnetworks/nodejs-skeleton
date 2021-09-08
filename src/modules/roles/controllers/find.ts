import { Request, Response } from 'express';

import { RoleModel } from '@database/models';

class Find {
  public async index(_: Request, response: Response) {
    const roles = await RoleModel.findAll({
      order: [['created_at', 'desc']],
    });

    return response.json(roles);
  }
}

const roleFindController = new Find();
export default roleFindController;
