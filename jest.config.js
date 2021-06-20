module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/lambdas/*/*.ts',
    '!**/protocols/**',
    '!**/test/**',
    '!<rootDir>/src/lambdas/**/presentation/**',
    '!<rootDir>/src/lambdas/**/main/**'
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-dynamodb'
};
