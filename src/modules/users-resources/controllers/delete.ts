import { Request, Response } from 'express';

import userResourceDeleteService from '@modules/users-resources/services/delete';

class Delete {
  public async handle(request: Request, response: Response) {
    await userResourceDeleteService.run({
      userId: String(request.query.userId),
      userResourceId: request.params.id,
    });

    return response.sendStatus(200);
  }
}

const userResourceDeleteController = new Delete();
export default userResourceDeleteController;
