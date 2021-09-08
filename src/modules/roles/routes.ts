import { Route } from '@src/@types/route';

import roleCreateController from '@modules/roles/controllers/create';
import roleDeleteController from '@modules/roles/controllers/delete';
import roleFindController from '@modules/roles/controllers/find';

const routes: Route[] = [
  {
    path: ['get', '/roles'],
    handler: roleFindController.index,
  },
  {
    path: ['post', '/roles'],
    handler: roleCreateController.handle,
  },
  {
    path: ['delete', '/roles/:id'],
    handler: roleDeleteController.handle,
  },
];

export default routes;
