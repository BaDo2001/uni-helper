// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'graphql', 'import'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb-typescript/base'],
    parserOptions: {
        ecmaVersion: 6,
        project: path.resolve(__dirname, './tsconfig.json'),
        sourceType: 'module',
    },
    env: {
        node: true,
        browser: false,
        es2021: true,
    },
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
