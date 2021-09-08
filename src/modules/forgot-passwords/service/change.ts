import { ForbiddenError, InvalidParamError } from '@src/errors';

import dashboardDatabase from '@database/index';
import { ForgotPasswordModel, UserModel } from '@database/models';

interface IRequest {
  hash: string;
  password: string;
}

class Change {
  public async run({ hash, password }: IRequest): Promise<void> {
    const transaction = await dashboardDatabase.transaction();

    try {
      const rowResetPassword = await ForgotPasswordModel.findOne({
        where: { hash },
        include: [UserModel],
      });

      if (!rowResetPassword) {
        throw new InvalidParamError('hash invalid');
      }

      if (rowResetPassword.validated_in === null) {
        throw new ForbiddenError('unconfirmed recovery link.');
      }

      await rowResetPassword.destroy({
        force: true,
        transaction,
      });

      rowResetPassword.user.password = password;
      await rowResetPassword.user.save({ transaction });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }
}

const forgotPasswordChangeService = new Change();
export default forgotPasswordChangeService;
