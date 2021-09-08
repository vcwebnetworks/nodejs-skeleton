import { Transaction } from 'sequelize';

import { InvalidParamError } from '@src/errors';

import { UserModel } from '@database/models';

class CheckById {
  public async run(id: string, transaction?: Transaction): Promise<UserModel> {
    const newUser = await UserModel.findOne({
      limit: 1,
      where: { id },
      transaction,
    });

    if (!newUser) {
      throw new InvalidParamError('User not exists.');
    }

    return newUser;
  }
}

const userCheckByIdService = new CheckById();
export default userCheckByIdService;
