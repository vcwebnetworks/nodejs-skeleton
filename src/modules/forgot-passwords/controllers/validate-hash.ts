import { Request, Response } from 'express';
import * as Yup from 'yup';

import forgotPasswordValidateHashService from '@modules/forgot-passwords/service/validate-hash';

class ValidateHash {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { hash } = request.params;

    await Yup.string().uuid('link de recuperação é inválido.').validate(hash);
    await forgotPasswordValidateHashService.run(hash);

    return response.sendStatus(200);
  }
}

const forgotPasswordValidateHashController = new ValidateHash();
export default forgotPasswordValidateHashController;
