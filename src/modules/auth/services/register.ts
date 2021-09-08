import { UserDto, UserModel } from '@database/models/user';
import userCheckExistMailService from '@modules/users/services/check-exist-mail';

interface IResponse {
  user: UserModel;
  token: string;
}

class RegisterService {
  public async run({
    name,
    email,
    password,
    role_id,
  }: UserDto): Promise<IResponse> {
    await userCheckExistMailService.run(email);

    const newUser = await UserModel.create({
      name,
      email,
      password,
      status: 'online',
      role_id,
    });

    const token = await newUser.generateJwtToken();
    newUser.setDataValue<any>('password', undefined);

    return { user: newUser, token };
  }
}

const authRegisterService = new RegisterService();
export default authRegisterService;
