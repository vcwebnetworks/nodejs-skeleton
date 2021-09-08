import { Route } from '@src/@types/route';

import resourceCreateController from '@modules/resources/controllers/create';
import resourceDeleteController from '@modules/resources/controllers/delete';
import resourceFindController from '@modules/resources/controllers/find';
import resourceSyncController from '@modules/resources/controllers/sync';
import resourceCreateValidator from '@modules/resources/validators/create';

const routes: Route[] = [
  {
    path: ['get', '/resources'],
    handler: resourceFindController.index,
  },
  {
    path: ['post', '/resources'],
    handler: resourceCreateController.handle,
    middlewares: [resourceCreateValidator.body],
  },
  {
    path: ['post', '/resources/sync'],
    handler: resourceSyncController.handle,
  },
  {
    path: ['delete', '/resources/:id'],
    handler: resourceDeleteController.handle,
  },
];

export default routes;
