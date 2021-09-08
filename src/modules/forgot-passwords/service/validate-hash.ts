import moment from 'moment-timezone';

import AppError from '@errors/app';
import NotFoundError from '@errors/not-found';

import { ForgotPasswordModel } from '@database/models';

class ValidateHash {
  public async run(hash: string): Promise<ForgotPasswordModel> {
    const rowResetPassword = await ForgotPasswordModel.findOne({
      where: { hash },
    });

    if (!rowResetPassword) {
      throw new NotFoundError('Link inválido.');
    }

    if (rowResetPassword.expired_at.valueOf() < new Date().valueOf()) {
      throw new AppError('Link expirado.');
    }

    rowResetPassword.validated_in = moment().toDate();
    await rowResetPassword.save();

    return rowResetPassword;
  }
}

const forgotPasswordValidateHashService = new ValidateHash();
export default forgotPasswordValidateHashService;
