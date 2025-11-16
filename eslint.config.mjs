// eslint.config.mjs
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import jsdoc from 'eslint-plugin-jsdoc'; // Додано
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  // === Ignores ===
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/', 'next-env.d.ts', 'out/**'],
  },

  // === Base JS ===
  js.configs.recommended,

  // === TypeScript ===
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // === React + Hooks ===
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
    },
  },

  // === Next.js Core Web Vitals ===
  ...nextVitals,

  // === Prettier (відключає стилістичні правила) ===
  prettier,

  // === Unicorn (opinionated) ===
  {
    plugins: { unicorn },
    rules: {
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/no-null': 'off',
    },
  },

  // === JSDoc (обов’язковий, з @remarks) ===
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { jsdoc }, // Підключено
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            FunctionExpression: true,
          },
          contexts: [
            'ArrowFunctionExpression',
            'FunctionDeclaration',
            'FunctionExpression',
            'TSInterfaceDeclaration',
          ],
        },
      ],
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
      'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/check-tag-names': ['error', { definedTags: ['remarks'] }],
    },
  },

  // === Наш стиль: function, interface, Next.js rules ===
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Function components only
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      // Interface over type
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Next.js specifics
      '@next/next/no-img-element': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // General
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'lines-around-comment': ['error', { beforeLineComment: true, beforeBlockComment: true }],
    },
  },

  // === Tests ===
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        it: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
      },
    },
  },
];
