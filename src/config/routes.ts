import { Route } from '@src/@types/route';

import authRoutes from '@modules/auth/routes';
import commonRoutes from '@modules/common/routes';
import forgotPasswordRoutes from '@modules/forgot-passwords/routes';
import resourceRoutes from '@modules/resources/routes';
import roleRoutes from '@modules/roles/routes';
import userResourceRoutes from '@modules/users-resources/routes';
import userRoutes from '@modules/users/routes';

const configRoutes: Route[] = [
  ...authRoutes,
  ...commonRoutes,
  ...forgotPasswordRoutes,
  ...userRoutes,
  ...roleRoutes,
  ...resourceRoutes,
  ...userResourceRoutes,
];

export default configRoutes;
