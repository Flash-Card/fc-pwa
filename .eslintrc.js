'use strict';

const globals = require('globals');

const jest = { };
for (const i in globals.jest) {
  if (i !== 'test' && i !== 'xtest') jest[i] = globals.jest[i]
}

module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  plugins: [
    'jest',
    'security',
    'react',
    'flowtype',
    // ['module-resolver', {
    //   root: ['./src']
    // }]
  ],
  rules: {
    'jsx-quotes': [
      'error',
      'prefer-double'
    ],
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
    }],
    'jsx-a11y/label-has-for': [1, {
      components: ['label'],
      required: {
        every: ['id'],
      },
      allowChildren: false,
    }],
    'no-plusplus': 0,
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true
      }
    ],
    'key-spacing': [
      'error',
      {
        'beforeColon': false,
        'afterColon': true
      }
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'object-curly-newline': 0,
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'function-paren-newline': [
      0,
      'multiline',
    ],
    'import/prefer-default-export': 0,
    'keyword-spacing': [
      'error',
      {
        'before': true
      }
    ],
    'no-empty-pattern': 'error',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'global-require': 0,
    'no-underscore-dangle': 0,
    'no-console': [
      'warn',
      {
        'allow': [
          'warn',
          'error'
        ]
      }
    ],
    'padded-blocks': 0,
    'react/no-string-refs': 2,
    'react/jsx-key': 2,
    'react/jsx-indent': [
      2,
      2
    ],
    'react/jsx-indent-props': [
      2,
      2
    ],
    'react/jsx-boolean-value': [
      'error',
      'never'
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        'maximum': 1,
        'when': 'multiline'
      }
    ],
    'react/require-default-props': 0,
    'react/prefer-stateless-function': 0,
    'react/default-props-match-prop-types': [
      'off',
      {
        'allowRequiredDefaults': false
      }
    ],
    'react/prop-types': [
      2,
      {
        'ignore': [],
        'customValidators': [],
        'skipUndeclared': false
      }
    ],
    'react/no-unused-prop-types': 1,
    'react/jsx-curly-spacing': [
      'error',
      'never',
      {
        'allowMultiline': true
      }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ],
    'semi': [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': true
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          './src'
        ],
        extensions: [
          '.js',
        ],
      }
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
  overrides: [
    {
      files: ['__tests__/*.js'],
      rules: {
        'node/no-unpublished-require': 'off'
      },
      globals: jest
    },
    {
      files: ['*.spec.js'],
      rules: {
        'jest/valid-expect-in-promise': 'error',
        'jest/prefer-to-be-undefined': 'error',
        'jest/prefer-to-have-length': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-disabled-tests': 'error',
        'jest/prefer-to-be-null': 'error',
        'jest/no-focused-tests': 'error',
        'jest/valid-expect': 'error'
      },
      globals: jest
    }
  ]
};
