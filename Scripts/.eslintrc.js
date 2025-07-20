module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ['../.eslintrc.js'],
  rules: {
    // Node.js scripts allow console usage
    'no-console': 'off',
    // Allow require() in Node.js scripts
    '@typescript-eslint/no-var-requires': 'off',
    // Allow CommonJS module.exports
    '@typescript-eslint/no-require-imports': 'off',
  },
};
