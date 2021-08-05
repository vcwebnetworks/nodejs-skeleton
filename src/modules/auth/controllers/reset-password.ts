import { Request, Response } from 'express';

import authResetPasswordService from '@modules/auth/services/reset-password';

class ResetPassword {
  public async sendCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    await authResetPasswordService.sendCodeToMail(email);

    return response.sendStatus(200);
  }
}

const authResetPasswordController = new ResetPassword();
export default authResetPasswordController;
