import { Request, Response } from 'express';

import authRegisterService from '@modules/auth/services/register';

class RegisterController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user, token } = await authRegisterService.run(request.body);

    return response.status(201).json({
      user,
      token,
    });
  }
}

const authRegisterController = new RegisterController();
export default authRegisterController;
