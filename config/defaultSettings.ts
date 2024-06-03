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
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Online Judge',
  pwa: true,
  logo: 'https://raw.githubusercontent.com/Mredust/images/main/file/logo.svg',
  iconfontUrl: '',
  "token": {},
  splitMenus: false
};

export default Settings;
