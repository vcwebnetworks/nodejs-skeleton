import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import authLoginController from '@modules/auth/controllers/login';
import authResetPasswordController from '@modules/auth/controllers/reset-password';

const routes = Router({ mergeParams: true });

routes.post(
  '/sign-in',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email().messages({
        'any.required': 'Por favor digite seu e-mail.',
        'string.email': 'O e-mail informado não tem um formato válido.',
      }),
      password: Joi.string().required().messages({
        'any.required': 'Por favor digite sua senha.',
      }),
    },
  }),
  authLoginController.handle,
);

routes.post(
  '/reset-password/send-code',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email().messages({
        'any.required': 'Por favor digite seu e-mail.',
        'string.email': 'O e-mail informado não tem um formato válido.',
      }),
    },
  }),
  authResetPasswordController.sendCode,
);

export default routes;
