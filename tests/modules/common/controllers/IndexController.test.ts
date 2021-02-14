import supertest from 'supertest';

import App from '@src/app';

describe('Common -> IndexController', () => {
  it('should return status 200 in the request', async () => {
    const response = await supertest(App.getServer()).get('/');

    expect(response.status).toBe(200);
  });
});
