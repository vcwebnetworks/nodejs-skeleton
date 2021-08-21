import moment, { Moment } from 'moment-timezone';

import AppError from '@errors/app';
import NotFoundError from '@errors/not-found';
import mailer from '@shared/mailer';
import sequelize from '@src/database';

import { ForgotPasswordModel } from '@database/models/forgot-password';
import { UserModel } from '@modules/users/models';

class ForgotPasswordService {
  public async sendToMail(email: string): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const rowUser = await UserModel.findOne({ where: { email } });

      if (!rowUser) {
        throw new NotFoundError('User not found.');
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

      await this.sendMail(rowUser, newForgotPassword.hash, expiredAt);

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e;
    }
  }

  public async validateHash(hash: string): Promise<ForgotPasswordModel> {
    const rowResetPassword = await ForgotPasswordModel.findOne({
      where: { hash },
    });

    if (!rowResetPassword) {
      throw new NotFoundError('Invalid link.');
    }

    if (rowResetPassword.expired_at.valueOf() < new Date().valueOf()) {
      throw new AppError('Link expired.');
    }

    rowResetPassword.validated_in = moment().toDate();
    await rowResetPassword.save();

    return rowResetPassword;
  }

  protected async sendMail(
    rowUser: UserModel,
    hash: string,
    momentExpiredAt: Moment,
  ) {
    const linkResetPassword = `${process.env.ADMIN_URL}/reset-password/${hash}`;

    await mailer.sendMail({
      to: `${rowUser.name} <${rowUser.email}>`,
      subject: 'Password recovery.',
      from: mailer.options.from,
      html: `
        <p style="margin-bottom: 0;">Click on the link below to retrieve your password.</p>
        <p style="font-weight: bold; margin-bottom: 5px;"><a href="${linkResetPassword}">${linkResetPassword}</a></p>
        <p style="margin-bottom: 0;">Your link expires on ${momentExpiredAt.format(
          'DD/MM/YYYY HH:mm:ss',
        )}</p>
      `,
    });
  }
}

const authForgotPasswordService = new ForgotPasswordService();
export default authForgotPasswordService;
