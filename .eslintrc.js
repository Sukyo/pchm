module.exports = {
  "extends": [
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2020,
    "sourceType": "module",
    "extraFileExtensions": [
      ".vue",
      "@vue/standard"
    ]
  },
  "overrides": [
    {
      "files": [
        "**/test/unit/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "jest": true
      }
    }
  ],
  "rules": {
    "vue/max-attributes-per-line": [0, {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "max-len": [
      "error",
      {
        code: 120
      }
    ]
  },
}