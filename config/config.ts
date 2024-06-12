import {defineConfig} from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

/**
 * @doc https://umijs.org/
 */
const {REACT_APP_ENV = 'dev'} = process.env;
export default defineConfig({
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'Ant Design 初始模板',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  antd: {},
  request: {},

  access: {},
  headScripts: [
    {
      src: '/scripts/loading.js',
      async: true,
    },
  ],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'http://127.0.0.1:4091/api/api-docs',
      projectName: 'init-backend',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
  chainWebpack(memo) {
    // 代码高亮显示
    memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // 支持高亮显示的代码语言
        languages: ['java', 'javascript', 'cpp', 'python']
      }
    ])
  }

});
