// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';

import app from '@src/app';

describe('Common -> IndexController', () => {
  it('deve retornar 200 na requisição', async () => {
    const response = await supertest(app).get('/');

    expect(response.status).toBe(200);
  });
});
