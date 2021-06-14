module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
    '!**/test/**',
    '!<rootDir>/src/presentation/errors/**',
    '!<rootDir>/src/presentation/helpers/**'
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-dynamodb'
};
