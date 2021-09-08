import moment from 'moment-timezone';

import NotFoundError from '@errors/not-found';

import dashboardDatabase from '@database/index';
import { ForgotPasswordModel, UserModel } from '@database/models';
import forgotPasswordSendMailLinkService from '@modules/forgot-passwords/service/send-mail-link';

class Create {
  public async run(email: string): Promise<void> {
    const transaction = await dashboardDatabase.transaction();

    try {
      const rowUser = await UserModel.findOne({ where: { email } });

      if (!rowUser) {
        throw new NotFoundError('Usuário não encontrado.');
      }

      await ForgotPasswordModel.destroy({
        force: true,
        where: { user_id: rowUser.id },
        transaction,
      });

      const expiredAt = moment().add(2, 'hours');
      const newForgotPassword = await ForgotPasswordModel.create(
        {
          user_id: rowUser.id,
          expired_at: expiredAt.toDate(),
        },
        {
          transaction,
        },
      );

      await forgotPasswordSendMailLinkService.run(
        rowUser,
        newForgotPassword.hash,
        expiredAt,
      );

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }
}

const forgotPasswordCreateService = new Create();
export default forgotPasswordCreateService;
