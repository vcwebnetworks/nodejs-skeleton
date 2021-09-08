import { Route } from '@src/@types/route';

import authLoginController from './controllers/login';
import authRegisterController from './controllers/register';
import authLoginValidator from './validators/login';
import authRegisterValidator from './validators/register';

const routes: Route[] = [
  {
    auth: false,
    path: ['post', '/auth/login'],
    handler: authLoginController.handle,
    middlewares: [authLoginValidator.body],
  },
  {
    auth: false,
    path: ['post', '/auth/register'],
    handler: authRegisterController.handle,
    middlewares: [authRegisterValidator.body],
  },
];

export default routes;
