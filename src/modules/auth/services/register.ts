import { UserDto, UserModel } from '@database/models/user';
import userCheckExistMailService from '@modules/users/services/check-exist-mail';

interface IResponse {
  user: UserModel;
  token: string;
}

class RegisterService {
  public async run({ name, email, password }: UserDto): Promise<IResponse> {
    await userCheckExistMailService.run(email);

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const token = await newUser.generateJwtToken();
    newUser.setDataValue('password', undefined);

    return { user: newUser, token };
  }
}

const authRegisterService = new RegisterService();
export default authRegisterService;
