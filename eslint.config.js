const js = require('@eslint/js');
const globals = require('globals');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
    {
        files: ['**/*.{js,cjs}'],
        ...js.configs.recommended,
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.browser,
            },
        },
    },
];
