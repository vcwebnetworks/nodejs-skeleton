import supertest from 'supertest';

import app from '@src/app';

describe('Common -> IndexController', () => {
  it('should return status 200 in the request', async () => {
    const response = await supertest(app).get('/');

    expect(response.status).toBe(200);
  });
});
