import { Request, Response } from 'express';

import resourceDeleteService from '@modules/resources/services/delete';
import normalizeValue from '@utils/normalize-value';

class Delete {
  public async handle(request: Request, response: Response) {
    await resourceDeleteService.run({
      id: request.params.id,
      force: normalizeValue<boolean>(request.query.force ?? false),
    });

    return response.sendStatus(200);
  }
}

const resourceDeleteController = new Delete();
export default resourceDeleteController;
