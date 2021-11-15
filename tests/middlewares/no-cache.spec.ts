import express from 'express';
import supertest from 'supertest';
import { noCacheMiddleware } from '@/middlewares/no-cache';

describe('Middleware -> no-cache', () => {
  it('should return the configured headers', async () => {
    const app = express();

    app.get('/no-cache', noCacheMiddleware, (_, response) =>
      response.sendStatus(200),
    );

    const response = await supertest(app).get('/no-cache');

    expect(response.status).toBe(200);
    expect(response.header.expires).toBe('0');
    expect(response.header.pragma).toBe('no-cache');
    expect(response.header['cache-control']).toBe(
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    expect(response.header['surrogate-control']).toBe('no-store');
  });
});
