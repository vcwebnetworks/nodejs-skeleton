import { Router } from 'express';

import authRoutes from '@modules/auth/routes';
import commonRoutes from '@modules/common/routes';
import swaggerRoutes from '@modules/swagger';

const routes = Router({ mergeParams: true });

routes.use('/auth', authRoutes);
routes.use('/docs', swaggerRoutes);
routes.use(commonRoutes);

export default routes;
