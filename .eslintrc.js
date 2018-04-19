module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
    // node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],

  
  plugins: [
    
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },

  rules: {
    'no-unneeded-ternary': 0,
    'no-floating-decimal': 0,
    'no-unused-vars': 0,
    'prefer-promise-reject-errors': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
