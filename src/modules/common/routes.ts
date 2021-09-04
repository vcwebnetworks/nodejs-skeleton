import { Router } from 'express';

import swaggerRoutes from '@modules/swagger';

const routes = Router({ mergeParams: true });

routes.get('/', (_, res) => res.sendStatus(200));
routes.get('/favicon.ico', (_, res) => res.sendStatus(200));
routes.get('/sw.js', (_, res) => res.sendStatus(200));

routes.use('/swagger', swaggerRoutes);

export default routes;
