import { Empty, Typography, Input, Row, Col, Button } from 'antd';
import DrugInformation from './prediction';
import CRUDService from '@/services/CRUDService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { server } from '../Api';

const { Title, Text } = Typography;

const DrugPrediction = () => {
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const ID = pathnameParts[pathnameParts.length - 1];
  const searchParams = new URLSearchParams(location.search);
  const typeCancer = searchParams.get('typeCancer'); 

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [geneSearch, setGeneSearch] = useState('');
  const [drugSearch, setDrugSearch] = useState('');

  const getPredictDrug = async (page = 1) => {
    try {
      setLoading(true);
      const url = `${server}/drugs-information/get-drug?page=${page}&limit=5&typeCancer=${typeCancer}&id=${ID}&gene=${geneSearch}&drug=${drugSearch}`;
      const data = await CRUDService.getAllService(url);
      setData(data.dataDrug);
      setTotalItems(data.totalItems); 
    } catch (error) {
      console.log(error);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPredictDrug(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // reset về page đầu tiên khi tìm
    getPredictDrug(1);
  };

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Input
            placeholder="Tìm theo tên gene (VD: EGFR)"
            value={geneSearch}
            onChange={(e) => setGeneSearch(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Tìm theo tên thuốc (VD: Gefitinib)"
            value={drugSearch}
            onChange={(e) => setDrugSearch(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
        </Col>
      </Row>

      {(!loading && data.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <Empty
            description={
              <>
                <Title level={4}>Chưa có thuốc điều trị phù hợp</Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Cơ sở dữ liệu hiện tại chưa ghi nhận thuốc điều trị cho bệnh nhân này.
                </Text>
              </>
            }
          />
        </div>
      ) : (
        <DrugInformation
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
        />
      )}
    </>
  );
};

export default DrugPrediction;
