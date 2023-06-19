import type { Config } from '@jest/types';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.(spec|e2e-spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/migrations/**',
    '!<rootDir>/src/**/dtos/**',
    '!<rootDir>/src/app.constants.ts',
    '!<rootDir>/src/common/*',
    '!<rootDir>/src/common/**',
    '!<rootDir>/src/logger/*',
    '!<rootDir>/src/**/*.enum.ts',
  ],
  coverageDirectory: 'test/coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testResultsProcessor: 'jest-sonar-reporter',
} as Config.InitialOptions;
