import { Request, Response } from 'express';

import authLoginService from '@modules/auth/services/login';

class Login {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user, token } = await authLoginService.run(request.body);

    return response.json({ user, token });
  }
}

const authLoginController = new Login();
export default authLoginController;
