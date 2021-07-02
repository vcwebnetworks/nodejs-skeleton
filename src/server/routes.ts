import { Router } from 'express';

import authRoutes from '@modules/authentication/routes';
import commonRoutes from '@modules/common/routes';
import swaggerRoutes from '@modules/swagger';

const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/docs', swaggerRoutes);
appRoutes.use(commonRoutes);

export default appRoutes;
