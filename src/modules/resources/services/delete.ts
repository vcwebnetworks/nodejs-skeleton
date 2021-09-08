import { Transaction } from 'sequelize';

import { BadRequestError } from '@src/errors';

import dashboardDatabase from '@database/index';
import { RoleResourceModel, UserResourceModel } from '@database/models';

import resourceCheckByIdService from './check-by-id';

interface Request {
  id: string;
  force?: boolean;
}

class Delete {
  public async run({ id, force = false }: Request): Promise<void> {
    const rowResource = await resourceCheckByIdService.run(id);

    await this.checkRelationWithUser(rowResource.id, force);
    await this.checkRelationWithRole(rowResource.id, force);

    const transaction = await dashboardDatabase.transaction();

    try {
      await this.removeRelations({
        force,
        resourceId: rowResource.id,
        transaction,
      });

      await rowResource.destroy({
        transaction,
        force: true,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }

  protected async checkRelationWithRole(resourceId: string, force?: boolean) {
    if (force) {
      return;
    }

    const totalUserWithThisRole = await RoleResourceModel.count({
      where: { resource_id: resourceId },
    });

    if (totalUserWithThisRole > 0) {
      throw new BadRequestError(
        `This resource has ${totalUserWithThisRole} registered in roles.`,
      );
    }
  }

  protected async checkRelationWithUser(resourceId: string, force?: boolean) {
    if (force) {
      return;
    }

    const totalUserWithThisResource = await UserResourceModel.count({
      where: { resource_id: resourceId },
    });

    if (totalUserWithThisResource > 0) {
      throw new BadRequestError(
        `This resource has ${totalUserWithThisResource} registered in users.`,
      );
    }
  }

  protected async removeRelations({
    force,
    resourceId,
    transaction,
  }: {
    force: boolean | undefined;
    resourceId: string;
    transaction: Transaction;
  }): Promise<void> {
    if (!force) {
      return;
    }

    await RoleResourceModel.destroy({
      force: true,
      transaction,
      where: {
        resource_id: resourceId,
      },
    });

    await UserResourceModel.destroy({
      force: true,
      transaction,
      where: {
        resource_id: resourceId,
      },
    });
  }
}

const resourceDeleteService = new Delete();
export default resourceDeleteService;
