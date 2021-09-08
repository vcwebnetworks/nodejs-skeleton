import { Router } from 'express';

import configRoutes from '@config/routes';
import { isBearerToken } from '@src/middlewares';

import swaggerRoutes from '@modules/swagger';
import mappingRoutes from '@utils/mapping-routes';

const routes = Router({
  strict: true,
  mergeParams: true,
  caseSensitive: false,
});

const sendStatusOk = (_: any, r: any) => r.sendStatus(200);

routes.get('/', sendStatusOk);
routes.get('/favicon.ico', sendStatusOk);
routes.get('/sw.js', sendStatusOk);
routes.use('/swagger', swaggerRoutes);

routes.use(isBearerToken);
configRoutes.map(mappingRoutes(routes));

export default routes;
