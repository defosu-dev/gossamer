import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import jsdoc from 'eslint-plugin-jsdoc';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  // === Ignored files and folders ===
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/', 'next-env.d.ts', 'out/**'],
  },

  // === Base JavaScript rules ===
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
    },
  },

  // === TypeScript rules ===
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
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/typedef': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off', // React props rarely need this
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // === React and Hooks rules ===
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
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
    },
  },

  // === Next.js Core Web Vitals ===
  ...nextVitals,
  {
    files: ['**/*.{ts,tsx,jsx,js}'],
    rules: {
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'warn',
    },
  },

  // === Prettier (disables stylistic ESLint rules) ===
  prettier,

  // === Unicorn rules (only key ones kept) ===
  {
    plugins: { unicorn },
    rules: {
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/no-null': 'off',
    },
  },

  // === JSDoc rules (warn level) ===
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { jsdoc },
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
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
      'jsdoc/tag-lines': ['warn', 'any', { startLines: 1 }],
      'jsdoc/require-description-complete-sentence': 'off',
      'jsdoc/require-hyphen-before-param-description': ['warn', 'never'],
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/check-tag-names': ['warn', { definedTags: ['remarks'] }],
    },
  },

  // === Our style rules: function components, interfaces, imports ===
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          afterBlockComment: false,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
          ignorePattern: '^\\s*(/|\\*|export|\\)|\\}|\\]|\\*\\s*@)',
        },
      ],
    },
  },

  // === Test files ===
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
