import { Route } from '@src/@types/route';

import userCreateController from '@modules/users/controllers/create';
import userDeleteController from '@modules/users/controllers/delete';
import userFindController from '@modules/users/controllers/find';
import userCreateValidator from '@modules/users/validators/create';

const routes: Route[] = [
  {
    path: ['get', '/users'],
    handler: userFindController.index,
  },
  {
    path: ['post', '/users'],
    handler: userCreateController.handle,
    middlewares: [userCreateValidator.body],
  },
  {
    path: ['delete', '/users/:id'],
    handler: userDeleteController.handle,
  },
];

export default routes;
