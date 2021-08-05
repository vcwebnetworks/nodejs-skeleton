import { Router } from 'express';

import commonHomeController from '@modules/common/controllers/home';

const commonRoutes = Router();

commonRoutes.get('/', commonHomeController.index);
commonRoutes.get('/favicon.ico', (_, response) => response.sendStatus(200));
commonRoutes.get('/sw.js', (_, response) => response.sendStatus(200));

export default commonRoutes;
