import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      //版权关闭
      copyright={false}
      style={{
        background: 'none',
      }}
      links={[
        // {
        //   key: 'github开源地址',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/atopos31/Smart-BI',
        //   blankTarget: true,
        // },
      ]}
    />
  );
};

export default Footer;
