// Jest設定
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // プロジェクトルートから検索（将来的にsrc、testsフォルダが作成される予定）
  roots: ['<rootDir>'],
  testMatch: [
    '**/src/**/*.+(test|spec).+(ts|tsx|js)',
    '**/tests/**/*.+(ts|tsx|js)',
    '**/Scripts/**/__tests__/**/*.+(ts|tsx|js)',
    '**/Scripts/**/*.+(test|spec).+(ts|tsx|js)',
  ],
  // 除外するパターン
  testPathIgnorePatterns: ['/node_modules/', '/Docs/', '/coverage/', '/dist/', '/build/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    'Scripts/**/*.{ts,tsx,js}',
    '!**/*.d.ts',
    '!**/*.test.{ts,tsx,js}',
    '!**/*.spec.{ts,tsx,js}',
    '!Scripts/Templates/**/*',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // テストファイルがない場合は警告せずに成功とする
  passWithNoTests: true,
  // 詳細な出力を抑制
  silent: false,
  verbose: true,
};
