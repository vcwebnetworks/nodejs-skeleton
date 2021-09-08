import dashboardDatabase from '@database/index';
import {
  UserResourceDto,
  UserResourceModel,
} from '@database/models/user-resource';
import userCheckByIdService from '@modules/users/services/check-by-id';

interface Request {
  userId: string;
  resourceIds: string[];
}

class CreateByIds {
  public async run({ userId, resourceIds }: Request): Promise<void> {
    const rowUser = await userCheckByIdService.run(userId);
    const transaction = await dashboardDatabase.transaction();

    try {
      const records: UserResourceDto[] = [];

      for await (const resourceId of resourceIds) {
        const rowExistResourceByUser = await UserResourceModel.findOne({
          where: { user_id: rowUser.id, resource_id: resourceId },
        });

        if (!rowExistResourceByUser) {
          records.push({
            user_id: rowUser.id,
            resource_id: resourceId,
          });
        }
      }

      if (records.length > 0) {
        await UserResourceModel.bulkCreate(records, {
          transaction,
        });
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }
}

const userResourceCreateByIdsService = new CreateByIds();
export default userResourceCreateByIdsService;
