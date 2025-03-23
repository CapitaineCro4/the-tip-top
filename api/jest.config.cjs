const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement depuis le fichier .env à la racine
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    setupFiles: ['<rootDir>/jest.setup.cjs']
};

module.exports = config; 