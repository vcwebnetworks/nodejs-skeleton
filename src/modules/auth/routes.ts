import { Router } from 'express';

import authForgotPasswordController from './controllers/forgot-password';
import authLoginController from './controllers/login';
import authRegisterController from './controllers/register';
import authResetPasswordController from './controllers/reset-password';
import authLoginValidator from './validators/login';
import authRegisterValidator from './validators/register';
import authResetPasswordValidator from './validators/reset-password';

const routes = Router({ mergeParams: true });

routes.post('/login', authLoginValidator.body, authLoginController.handle);

routes.post(
  '/register',
  authRegisterValidator.body,
  authRegisterController.handle,
);

routes.post(
  '/forgot-password/send-mail',
  authForgotPasswordController.sendMail,
);

routes.post(
  '/forgot-password/validate/:hash',
  authForgotPasswordController.validateHash,
);

routes.post(
  '/reset-password/:hash',
  authResetPasswordValidator.body,
  authResetPasswordController.handle,
);

export default routes;
