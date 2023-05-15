/** disables rules from eslint:recommended which are already handled by TypeScript */
function getEslintCompatibleRules() {
  const tsEsPlugin = require('@typescript-eslint/eslint-plugin')
  const eslintCompatibleRules = tsEsPlugin.configs['eslint-recommended'].overrides[0].rules
  const result = {}

  if (!eslintCompatibleRules) return result

  Object.entries(eslintCompatibleRules).forEach(([key, val]) => {
    if (val !== 'error') {
      result[key] = val
    }
  })

  return result
}

function namespace(prefix) {
  return function addNamespaceToObj(obj) {
    return Object.keys(obj).reduce(function (res, key) {
      res[prefix + key] = obj[key]
      return res
    }, {})
  }
}

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  rules: Object.assign(
    getEslintCompatibleRules(),
    namespace('@typescript-eslint/')({
      'adjacent-overload-signatures': 'error',
      'array-type': [ 'error', { default: 'array-simple' } ],
      'ban-types': [
        'error',
        {
          types: {
            'Function': {
              message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
              fixWith: '(...args: any[]) => any',
            },
            // object typing
            'Object': {
              message: [
                'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
                '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
                '- If you want a type meaning "any value", you probably want `unknown` instead.',
              ].join('\n'),
              fixWith: 'Record<string, any>',
            },
            '{}': {
              message: [
                '`{}` actually means "any non-nullish value".',
                '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
                '- If you want a type meaning "any value", you probably want `unknown` instead.',
              ].join('\n'),
              fixWith: 'Record<string, any>',
            },
            'object': {
              message: [
                'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
                'Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.',
              ].join('\n'),
              fixWith: 'Record<string, any>',
            },
          }
        }
      ],
      'prefer-function-type': 'error',
      'consistent-type-definitions': 'off',
      // tslint -> 'member-ordering': { options: { order: 'statics-first' } },
      'member-ordering': 'error',
      'consistent-type-assertions': 'error',
      'no-explicit-any': 'off',
      'no-empty-interface': 'error',
      // tslint -> 'no-internal-module': true,
      'prefer-namespace-keyword': 'off',
      'no-misused-new': 'error',
      'no-namespace': 'error',
      'no-parameter-properties': 'off',
      'triple-slash-reference': 'error',
      'no-var-requires': 'off',
      // prefer-arrow/prefer-arrow-functions
      'prefer-for-of': 'error',
      'typedef': 'off',
      'type-annotation-spacing': 'error',
      'unified-signatures': 'error',
    }),
    {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' }],

      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': [ 'error' ],

      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': [ 'error', 'always', {
        'exceptAfterOverload': true,
        'exceptAfterSingleLine': true,
      }],

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      }],

      'no-undef': 'off',

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    }
  ),
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      }
    },
  ],
}
