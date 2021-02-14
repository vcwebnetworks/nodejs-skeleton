import { Router } from 'express';

import authenticationSignInController from '@src/modules/authentication/controllers/SignInController';

const authRoutes = Router({ mergeParams: true });

authRoutes.post('/sign-in', authenticationSignInController.handle);

export default authRoutes;
