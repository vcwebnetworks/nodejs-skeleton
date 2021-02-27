import supertest from 'supertest';

import app from '@src/app';

describe('Common -> IndexController', () => {
  afterAll(() => app.close());

  it('should return status 200 in the request', async () => {
    const response = await supertest(app.getServer()).get('/');

    expect(response.status).toBe(200);
  });
});
