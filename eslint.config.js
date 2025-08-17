const js = require('@eslint/js');
const globals = require('globals');
const unusedImports = require('eslint-plugin-unused-imports');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
    {
        files: ['**/*.{js,jsx,cjs}'],
        ...js.configs.recommended,
        plugins: {
            'unused-imports': unusedImports,
        },
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],

            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'max-params': ['error', 3],
            'object-shorthand': ['error', 'always'],
        },
    },
];
