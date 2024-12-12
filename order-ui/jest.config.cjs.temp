/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.export = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true
    }
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 追加
  transform: {
    // "^.+.tsx?$": ["ts-jest",{}],
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/?(*.)+(spec|test).(ts|tsx|js)'],
  transformIgnorePatterns: [
    // '/node_modules/(エラーになっているライブラリ).+\\.ts',
  ],
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../test-result/coverage",
  coverageReporters: ["text", "lcov"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        "publicPath": "./test-result/test-report",
        "filename": "index.html",
        "expand": true
      }
    ]
  ]
};
