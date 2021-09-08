import { InvalidParamError, UnprocessableEntityError } from '@src/errors';

import { UserModel } from '@database/models';

interface Request {
  userId: string;
  loggedUserId?: string;
  force?: boolean;
}

class Delete {
  public async run({
    userId,
    loggedUserId,
    force = false,
  }: Request): Promise<void> {
    if (userId === loggedUserId) {
      throw new UnprocessableEntityError(
        'You cannot remove your own username.',
      );
    }

    const rowUser = await UserModel.findOne({
      paranoid: false,
      where: { id: userId },
    });

    if (!rowUser) {
      throw new InvalidParamError('User not exists.');
    }

    await rowUser.destroy({ force });
  }
}

const userDeleteService = new Delete();
export default userDeleteService;
