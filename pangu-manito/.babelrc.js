module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    ['@babel/preset-typescript', { isTSX: false, allExtensions: true }]
  ],
  plugins: [
    'macros',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-lodash',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-runtime'
  ]
}
