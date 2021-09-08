import { Route } from '@src/@types/route';

import forgotPasswordChangeController from '@modules/forgot-passwords/controllers/change';
import forgotPasswordCreateController from '@modules/forgot-passwords/controllers/create';
import forgotPasswordValidateHashController from '@modules/forgot-passwords/controllers/validate-hash';
import forgotPasswordChangeValidator from '@modules/forgot-passwords/validators/change';

const routes: Route[] = [
  {
    auth: false,
    path: ['post', '/forgot-passwords'],
    handler: forgotPasswordCreateController.handle,
  },
  {
    auth: false,
    path: ['post', '/forgot-passwords/:hash/validate'],
    handler: forgotPasswordValidateHashController.handle,
  },
  {
    auth: false,
    path: ['post', '/forgot-passwords/:hash/change'],
    handler: forgotPasswordChangeController.handle,
    middlewares: [forgotPasswordChangeValidator.body],
  },
];

export default routes;
