module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'google',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['default', 'variable'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
      {
        selector: 'classProperty',
        modifiers: ['private'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'classProperty',
        modifiers: ['protected'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    "new-cap": 0,
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/no-var-requires': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'prefer-template': 'off',
    eqeqeq: ['error', 'smart'],
    'max-len': [
      'error',
      {
        code: 140,
        tabWidth: 2,
        ignoreComments: true, //"comments": 80
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-var': 'warn',
    'no-nested-ternary': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-self-compare': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['off', { devDependencies: false }],
    'linebreak-style': 'off',
    'newline-per-chained-call': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
