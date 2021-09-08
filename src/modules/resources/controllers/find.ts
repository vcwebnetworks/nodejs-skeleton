import { Request, Response } from 'express';

import { ResourceModel } from '@database/models';

class Find {
  public async index(_: Request, response: Response) {
    const resources = await ResourceModel.findAll({
      order: [['created_at', 'desc']],
    });

    return response.json(resources);
  }
}

const resourceFindController = new Find();
export default resourceFindController;
