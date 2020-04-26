/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection } from 'typeorm';

declare global {
  namespace Express {
    export interface Application {
      databaseConnection: Connection;
    }
  }
}
