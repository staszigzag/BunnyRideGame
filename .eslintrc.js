const IS_PROD = process.env.NODE_ENV === 'production'
// const IS_DEV = !IS_PROD

module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'eslint-config-airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier'
    ],
    parser: '@typescript-eslint/parser',
    // parser: '@babel/eslint-parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    ignorePatterns: ['../dist/*.*'],
    rules: {
        'prettier/prettier': 'error',

        semi: 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'class-methods-use-this': IS_PROD ? 'warn' : 'off',
        'no-shadow': IS_PROD ? 'warn' : 'off',
        'max-classes-per-file': 'off',
        'import/order': 'off',
        '@typescript-eslint/no-non-null-assertion': IS_PROD ? 'warn' : 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'import/extensions': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-confusing-arrow': 'off',
        'import/no-unresolved': IS_PROD ? 'warn' : 'off',
        'no-console': IS_PROD ? 'warn' : 'off',
        'no-debugger': IS_PROD ? 'error' : 'off',
        'no-unused-vars': IS_PROD ? 'warn' : 'off',
        'no-useless-return': 'off',

        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ]
    }
}
