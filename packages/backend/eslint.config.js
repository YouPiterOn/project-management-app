const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const nestjs = require("eslint-plugin-nestjs");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.node,
            ...globals.jest,
        },

        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "nestjs": nestjs
    },

    extends: compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:nestjs/recommended",
    ),

    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],
    },
}, globalIgnores(["**/dist/", "**/node_modules/"])]);
