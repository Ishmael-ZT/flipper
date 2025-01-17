/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  transform: {
    '^.*__tests__(/|\\\\).*\\.tsx?$': 'ts-jest',
    '\\.(js|tsx?)$': '<rootDir>/scripts/jest-transform.js',
  },
  setupFiles: ['<rootDir>/scripts/jest-setup.tsx'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jest-setup-after.tsx'],
  moduleNameMapper: {
    '^flipper$': '<rootDir>/deprecated-exports/src',
    '^flipper-plugin$': '<rootDir>/flipper-plugin/src',
    '^flipper-(server-core|ui-core|frontend-core|common)$':
      '<rootDir>/flipper-$1/src',
    '^flipper-(pkg|pkg-lib|test-utils)$': '<rootDir>/$1/src',
    '^.+\\.(css|scss)$': '<rootDir>/scripts/jest-css-stub.js',
  },
  clearMocks: true,
  coverageReporters: [
    'json-summary',
    'lcov',
    'html',
    ...(process.env.COVERAGE_TEXT === 'detailed' ? ['text'] : []),
  ],
  testMatch: ['**/**.(node|spec).(js|jsx|ts|tsx)'],
  testEnvironment: 'jsdom',
  resolver: '<rootDir>/jest.resolver.js',
};
