import { config } from 'dotenv';
import { resolve } from 'path';
import process from 'node:process';

// Charger les variables d'environnement de test
config({ path: resolve(process.cwd(), '.env.test') });

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testMatch: ['**/*.e2e-spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  globals: {
    'process.env': process.env,
  },
};
