import { Route } from '@src/@types/route';

import userResourceCreateController from '@modules/users-resources/controllers/create';
import userResourceCreateByIdsController from '@modules/users-resources/controllers/create-by-ids';
import userResourceDeleteController from '@modules/users-resources/controllers/delete';
import userResourceFindController from '@modules/users-resources/controllers/find';

const routes: Route[] = [
  {
    path: ['get', '/users-resources'],
    handler: userResourceFindController.index,
  },
  {
    path: ['post', '/users-resources'],
    handler: userResourceCreateController.handle,
  },
  {
    path: ['delete', '/users-resources/:id'],
    handler: userResourceDeleteController.handle,
  },
  {
    path: ['post', '/users-resources/create-by-ids'],
    handler: userResourceCreateByIdsController.handle,
  },
];

export default routes;
