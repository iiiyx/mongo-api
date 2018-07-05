module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      // customizing prettier rules (unfortunately not many of them are customizable)
      "error",
      {
        singleQuote: true,
        trailingComma: "all"
      }
    ],
    "no-console": 0,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  globals: { "angular": false, "module": false, "inject": false, "document": false },
  env: {
    es6: true,
    amd: true,
    node: true,
  }
};
