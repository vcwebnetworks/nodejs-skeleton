import { Request, Response } from 'express';

import userResourceCreateByIdsService from '@modules/users-resources/services/create-by-ids';

class Create {
  public async handle(request: Request, response: Response) {
    await userResourceCreateByIdsService.run({
      userId: request.body.userId,
      resourceIds: [request.body.resourceId],
    });

    return response.sendStatus(201);
  }
}

const userResourceCreateController = new Create();
export default userResourceCreateController;
