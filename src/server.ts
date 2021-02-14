import './config/module-alias';

import app from './app';
import Debug from './helpers/Debug';

const SERVER_HOST = String(process.env.SERVER_HOST) ?? '0.0.0.0';
const SERVER_PORT = Number(process.env.SERVER_PORT) ?? 3333;

app.listen(SERVER_PORT, SERVER_HOST, () => {
  Debug.run({
    namespace: 'server',
    message: `🚀 Server started on port http://%s:%d`,
    args: [SERVER_HOST, SERVER_PORT],
  });
});
