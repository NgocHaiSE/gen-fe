import AvatarDropdown from '@/components/RightContent/AvatarDropdown';
import NoFoundPage from '@/pages/404';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Layout,
  Menu,
  MenuProps,
  Radio,
  RadioChangeEvent,
  theme,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import DualChart from './charts/dualChart';
import { PieChart } from './charts/pieChart';
import ScatterChart from './charts/scatterChart';
import { StatisticalChart } from './charts/statisticalChart';
import {
  dataCasePrevalentBothSexes,
  dataCasePrevalentFemale,
  dataCasePrevalentMale,
  dataDeathCaseBothSexes,
  dataDeathCaseFemales,
  dataDeathCaseMales,
  dataNewCaseBothSexes,
  dataNewCaseFemales,
  dataNewCaseMales,
} from './data/dataNewCase';
import './style.css';
import TableCancer from './tables/tableCancer';
import { tableCancerDetail } from './tables/tableCancerDetail';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const items: MenuProps['items'] = [
  {
    label: 'Comparison',
    key: 'comparison',
    icon: '',
    children: [
      {
        label: 'Comparison',
        type: 'group',
        children: [
          {
            label: 'Multi Bars',
            key: 'multi-bars',
          },
          {
            label: 'Table',
            key: 'table',
          },
          {
            label: 'Dual Bars',
            key: 'dual-bars',
          },
          {
            label: 'Pie Charts',
            key: 'pie-charts',
          },
        ],
      },
    ],
  },
  {
    label: 'Proportions',
    key: 'proportions',
    icon: '',
    children: [
      {
        label: 'Proportions',
        type: 'group',
        children: [
          {
            label: 'Scatter Plot',
            key: 'scatter-plot',
          },
          {
            label: 'Circle Packing',
            key: 'circle-packing',
          },
        ],
      },
    ],
  },
  {
    label: 'Geography',
    key: 'geography',
    icon: '',
    children: [
      {
        label: 'Geography',
        type: 'group',
        children: [
          {
            label: 'Map By Indicators',
            key: 'map-by-indicators',
          },
          {
            label: 'Map By Most Common Site',
            key: 'map-by-most-common-site',
          },
          {
            label: 'Map By Cancer Site Ranking',
            key: 'map-by-cancer-site-ranking',
          },
          {
            label: 'Globe',
            key: 'globe',
          },
        ],
      },
    ],
  },
  {
    label: 'Hierarchy',
    key: 'hierarchy',
    icon: '',
    children: [
      {
        label: 'Hierarchy',
        type: 'group',
        children: [
          {
            label: 'Tree Map',
            key: 'tree-map',
          },
          {
            label: 'Bubble Chart',
            key: 'bubble-chart',
          },
          {
            label: 'Sunbrust',
            key: 'sunbrust',
          },
        ],
      },
    ],
  },
];

const itemsMenuInside: MenuProps['items'] = [
  {
    label: 'Biểu đồ',
    key: 'graphic',
  },
  {
    label: 'Bảng',
    key: 'table',
  },
];

