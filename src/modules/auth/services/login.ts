import NotFoundError from '@errors/not-found';
import UnauthorizedError from '@errors/unauthorized';

import { UserModel } from '@database/models/user';

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
    const rowUser = await UserModel.findOne({ where: { email } });

    if (!rowUser) {
      throw new NotFoundError('User not found.');
    }

    if (!(await rowUser.verifyPassword(password))) {
      throw new UnauthorizedError('Username or password is not valid.');
    }

    const token = await rowUser.generateJwtToken();
    rowUser.setDataValue('password', undefined);

    return { user: rowUser, token };
  }
}

const authLoginService = new Login();
export default authLoginService;
