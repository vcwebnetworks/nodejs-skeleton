import { BadRequestError, ForbiddenError } from '@src/errors';

import { UserResourceModel } from '@database/models';
import userCheckByIdService from '@modules/users/services/check-by-id';

interface Request {
  userId: string;
  userResourceId: string;
}

class Delete {
  public async run({ userId, userResourceId }: Request) {
    const rowUser = await userCheckByIdService.run(userId);

    const rowUserResource = await UserResourceModel.findOne({
      where: { id: userResourceId },
    });

    if (!rowUserResource) {
      throw new BadRequestError('The resource not found.');
    }

    if (rowUserResource.user_id !== rowUser.id) {
      throw new ForbiddenError('The resource does not belong to that user.');
    }

    await rowUserResource.destroy();
  }
}

const userResourceDeleteService = new Delete();
export default userResourceDeleteService;
