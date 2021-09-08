import { InvalidParamError } from '@src/errors';

import dashboardDatabase from '@database/index';
import { UserDto, UserModel } from '@database/models/user';
import roleCheckByIdService from '@modules/roles/services/check-by-id';
import userResourceCreateByRoleId from '@modules/users-resources/services/create-by-role-id';
import userCheckExistMailService from '@modules/users/services/check-exist-mail';

class Create {
  public async run(payload: UserDto) {
    await roleCheckByIdService.run(payload.role_id);
    await userCheckExistMailService.run(payload.email);

    const transaction = await dashboardDatabase.transaction();

    try {
      if (payload.password.length < 6) {
        throw new InvalidParamError('password must be at least 6 characters');
      }

      const newUser = await UserModel.create(
        {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          role_id: payload.role_id,
          status: payload.status,
        },
        { transaction },
      );

      await userResourceCreateByRoleId.run({
        userId: newUser.id,
        roleId: newUser.role_id,
        checkIds: false,
        transaction,
      });

      await transaction.commit();

      return newUser;
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }
}

const userCreateService = new Create();
export default userCreateService;
