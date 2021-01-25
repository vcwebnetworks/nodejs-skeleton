import { Router } from 'express';

import commonRoutes from '@src/modules/common/routes';
import swaggerRoutes from '@src/modules/swagger';

const appRoutes = Router();

appRoutes.use(commonRoutes);
appRoutes.use('/docs', swaggerRoutes);

export default appRoutes;