const VietNameseCancer: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState('multi-bars');
  const [valueIndicator, setValueIndicator] = useState('Inc');
  const [valueSex, setValueSex] = useState('Both');
  const [valueMenu, setValueMenu] = useState('graphic');

  const onChangeIndicator = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValueIndicator(e.target.value);
  };

  const onChangeSex = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValueSex(e.target.value);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const onClickMenuInside: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setValueMenu(e.key);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let data: { Cancer: string; Cases: number }[] = [];
  let title = '';
  let total = 0;
  valueIndicator === 'Inc' && valueSex === 'Both'
    ? ((data = dataNewCaseBothSexes),
      (title = 'Tỷ lệ mắc bệnh tại Việt Nam vào năm 2020, cả hai giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Inc' && valueSex === 'Males'
    ? ((data = dataNewCaseMales),
      (title = 'Tỷ lệ mắc bệnh tại Việt Nam vào năm 2020, ở nam giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Inc' && valueSex === 'Females'
    ? ((data = dataNewCaseFemales),
      (title = 'Tỷ lệ mắc bệnh tại Việt Nam vào năm 2020, ở nữ giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Mort' && valueSex === 'Both'
    ? ((data = dataDeathCaseBothSexes),
      (title = 'Tỷ lệ tử vong tại Việt Nam vào năm 2020, cả hai giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Mort' && valueSex === 'Males'
    ? ((data = dataDeathCaseMales),
      (title = 'Tỷ lệ tử vong tại Việt Nam vào năm 2020, ở nam giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Mort' && valueSex === 'Females'
    ? ((data = dataDeathCaseFemales),
      (title = 'Tỷ lệ tử vong tại Việt Nam vào năm 2020, ở nữ giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Prev' && valueSex === 'Both'
    ? ((data = dataCasePrevalentBothSexes),
      (title =
        'Số lượng trường hợp ước tính tại Việt Nam vào năm 2020, cả hai giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Prev' && valueSex === 'Males'
    ? ((data = dataCasePrevalentMale),
      (title =
        'Số lượng trường hợp ước tính tại Việt Nam vào năm 2020, ở nam giới, mọi lứa tuổi (EXEX. NMSC)'))
    : valueIndicator === 'Prev' && valueSex === 'Females'
    ? ((data = dataCasePrevalentFemale),
      (title =
        'Số lượng trường hợp ước tínhtại Việt Nam vào năm 2020, ở nữ giới, mọi lứa tuổi (EXEX. NMSC)'))
    : ((data = []), (title = ''));

  let disable = false;
  current === 'dual-bars' ? (disable = true) : (disable = false);
  return (
    <Layout style={{ minHeight: '100vh', margin: 0, height: '100%', overflow: 'hidden' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="logo-title">
          <img src="/Logo_HUST_HMU.png" alt="" style={{ width: '100%' }} />
        </div>
        <div style={{ height: '100%', paddingTop: 10 }}>
          <h3 className="title">THỐNG KÊ CÁC LOẠI BỆNH UNG THƯ PHỔ BIẾN TẠI VIỆT NAM</h3>
        </div>
        <div style={{ paddingTop: 15 }}>
          <AvatarDropdown />
        </div>
      </Header>
      <Layout>
        <Sider
          style={{ background: '#383838', color: '#fff' }}
          collapsible={false}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            style={{ background: '#383838', color: '#fff', paddingTop: '20px' }}
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={onClick}
            selectedKeys={[current]}
          ></Menu>
        </Sider>
        <Sider
          className="sider-medium"
          style={{ background: '#fff', color: '#fff' }}
          collapsible={false}
          collapsed={false}
        >
          <div>
            <Form>
              <Form.Item name="compare" valuePropName="checked">
                <div className="sider-component">
                  <Title level={4}>So sánh</Title>
                  <Radio.Group defaultValue={'cancer_sites'}>
                    <Radio value="population" disabled>
                      Dân cư
                    </Radio>
                    <Radio value="cancer_sites">Cancer sites</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item name="indicators" valuePropName="checked">
                <div className="sider-component">
                  <Title level={4}>Chỉ báo</Title>
                  <Radio.Group
                    onChange={onChangeIndicator}
                    value={valueIndicator}
                    defaultValue={'Inc'}
                  >
                    <Radio value="Inc" disabled={disable}>
                      Inc.
                    </Radio>
                    <Radio value="Mort" disabled={disable}>
                      Mort.
                    </Radio>
                    <Radio value="Prev" disabled={disable}>
                      Prev.
                    </Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item name="sex" valuePropName="checked">
                <div className="sider-component">
                  <Title level={4}>Giới tính</Title>
                  <Radio.Group onChange={onChangeSex} value={valueSex} defaultValue={'Both'}>
                    <Radio value="Both">Cả hai</Radio>
                    <Radio value="Males" disabled={disable}>
                      Nam
                    </Radio>
                    <Radio value="Females" disabled={disable}>
                      Nữ
                    </Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
              <Divider />
              <div className="sider-component">
                <Form.Item name="indicators" valuePropName="checked">
                  <Title level={4}>Dân cư</Title>
                  <Button type="primary">Khu vực dân cư: Việt Nam</Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <Button type="primary">
              <Link to={'/welcome'}>Quay lại</Link>
            </Button>
          </div>
        </Sider>
        <Content style={{ margin: '0 16px', height: '90%', overflow: 'auto' }}>
          <Breadcrumb
            style={{ margin: '16px 0', backgroundColor: '#fff', padding: 5, borderRadius: 10 }}
          >
            <Breadcrumb.Item>Chart</Breadcrumb.Item>
            <Breadcrumb.Item>{current}</Breadcrumb.Item>
          </Breadcrumb>
          <Menu
            style={{ borderRadius: 10 }}
            onClick={onClickMenuInside}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsMenuInside}
          />
          <h2 className="chart-title">{title}</h2>
          {valueMenu === 'graphic' ? (
            <PageContainer>
              {current === 'multi-bars' ? (
                StatisticalChart(data)
              ) : current === 'pie-charts' ? (
                PieChart(data)
              ) : current === 'scatter-plot' ? (
                <ScatterChart />
              ) : current === 'dual-bars' ? (
                <DualChart />
              ) : current === 'table' ? (
                <TableCancer />
              ) : (
                <NoFoundPage />
              )}
            </PageContainer>
          ) : (
            <PageContainer>{tableCancerDetail(data)}</PageContainer>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
            <div className="left-footer">
              <p>Data source: Globocan 2020</p>
              <p>
                Graph production: Global Cancer Observatory (
                <a href="http://gco.iarc.fr/today" target="_blank">
                  http://gco.iarc.fr/today
                </a>
                )
              </p>
            </div>
            <h2 className="center-footer">
              <a href="https://hust.edu.vn/" target="_blank" rel="noopener noreferrer">
                Đại học Bách Khoa Hà Nội
              </a>{' '}
              và{' '}
              <a href="https://hmu.edu.vn/" target="_blank" rel="noopener noreferrer">
                trường đại học Y Hà Nội
              </a>
            </h2>
            <div className="right-footer">
              <img src="/Logo_HUST_HMU.png" alt="img_HUST_HMU" />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VietNameseCancer;
