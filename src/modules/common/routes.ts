import { Router } from 'express';

import commonIndexController from '@src/modules/common/controllers/IndexController';

const commonRoutes = Router();

commonRoutes.get('/', commonIndexController.index);

export default commonRoutes;
