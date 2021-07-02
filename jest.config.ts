// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  preset: 'ts-jest',
  clearMocks: true,
  displayName: 'root-test',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  coverageDirectory: '<rootDir>/tests/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.(spec|test).ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTest.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/{helpers,middlewares,modules}/**/*.ts',
    '<rootDir>/src/database/models/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
