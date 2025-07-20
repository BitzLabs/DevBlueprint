module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // ESLintにTypeScriptを解釈させるパーサー
  plugins: [
    '@typescript-eslint', // 利用するプラグイン
    'import', // import系ルール用プラグイン
  ],
  extends: [
    'eslint:recommended', // ESLintが推奨する基本的なルールセット
    'plugin:@typescript-eslint/recommended', // プラグインが提供する推奨ルールセット ★ここが重要
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // TypeScript固有のルール
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^(error|readline)$' }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Import/Export関連
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',

    // 一般的なJavaScript/TypeScriptルール
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
  },
  overrides: [
    {
      // TypeScriptファイル専用: 型情報を使うルール
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {},
    },
    {
      // JavaScript専用ルール
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      // テストファイル専用ルール
      files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // 設定ファイル・純JSファイル専用ルール
      files: ['*.config.js', '*.config.ts', '.eslintrc.cjs'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // ブラウザ用JavaScriptファイル
      files: ['Docs/assets/js/**/*.js'],
      env: {
        browser: true,
      },
      globals: {
        MathJax: 'readonly',
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: ['dist/', 'build/', 'node_modules/', '*.min.js', 'coverage/', '.next/', 'out/'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
