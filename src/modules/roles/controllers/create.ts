import { Request, Response } from 'express';

import roleCreateService from '@modules/roles/services/create';

class Create {
  public async handle(request: Request, response: Response) {
    const newRegister = await roleCreateService.run(request.body);

    return response.status(201).json(newRegister);
  }
}

const roleCreateController = new Create();
export default roleCreateController;
