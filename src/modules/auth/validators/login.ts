import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

class Login {
  public async body(request: Request, _response: Response, next: NextFunction) {
    await Yup.object()
      .shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })
      .validate(request.body);

    return next();
  }
}

const authLoginValidator = new Login();
export default authLoginValidator;
