import { BadRequestError } from '@errors/bad-request';

import { UserDto, UserModel } from '@database/models/user';

interface IResponse {
  user: UserModel;
  token: string;
}

class RegisterService {
  public async run({ name, email, password }: UserDto): Promise<IResponse> {
    await this.validateEmail(email);

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const token = await newUser.generateJwtToken();
    newUser.setDataValue('password', undefined);

    return { user: newUser, token };
  }

  protected async validateEmail(email: string): Promise<void> {
    const rowExistEmail = await UserModel.findOne({
      where: { email },
    });

    if (rowExistEmail) {
      throw new BadRequestError('This email is already in use.');
    }
  }
}

const authRegisterService = new RegisterService();
export default authRegisterService;
