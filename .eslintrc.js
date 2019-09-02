module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'react-native'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': [0],
    'react/display-name': [0],
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
