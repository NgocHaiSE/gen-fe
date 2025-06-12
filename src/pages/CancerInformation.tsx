import { PageContainer } from '@ant-design/pro-components';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import NoFoundPage from './404';
import MutanGene from './CancerInformationPages/MutanGene';
import NormalGene from './CancerInformationPages/NormalGene';
import TopGene from './CancerInformationPages/TopGene';

const items: MenuProps['items'] = [
  {
    label: 'Top 20 gene',
    key: 'topGene',
  },
  {
    label: 'Gen phát hiện đột biến',
    key: 'mutatedGenes',
  },
  {
    label: 'Gen không phát hiện đột biến',
    key: 'normalGenes',
  },
];

const CancerInformation: React.FC = () => {
  const [current, setCurrent] = useState('topGene');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  if (current === 'topGene') {
    return (
      <PageContainer>
        <Menu
          style={{}}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <TopGene />
      </PageContainer>
    );
  } else if (current === 'mutatedGenes') {
    return (
      <PageContainer>
        <Menu
          style={{}}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <MutanGene />
      </PageContainer>
    );
  } else if (current === 'normalGenes') {
    return (
      <PageContainer>
        <Menu
          style={{}}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <NormalGene />
      </PageContainer>
    );
  } else {
    return <NoFoundPage />;
  }
};

export default CancerInformation;
