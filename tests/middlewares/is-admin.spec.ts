import express from 'express';
import supertest from 'supertest';

import { HttpStatusCode } from '../../src/enums';
import { isAdmin } from '../../src/middlewares';

const routePath = '/is-admin';

const makeAppAndRoutes = (): express.Express => {
  const app = express();
  app.get(routePath, isAdmin, (_, r) => r.sendStatus(HttpStatusCode.OK));
  return app;
};

describe('Middleware: is-admin', () => {
  it('should return 401 if the route does not have the administrative token', async () => {
    const app = makeAppAndRoutes();
    const response = await supertest(app).get(routePath);

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
  });

  it('should return 200 when the administrative token is in the request', async () => {
    const app = makeAppAndRoutes();
    const response = await supertest(app)
      .get(routePath)
      .set('Authorization', `Bearer ${process.env.ADMIN_KEY}`);

    expect(response.status).toBe(HttpStatusCode.OK);
  });
});
