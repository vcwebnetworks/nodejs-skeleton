import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { UserModel } from '@database/models';

class Create {
  public async body(request: Request, _: Response, next: NextFunction) {
    await yup
      .object()
      .shape({
        role_id: yup.string().required().uuid('role id invalid'),
        name: yup.string().required(),
        email: yup.string().required().email(),
        status: yup.string().oneOf(UserModel.getValidStatus()),
        password: yup.string().required(),
        password_confirm: yup
          .string()
          .required()
          .oneOf([yup.ref('password')], 'passwords must be the same'),
      })
      .validate(request.body);

    delete request.body.password_confirm;

    next();
  }
}

const userCreateValidator = new Create();
export default userCreateValidator;
