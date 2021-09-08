import { Request, Response } from 'express';

import userDeleteService from '@modules/users/services/delete';
import normalizeValue from '@utils/normalize-value';

class Delete {
  public async handle(request: Request, response: Response) {
    await userDeleteService.run({
      userId: request.params.id,
      loggedUserId: request.loggedUser.id,
      force: normalizeValue<boolean>(request.query.force),
    });

    return response.sendStatus(204);
  }
}

const userDeleteController = new Delete();
export default userDeleteController;
