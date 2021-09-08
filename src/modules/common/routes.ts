import { Route } from '@src/@types/route';

import userMeController from '@modules/common/controllers/me';

const routes: Route[] = [
  {
    path: '/me',
    handler: userMeController.handle,
  },
];

export default routes;
