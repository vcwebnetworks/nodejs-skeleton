import NotFoundError from '@errors/not-found';
import UnauthorizedError from '@errors/unauthorized';

import {
  ResourceModel,
  RoleModel,
  UserModel,
  UserResourceModel,
} from '@database/models';

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
    const rowUser = await UserModel.findOne({
      where: { email: email.toLowerCase() },
      attributes: { exclude: ['role_id'] },
      include: [
        {
          model: RoleModel,
          attributes: ['id', 'name'],
        },
        {
          model: UserResourceModel,
          attributes: ['id'],
          include: [
            {
              model: ResourceModel,
              attributes: ['id', 'method', 'path'],
            },
          ],
        },
      ],
    });

    if (!rowUser) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (!(await rowUser.verifyPassword(password))) {
      throw new UnauthorizedError('Usuário ou senha não é válido.');
    }

    const token = await rowUser.generateJwtToken();
    rowUser.setDataValue<any>('password', undefined);

    return { user: rowUser, token };
  }
}

const authLoginService = new Login();
export default authLoginService;
