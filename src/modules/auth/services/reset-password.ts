import sequelize from '@src/database';
import { ForbiddenError, InvalidParamError } from '@src/errors';

import { ForgotPasswordModel, UserModel } from '@modules/users/models';

interface IRequest {
  hash: string;
  password: string;
}

class ResetPasswordService {
  public async run({ hash, password }: IRequest): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const rowResetPassword = await ForgotPasswordModel.findOne({
        where: { hash },
        include: [UserModel],
      });

      if (!rowResetPassword) {
        throw new InvalidParamError('hash');
      }

      if (rowResetPassword.validated_in === null) {
        throw new ForbiddenError('Unconfirmed recovery link.');
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

const authResetPasswordService = new ResetPasswordService();
export default authResetPasswordService;
