import { Route } from '@src/@types/route';

import authForgotPasswordController from './controllers/forgot-password';
import authLoginController from './controllers/login';
import authRegisterController from './controllers/register';
import authResetPasswordController from './controllers/reset-password';
import authLoginValidator from './validators/login';
import authRegisterValidator from './validators/register';
import authResetPasswordValidator from './validators/reset-password';

const authRouteMapping: Route[] = [
  {
    path: ['post', '/auth/login'],
    handler: authLoginController.handle,
    middlewares: [authLoginValidator.body],
  },
  {
    path: ['post', '/auth/register'],
    handler: authRegisterController.handle,
    middlewares: [authRegisterValidator.body],
  },
  {
    path: ['post', '/auth/forgot-password/send-mail'],
    handler: authForgotPasswordController.sendMail,
  },
  {
    path: ['post', '/auth/forgot-password/validate/:hash'],
    handler: authForgotPasswordController.validateHash,
  },
  {
    path: ['post', '/auth/reset-password/:hash'],
    handler: authResetPasswordController.handle,
    middlewares: [authResetPasswordValidator.body],
  },
];

export default authRouteMapping;
