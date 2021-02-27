import { Request, Response } from 'express';

import { UserModel } from '@src/database/models/UserModel';
import UnauthorizedError from '@src/errors/UnauthorizedError';

class SignInController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user || !(await user.verifyPassword(password))) {
      throw new UnauthorizedError('Username or password is invalid.');
    }

    const token = await user.generateJwtToken();
    user.setDataValue('password', undefined);

    return response.json({ user, token });
  }
}

const authenticationSignInController = new SignInController();
export default authenticationSignInController;
