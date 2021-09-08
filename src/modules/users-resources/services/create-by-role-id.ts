import { Transaction } from 'sequelize';

import { RoleResourceModel, UserResourceModel } from '@database/models';
import roleCheckByIdService from '@modules/roles/services/check-by-id';
import userCheckByIdService from '@modules/users/services/check-by-id';

interface Request {
  userId: string;
  roleId: string;
  checkIds: boolean;
  transaction?: Transaction;
}

class CreateByRoleId {
  public async run({
    userId,
    roleId,
    checkIds = true,
    transaction,
  }: Request): Promise<void> {
    if (checkIds) {
      await roleCheckByIdService.run(roleId, transaction);
      await userCheckByIdService.run(userId, transaction);
    }

    const resourcesRows = await RoleResourceModel.findAll({
      where: { role_id: roleId },
    });

    await Promise.all(
      resourcesRows.map(async row => {
        await UserResourceModel.create(
          {
            user_id: userId,
            resource_id: row.resource_id,
          },
          { transaction },
        );
      }),
    );
  }
}

const userResourceCreateByRoleId = new CreateByRoleId();
export default userResourceCreateByRoleId;
