import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'MTA',
          title: 'Viện CNTT&TT - Học viện kỹ thuật quân sự',
          href: 'https://inict.mta.edu.vn/',
          blankTarget: true,
        },
        {
          key: 'Hmu',
          title: 'và Trường ĐHY Hà Nội',
          href: 'https://hmu.edu.vn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
