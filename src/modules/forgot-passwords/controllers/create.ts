import { Request, Response } from 'express';
import * as Yup from 'yup';

import forgotPasswordCreateService from '@modules/forgot-passwords/service/create';
import forgotPasswordValidateHashService from '@modules/forgot-passwords/service/validate-hash';

class Create {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await Yup.string().required().email().validate(email);
    await forgotPasswordCreateService.run(email);

    return response.sendStatus(200);
  }

  public async validateHash(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { hash } = request.params;
    await Yup.string().uuid().validate(hash);

    await forgotPasswordValidateHashService.run(hash);

    return response.sendStatus(200);
  }
}

const forgotPasswordCreateController = new Create();
export default forgotPasswordCreateController;
