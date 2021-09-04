import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

class ResetPassword {
  public async body(request: Request, _response: Response, next: NextFunction) {
    await Yup.object()
      .shape({
        hash: Yup.string().uuid(),
        password: Yup.string().required().min(8),
        password_confirm: Yup.string()
          .required()
          .oneOf([Yup.ref('password')]),
      })
      .validate({
        ...request.body,
        hash: request.params.hash,
      });

    return next();
  }
}

const authResetPasswordValidator = new ResetPassword();
export default authResetPasswordValidator;
