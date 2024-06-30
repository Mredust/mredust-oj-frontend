// 用于配置 eslint 规则，具体配置项请参考：https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
};
