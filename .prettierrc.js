module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrder: [
    '^(react|react-native)$', // react first
    '<THIRD_PARTY_MODULES>',  // other node_modules
    '^~/(.*)$',               // your root alias
    '^[./]',                  // relative imports
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
