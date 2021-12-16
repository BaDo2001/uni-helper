/* eslint-disable */

const path = require('path');
const airbnbRules = require('eslint-config-airbnb-base/rules/style').rules;
const memberOrdering = require('@typescript-eslint/eslint-plugin/dist/rules/member-ordering');

/* eslint-enable */

module.exports = {
    extends: ['airbnb-base', 'plugin:@typescript-eslint/all'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        project: path.resolve(__dirname, './tsconfig.json'),
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': 'off',
        'no-undef': 'off',
        'max-len': [
            'error',
            {
                code: 140,
            },
        ],
        'object-curly-newline': [
            'error',
            {
                consistent: true,
            },
        ],
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: true,
            },
        ],
        'consistent-return': 'off', // ts solves it better
        'default-case': 'off', // ts solves it better
        'no-restricted-syntax': airbnbRules['no-restricted-syntax'].filter(
            syntax => typeof syntax !== 'object' || syntax.selector !== 'ForOfStatement',
        ), // ts transpiles it
        'array-callback-return': 'off', // ts does it better
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['%', '**'],
                    ['%', '*'],
                    ['%', '/'],
                    ['&', '|', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!=='],
                    ['&&', '||'],
                ],
                allowSamePrecedence: false,
            },
        ],
        'no-plusplus': 'off',
        'no-continue': 'off',
        'no-console': 'off',
        curly: ['error', 'all'],
        'no-confusing-arrow': 'off',
        'default-param-last': ['error'],

        'import/no-extraneous-dependencies': 'off', // we use sub-dependencies from web-frame, etc.
        'import/extensions': 'off',
        'import/no-unresolved': 'off',

        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-magic-numbers': 'off', // false positive in constant arrays, etc.
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: memberOrdering.defaultOrder.filter(memberType => !memberType.includes('decorated')),
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-invalid-this': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/491
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-extra-parens': [
            'error',
            'all',
            {
                ignoreJSX: 'all',
            },
        ],
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['JSXAttribute'],
            },
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
                enums: false,
                typedefs: false,
            },
        ],
        '@typescript-eslint/no-loss-of-precision': 'off',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
        '@typescript-eslint/comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
    },
};
