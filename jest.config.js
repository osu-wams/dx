/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  // jsdom plus the Node globals (fetch, TextEncoder, ...) that msw 2 relies on.
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  // msw 2 pulls in a few ESM-only packages that Jest's CommonJS runtime cannot load untransformed.
  transformIgnorePatterns: [
    'node_modules/(?!(rettime|until-async|@open-draft|@mswjs|msw)/).+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  resetMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.tsx',
    '!src/setupTests.ts',
    '!src/util/test-utils.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 10,
    },
  },
};
