import { Request, Response } from 'express';

import roleDeleteService from '@modules/roles/services/delete';

class Delete {
  public async handle(request: Request, response: Response) {
    await roleDeleteService.run(request.params.id);

    return response.sendStatus(200);
  }
}

const roleDeleteController = new Delete();
export default roleDeleteController;
