import { Router } from 'express';

const routes = Router();

routes.get('*', async (request, response) => {
  return response.json({
    date: new Date().toLocaleString('pt-BR'),
  });
});

export default routes;
