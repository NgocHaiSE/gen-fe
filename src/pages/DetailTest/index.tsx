import PatientList from '@/components/DetailTest/patientList';
import TestDetail from '@/components/DetailTest/testDetail';
import { PageContainer } from '@ant-design/pro-components';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import NoFoundPage from '../404';

const items: MenuProps['items'] = [
  {
    label: 'Thông tin giải trình tự gen',
    key: 'sequenceInfor',
  },
  {
    label: 'Danh sách bệnh nhân',
    key: 'patientList',
  },
];

const DetailTest: React.FC = () => {
  const [current, setCurrent] = useState('sequenceInfor');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  if (current === 'sequenceInfor') {
    return (
      <PageContainer title={false}>
        <Menu
          style={{}}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <TestDetail />
      </PageContainer>
    );
  } else if (current === 'patientList') {
    return (
      <PageContainer title={false}>
        <Menu
          style={{}}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <PatientList />
      </PageContainer>
    );
  } else {
    return <NoFoundPage />;
  }
};

export default DetailTest;
