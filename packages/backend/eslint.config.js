import { defineConfig, globalIgnores } from "eslint/config";

import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nestjs from "eslint-plugin-nestjs";
import globals from "globals";
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,

      globals: {
        ...globals.node,
        ...globals.jest,
      },

      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      nestjs: nestjs,
    },

    extends: compat.extends('plugin:@typescript-eslint/recommended', 'plugin:nestjs/recommended'),

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'nestjs/use-validation-pipe': 'off',
    },
  },
  globalIgnores(['**/dist/', '**/node_modules/']),
]);
