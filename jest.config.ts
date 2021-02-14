// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  preset: 'ts-jest',
  clearMocks: true,
  setupFiles: ['<rootDir>/tests/setupTest.ts'],
  displayName: 'root-test',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.(spec|test).ts', '**/src/**/*.(spec|test).ts'],
};
