// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name enable hash mode
   * @description Let the product after build include hash suffix. Typically used for incremental releases and to avoid browser load caches.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description Setting ie11 may not be perfectly compatible, you need to check all dependencies you use
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  // ie: 11,
  // },
  /**
   * @name route configuration, files not imported in the route will not be compiled
   * @description only supports the configuration of path, component, routes, redirect, wrappers, title
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name configuration for the topic
   * @description Although it is called a theme, it is actually just a variable setting of less
   * @doc antd theme setting https://ant.design/docs/react/customize-theme-cn
   * @doc umi's theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // If you don't want configProvide to dynamically set the theme, you need to set this to default
    // only set to variable, can use configProvide to dynamically set the main color
    'root-entry-name': 'variable',
  },
  /**
   * Internationalization configuration for @name moment
   * @description If there is no requirement for internationalization, it can reduce the js package size after opening
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name proxy configuration
   * @description can make your local server proxy to your server, so you can access the data of the server
   * @see Note that the following proxy can only be used during local development, and cannot be used after build.
   * @doc proxy introduction https://umijs.org/docs/guides/proxy
   * @doc proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name fast hot update configuration
   * @description A good hot update component that can keep state when updating
   */
  fastRefresh: true,
  //================ The following are the plugin configurations of max ================
  /**
   * @name dataflow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data stream that can be used to share data between plugins
   * @description can be used to store some global data, such as user information, or some global state. The global initial state is created at the very beginning of the entire Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6% E6%80%81
   */
  initialState: {},
  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Project Ung Thư',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs plugin
   * @description replace moment in the project with dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default en-US
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd plugin
   * @description built-in babel import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name network request configuration
   * @description It provides a unified network request and error handling scheme based on the useRequest of axios and ahooks.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name permission plugin
   * @description Permission plugin based on initialState, initialState must be opened first
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name Extra script in <head>
   * @description Configure additional script in <head>
   */
  headScripts: [
    // Solve the problem of white screen when loading for the first time
    { src: '/scripts/loading.js', async: true },
  ],
  //================= pro plugin configuration ==================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI plugin configuration
   * @description Generate serve and mock based on the openapi specification, which can reduce a lot of boilerplate code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */

  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // or use the online version
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
