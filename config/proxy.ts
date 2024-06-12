/**
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // dev: {
  //   '/api': {
  //     target: 'http://localhost:4091',
  //     changeOrigin: true,
  //   },
  // },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
};
