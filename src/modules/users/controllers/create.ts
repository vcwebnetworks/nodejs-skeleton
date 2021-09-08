import { Request, Response } from 'express';

import userCreateService from '@modules/users/services/create';

class Create {
  public async handle(request: Request, response: Response) {
    const newUser = await userCreateService.run(request.body);
    newUser.setDataValue<any>('password', undefined);

    return response.status(201).json(newUser);
  }
}

const userCreateController = new Create();
export default userCreateController;
