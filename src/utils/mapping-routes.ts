import { Router } from 'express';

import { Route } from '@src/@types/route';
import { isAuthenticated } from '@src/middlewares';

const mappingRoutes = (router: Router) => (route: Route) => {
  if (Array.isArray(route.path)) {
    const [method, path] = route.path;

    route.path = path;
    route.method = method;
  }

  const middleware = route.middlewares ?? [];

  if (route.isAuthenticated) {
    middleware.unshift(isAuthenticated);
  }

  router[route.method ?? 'get'](route.path, ...middleware, route.handler);
};

export default mappingRoutes;
