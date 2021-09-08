import { Request, Response } from 'express';

class Me {
  public async handle(request: Request, response: Response) {
    request.loggedUser.setDataValue<any>('password', undefined);

    return response.json(request.loggedUser);
  }
}

const userMeController = new Me();
export default userMeController;
