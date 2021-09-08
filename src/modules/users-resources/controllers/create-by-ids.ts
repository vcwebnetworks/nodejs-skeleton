import { Request, Response } from 'express';

import userResourceCreateByIdsService from '@modules/users-resources/services/create-by-ids';

class CreateByIds {
  public async handle(request: Request, response: Response) {
    await userResourceCreateByIdsService.run(request.body);

    return response.sendStatus(201);
  }
}

const userResourceCreateByIdsController = new CreateByIds();
export default userResourceCreateByIdsController;
