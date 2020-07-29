module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    wx: true,
    getApp: true,
    Page: true,
    App: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'max-len': 'off',
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
  },
};
