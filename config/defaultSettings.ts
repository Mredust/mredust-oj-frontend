import {ProLayoutProps} from '@ant-design/pro-components';

/**
 * 全局样式配置
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Online Judge',
  pwa: true,
  logo: 'https://vip.helloimg.com/i/2024/06/23/6677a609a74a7.png',
  iconfontUrl: '',
  "token": {},
  splitMenus: false
};

export default Settings;
