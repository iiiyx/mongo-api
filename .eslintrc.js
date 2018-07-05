module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
  rules: {
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true, 
        trailingComma: 'all',
      },
    ],
  }
};