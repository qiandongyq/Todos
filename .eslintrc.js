module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-case-declarations': 0,
    'no-return-assign': 0,
    'import/prefer-default-export': 0,
  },
  globals: {
    document: true,
    window: true,
  },
};
