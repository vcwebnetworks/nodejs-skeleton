import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { ResourceModel } from '@database/models';

class Create {
  public async body(request: Request, _: Response, next: NextFunction) {
    await yup
      .object()
      .shape({
        name: yup.string().required(),
        path: yup.string().required(),
        method: yup
          .string()
          .oneOf(
            ResourceModel.getValidMethod(),
            `method is valid values (${ResourceModel.getValidMethod().join(
              ', ',
            )})`,
          ),
      })
      .validate(request.body);

    next();
  }
}

const resourceCreateValidator = new Create();
export default resourceCreateValidator;
