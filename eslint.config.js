const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const importPlugin = require('eslint-plugin-import');

module.exports = defineConfig([
  expoConfig,

  {
    plugins: {
      import: importPlugin,
    },

    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',    // node builtins
            'external',   // node_modules
            'internal',   // absolute imports (src/*)
            ['parent', 'sibling', 'index'], // ../, ./
          ],

          pathGroups: [
            {
              pattern: 'src/**',
              group: 'internal',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    ignores: ['dist/*'],
  },
]);
