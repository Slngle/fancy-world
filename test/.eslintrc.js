module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: ['typescript', 'prettier'],
  rules: {
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    'typescript/class-name-casing': 'error'
  }
}
