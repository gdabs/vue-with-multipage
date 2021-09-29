module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prefer-rest-params': false,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/ban-types": [
      "warn",
      {
        "types": {
          // add a custom message to help explain why not to use it
          "Foo": "Don't use Foo because it is unsafe",
  
          // add a custom message, AND tell the plugin how to fix it
          "String": {
            "message": "Use string instead",
            "fixWith": "string"
          },
  
          "{}": {
            "message": "Use object instead",
            "fixWith": "object"
          }
        }
      }
    ]
  },
};
