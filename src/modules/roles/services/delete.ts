import { BadRequestError } from '@src/errors';

import dashboardDatabase from '@database/index';
import { RoleResourceModel, UserModel } from '@database/models';
import roleCheckByIdService from '@modules/roles/services/check-by-id';

class Delete {
  public async run(id: string): Promise<void> {
    const rowRole = await roleCheckByIdService.run(id);

    await this.checkRelations(rowRole.id);

    const transaction = await dashboardDatabase.transaction();

    try {
      await RoleResourceModel.destroy({
        where: { role_id: rowRole.id },
        transaction,
      });

      await rowRole.destroy({ transaction });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }

  protected async checkRelations(roleId: string) {
    const totalUserWithThisRole = await UserModel.count({
      where: { role_id: roleId },
    });

    if (totalUserWithThisRole > 0) {
      throw new BadRequestError(
        `This role has ${totalUserWithThisRole} registered users.`,
      );
    }
  }
}

const roleDeleteService = new Delete();
export default roleDeleteService;
