import { useAccess } from '@umijs/max';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewFDA from './ViewFDA';
import ViewThuocHetHan from './ViewThuocHetHan';
import ViewThuocTriLieu from './ViewThuocTriLieu';

function App() {
  const [selectedButton, setSelectedButton] = useState('1');
  const [datas, setDatas] = useState(null);
  const [dataFDA, setDataFDA] = useState(null);
  const [curentPage, setCurentPage] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [role, setRole] = useState(false);

  const access = useAccess();

  useEffect(() => {
    if (access.canAdmin || access.canDoctor) {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [access.canAdmin, access.canDoctor]);

  const handleMenuClick = ({ key }) => {
    setSelectedButton(key);
    setCurentPage(1);
  };

  useEffect(() => {
    async function fetchData1() {
      try {
        const response = await axios.get(
          `https://ut-project-be.vercel.app/api/approved-component?page=${curentPage}`,
        );
        console.log(response);
        setDatas(response.data.data);
        console.log(response.data.metadata);
        console.log(response.data.data);
        setMetadata(response.data.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchData2() {
      try {
        const response = await axios.get(
          `https://ut-project-be.vercel.app/api/not-approved-component?page=${curentPage}`,
        );
        console.log(response);
        setDatas(response.data.data);
        console.log(response.data.metadata);
        console.log(response.data.data);
        setMetadata(response.data.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchData3() {
      try {
        const response = await axios.get(
          `https://ut-project-be.vercel.app/api/fda-medicine?page=${curentPage}`,
        );
        console.log(response);
        setDataFDA(response.data.data);
        console.log(response.data.metadata);
        console.log(response.data.data);
        setMetadata(response.data.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedButton === '2') {
      fetchData2();
    } else if (selectedButton === '3') {
      fetchData3();
    } else if (selectedButton === '1') {
      fetchData1();
    }
  }, [selectedButton, curentPage]);

  return (
    <>
      <Layout>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedButton]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">Còn hạn</Menu.Item>
          <Menu.Item key="2">Hết hạn</Menu.Item>
          <Menu.Item key="3">FDA</Menu.Item>
        </Menu>

        <Content style={{ padding: '50px' }}>
          {datas && selectedButton === '1' && (
            <ViewThuocTriLieu
              datas={datas}
              setCurentPage={setCurentPage}
              metadata={metadata}
              role={role}
            />
          )}
          {datas && selectedButton === '2' && (
            <ViewThuocHetHan
              datas={datas}
              setCurentPage={setCurentPage}
              metadata={metadata}
              role={role}
            />
          )}
          {dataFDA && selectedButton === '3' && (
            <ViewFDA
              datas={dataFDA}
              setCurentPage={setCurentPage}
              metadata={metadata}
              role={role}
            />
          )}
        </Content>
      </Layout>
    </>
  );
}

export default App;
