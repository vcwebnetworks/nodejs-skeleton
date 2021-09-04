import { Request, Response } from 'express';

import authResetPasswordService from '@modules/auth/services/reset-password';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { hash } = request.params;
    const { password } = request.body;

    await authResetPasswordService.run({
      hash,
      password,
    });

    return response.sendStatus(200);
  }
}

const authResetPasswordController = new ResetPasswordController();
export default authResetPasswordController;
