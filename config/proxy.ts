/**
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    '/api': {
      target: 'http://192.168.91.131:4091',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
    },
  },
};
