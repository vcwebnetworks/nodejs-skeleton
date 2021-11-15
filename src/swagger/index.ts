import { Router } from 'express';
import swagger from 'swagger-ui-express';

import { noCacheMiddleware } from '@/middlewares';

import components from './components';
import info from './info';
import paths from './paths';
import schemas from './schemas';
import servers from './servers';
import tags from './tags';

const routes = Router();

routes.use(
  noCacheMiddleware,
  swagger.serve,
  swagger.setup({
    openapi: '3.0.3',
    info,
    security: [{ bearerAuth: [] }],
    tags,
    paths,
    components,
    schemas,
    servers,
    externalDocs: {},
  }),
);

export default routes;
