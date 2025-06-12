/**
 * @name proxy configuration
 * @see In the production environment, the proxy cannot take effect, so there is no production environment configuration here
 * --------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // If you need to customize the local development server, please uncomment and adjust as needed
  // dev: {
  // // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  // '/api/': {
  // // The address to proxy
  // target: 'https://preview.pro.ant.design',
  // // Configure this to proxy from http to https
  // // Functions that depend on origin may need this, such as cookies
  // changeOrigin: true,
  // },
  // },

  /**
   * @name detailed proxy configuration
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  server: {
    '/server/api/': {
      target: 'https://aicancer.io.vn/api',
      // target: 'http://localhost:3000',
      // target: 'http://45.117.177.243:3000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
