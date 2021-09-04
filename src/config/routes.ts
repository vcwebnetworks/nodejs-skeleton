import { Router } from 'express';

import { apiTokenMiddleware } from '@src/middlewares';

import authRouteMapping from '@modules/auth/routes';
import commonRoutes from '@modules/common/routes';
import userRouteMapping from '@modules/users/routes';
import mappingRoutes from '@utils/mapping-routes';
import normalizeValue from '@utils/normalize-value';

const routes = Router({ mergeParams: true });

routes.use(commonRoutes);

if (normalizeValue<boolean>(process.env.PROTECT_ALL_ROUTES_WITH_TOKEN)) {
  routes.use(apiTokenMiddleware);
}

[...authRouteMapping, ...userRouteMapping].map(mappingRoutes(routes));

export default routes;
