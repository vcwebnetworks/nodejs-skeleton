import { Request, Response } from 'express';

import resourceCreateService from '@modules/resources/services/create';

class Create {
  public async handle(request: Request, response: Response) {
    const newResource = await resourceCreateService.run(request.body);

    return response.status(201).json(newResource);
  }
}

const resourceCreateController = new Create();
export default resourceCreateController;
