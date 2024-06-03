import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';
import {history} from '@umijs/max';

const Footer: React.FC = () => {
  const author = 'Mredust';
  const currentYear = new Date().getFullYear();
  // 不加载Footer白名单
  const whiteList: string[] = ['/problemset/*'];
  const regexPatterns = whiteList.map(item => new RegExp('^' + item.replace('*', '.*') + '$'));
  const flag = regexPatterns.some(regex => regex.test(history.location.pathname));
  if (flag) {
    return null;
  }
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${author}`}
      links={[
        {
          key: 'github',
          title:
            (
              <span style={{margin: '0 8px'}}>
               <GithubOutlined/> {author}
            </span>
            ),
          href: 'https://github.com/Mredust',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
