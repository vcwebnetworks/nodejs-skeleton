import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

import validator from '@utils/validator';

class Register {
  public async body(request: Request, _response: Response, next: NextFunction) {
    await Yup.object()
      .shape({
        name: Yup.string()
          .required()
          .test({
            name: 'completeName',
            message: 'Enter your first and last name.',
            exclusive: true,
            test: (value: any) => validator.isCompleteName(value),
          }),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
        password_confirm: Yup.string()
          .required()
          .oneOf([Yup.ref('password')]),
      })
      .validate(request.body);

    delete request.body.password_confirm;

    return next();
  }
}

const authRegisterValidator = new Register();
export default authRegisterValidator;
