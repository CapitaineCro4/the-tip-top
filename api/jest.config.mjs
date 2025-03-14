/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    }
};

export default config; 