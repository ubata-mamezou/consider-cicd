import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import'; // import-pluginを追加

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist/**/*'], // distフォルダを無視
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'commonjs',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
      'prettier/prettier': ['error', { endOfLine: 'auto' }], //ESLintとPrettierのコンフリクト解消
      'quotes': ['error', 'single'], // シングルクォーテーションを強制
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.jsビルトインモジュール
            'external', // OSSライブラリ
            'internal', // アプリケーション内モジュール
            ['sibling', 'parent'], // 相対パス
            'index', // index.jsやindex.ts
          ],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true }, // アルファベット順を適用
          'newlines-between': 'always', // グループ間に改行を追加
        },
      ],
    },
  },
  {
    ignores: ['.eslintrc.js'],
  },
  {
    languageOptions: {
      globals: {
        node: true,
        jest: true,
      },
    },
  },
];
