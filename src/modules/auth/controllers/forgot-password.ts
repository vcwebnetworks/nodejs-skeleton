import { Request, Response } from 'express';
import * as Yup from 'yup';

import authForgotPasswordService from '@modules/auth/services/forgot-password';

class ForgotPassword {
  public async sendMail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    await Yup.string().required().email().validate(email);
    await authForgotPasswordService.sendToMail(email);

    return response.sendStatus(200);
  }

  public async validateHash(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { hash } = request.params;

    await Yup.string().uuid().validate(hash);
    await authForgotPasswordService.validateHash(hash);

    return response.sendStatus(200);
  }
}

const authForgotPasswordController = new ForgotPassword();
export default authForgotPasswordController;
