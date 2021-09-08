import { Request, Response } from 'express';

import forgotPasswordChangeService from '@modules/forgot-passwords/service/change';

class Change {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { hash } = request.params;
    const { password } = request.body;

    await forgotPasswordChangeService.run({
      hash,
      password,
    });

    return response.sendStatus(200);
  }
}

const forgotPasswordChangeController = new Change();
export default forgotPasswordChangeController;
