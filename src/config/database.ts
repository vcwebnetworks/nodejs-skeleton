import { createConnection, Connection } from 'typeorm';

export default (name = 'default'): Promise<Connection> => {
  return createConnection(name);
};
