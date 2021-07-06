import NotFoundError from '@errors/not.found';
import UnauthorizedError from '@errors/unauthorized';

import { UserModel } from '@modules/users/models/user';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserModel;
  token: string;
}

class Login {
  public async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (!(await user.verifyPassword(password))) {
      throw new UnauthorizedError('Username or password is invalid.');
    }

    const token = await user.generateJwtToken();
    user.setDataValue('password', undefined);

    return { user, token };
  }
}

const authLoginService = new Login();
export default authLoginService;
