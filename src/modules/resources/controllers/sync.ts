import { Request, Response } from 'express';

import { ResourceModel } from '@database/models';

class Sync {
  public async handle(_: Request, response: Response) {
    const newResources: ResourceModel[] = [];

    return response.json(newResources);
  }
}

const resourceSyncController = new Sync();
export default resourceSyncController;
