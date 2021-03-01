import { Request, Response } from 'express';

import authenticationSignInService from '@src/modules/authentication/services/SignInService';

class SignInController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user, token } = await authenticationSignInService.run(request.body);

    return response.json({ user, token });
  }
}

const authenticationSignInController = new SignInController();
export default authenticationSignInController;
