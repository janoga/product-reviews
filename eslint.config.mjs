import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Type-aware rules (no-floating-promises, no-misused-promises, etc.)
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Accessibility — plugin already registered by eslint-config-next, apply full recommended rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
    },
  },

  // Import sorting + shared rules
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // side-effect imports
            ['^react', '^next', '^@?\\w'], // external packages
            ['^@/'], // internal alias
            ['^\\.'], // relative imports
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  // Config files — disable type-checked rules (not covered by tsconfig)
  {
    files: ['**/*.config.{js,ts,mjs,cjs}', 'postcss.config.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  prettierRecommended,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'generated/**',
  ]),
]);

export default eslintConfig;
