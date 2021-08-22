import { Route } from '@src/@types/route';

const userRouteMapping: Route[] = [
  {
    path: '/users/profile',
    isAuthenticated: true,
    handler: (request, response) => {
      request.loggedUser.setDataValue('password', undefined);

      return response.json(request.loggedUser);
    },
  },
];

export default userRouteMapping;
