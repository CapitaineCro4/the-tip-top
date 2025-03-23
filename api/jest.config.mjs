import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts', 'mjs'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
        '^.+\\.mjs$': 'babel-jest'
    },
    setupFiles: ['<rootDir>/jest.setup.mjs'],
    extensionsToTreatAsEsm: ['.ts']
};

export default config; 