import './config/module-alias';

import debugApp from '@src/config/debug';

import server from './app';

server.listen(process.env.PORT || 3333, () => {
  debugApp('server')('🚀 Server started on port http://localhost:3333');
});
