// ESLint v9 Flat Config
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
    // JavaScript/TypeScriptファイル用の基本設定
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                // project設定は TypeScriptファイル専用設定に移動
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        rules: {
            // ESLint推奨ルール
            ...js.configs.recommended.rules,

            // TypeScript推奨ルール
            ...tseslint.configs.recommended.rules,

            // TypeScript固有のルール
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^(error|readline)$' },
            ],
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
    },

    // TypeScriptファイル専用ルール（型情報を使うルール）
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        rules: {},
    },

    // JavaScript専用ルール（型情報不要）
    {
        files: ['**/*.js'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                // project設定を削除（JavaScriptファイルには不要）
            },
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/prefer-optional-chain': 'off',
            '@typescript-eslint/prefer-as-const': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },

    // テストファイル専用ルール
    {
        files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
        languageOptions: {
            globals: {
                jest: 'readonly',
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // 設定ファイル専用ルール
    {
        files: ['*.config.js', '*.config.ts', 'eslint.config.js'],
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },

    // Scriptsファイル専用ルール（CLIツール用）
    {
        files: ['Scripts/**/*.js'],
        rules: {
            'no-console': 'off', // CLIツールではconsole出力が必要
        },
    },

    // 無視パターン
    {
        ignores: [
            'dist/',
            'build/',
            'node_modules/',
            '**/*.min.js',
            'coverage/',
            '.next/',
            'out/',
            'Docs/assets/**',
            'Scripts/Templates/**',
        ],
    },

    // Prettierとの統合（競合回避）
    prettier,
];
