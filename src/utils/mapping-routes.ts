import { Router } from 'express';

import { Route } from '@src/@types/route';
import { isAdmin, isAuthenticated } from '@src/middlewares';

const mappingRoutes = (router: Router) => (route: Route) => {
  if (Array.isArray(route.path)) {
    const [method, path] = route.path;

    route.path = path;
    route.method = method;
  }

  const middleware = route.middlewares ?? [];

  if ((route.auth || route.auth === undefined) && !route.admin) {
    middleware.unshift(isAuthenticated);
  }

  if (route.admin === true) {
    middleware.unshift(isAdmin);
  }

  router[route.method ?? 'get'].apply(router, [
    route.path,
    ...middleware,
    route.handler,
  ]);
};

export default mappingRoutes;
