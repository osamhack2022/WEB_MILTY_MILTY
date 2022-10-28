module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    camelcase: 0,
  },

  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
