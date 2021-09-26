module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        indent: [2, 4, {
            ignoredNodes: [
                'JSXAttribute',
            ],
        }],
        'react/jsx-indent': [2, 4],
        'max-len': [2, 140],
        'object-curly-newline': 'off',
        'max-classes-per-file': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-plusplus': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error'],
        'no-restricted-syntax': 'off',
        'linebreak-style': 'off',
    },
};
