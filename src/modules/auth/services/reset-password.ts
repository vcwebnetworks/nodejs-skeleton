import number from '@src/utils/number';

import NotFoundError from '@errors/not-found';

import { UserModel } from '@modules/users/models';
import { UserResetPasswordModel } from '@modules/users/models/reset-password';

class ResetPassword {
  public async sendCodeToMail(email: string): Promise<void> {
    const rowUser = await UserModel.findOne({ where: { email } });

    if (!rowUser) {
      throw new NotFoundError('E-mail não encontrado no sistema.');
    }

    await UserResetPasswordModel.destroy({
      force: true,
      where: { user_id: rowUser.id },
    });

    const code = await this.createRandomCode();

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 2);

    await UserResetPasswordModel.create({
      code,
      user_id: rowUser.id,
      expired_at: expiredAt,
    });
  }

  protected async createRandomCode(): Promise<number> {
    const randomCode = number.random(111111, 999999);

    const checkExistCode = await UserResetPasswordModel.findOne({
      where: { code: randomCode },
    });

    if (checkExistCode) {
      return this.createRandomCode();
    }

    return randomCode;
  }
}

const authResetPasswordService = new ResetPassword();
export default authResetPasswordService;
