import CRUDService from '@/services/CRUDService';
import { currentPage as crPage } from '@/shared/CurrentPage';
import { Button, Cascader, Col, Descriptions, Form, Input, List, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { drugsInformationEp } from '../EndPoint';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  {
    value: 'asia',
    label: 'Châu Á',
  },
  {
    value: 'world',
    label: 'Quốc tế',
  },
];

const DrugInformation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDrug, setDataDrug] = useState<any[]>([]);
  const [dataFilter, setDataFilter] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const locationPg = crPage(location.pathname);

  const isLocation = (locationPg: string) => {
    const cancerCondition = [
      { locationPage: 'lungCancerPage', typeCancer: 'lung' },
      { locationPage: 'liverCancerPage', typeCancer: 'hepatocellular_carcinoma' },
      { locationPage: 'breastCancerPage', typeCancer: 'breast' },
      { locationPage: 'thyroidCancerPage', typeCancer: 'thyroid' },
      { locationPage: 'colorectalCancerPage', typeCancer: 'large_intestine' },
    ];

    const matchedPg = cancerCondition.find(
      (locationPage) => locationPage.locationPage === locationPg,
    );

    return matchedPg?.typeCancer || '';
  };

  const getDrugInfo = async () => {
    try {
      const data = await CRUDService.getAllService(
        `${drugsInformationEp}/get?page=${currentPage}&limit=5&typeCancer=${isLocation(
          locationPg,
        )}`,
      );
      setDataDrug(data.dataDrug);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrugInfo();
  }, [currentPage]);

  const handleSearch = async (values: any) => {
    try {
      const data = await CRUDService.searchService(
        `${drugsInformationEp}/search-drug?limit=5&typeCancer=${isLocation(locationPg)}`,
        values,
      );
      setDataFilter(data.dataDrug);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderData = dataFilter.length > 0 ? dataFilter : dataDrug;

  const renderDrugItems = renderData.map((item: any) => {
    const pmid = item['pmid'];
    const geneName = item['Gene name'];
    const geneLocation = item['Genomic Position'];
    const nucleotideMutation = item['CDS Mutation'];
    const aminoAcidMutation = item['AA Mutation'];
    const rsValue = item['rs valuesource_db'] || 'Không có';
    const drugName = item['Therapies'];
    const drugClassification = item['therapy_rank'];
    const diseaseName = item['Disease'];
    const description = item['Description'];

    const pmidSplitArray = pmid.split(':');
    const href =
      pmid && pmidSplitArray[0] === 'PubMed'
        ? `https://pubmed.ncbi.nlm.nih.gov/${pmidSplitArray[1]}`
        : `https://clinicaltrials.gov/ct2/show/${pmidSplitArray[1]}`;

    const classificationName =
      drugClassification === 1
        ? 'Việt Nam'
        : drugClassification === 2
        ? 'Hết hạn'
        : drugClassification === 3
        ? 'FDA phê duyệt'
        : drugClassification === 4
        ? 'Tổ chức khác'
        : '';

    return (
      <List.Item key={pmid}>
        <List.Item.Meta
          title={<Tag color="blue">{geneName}</Tag>}
          // description={description}
        />
        <Descriptions>
          <Descriptions.Item label="Tên gene">{geneName}</Descriptions.Item>
          <Descriptions.Item label="Vị trí gene">{geneLocation}</Descriptions.Item>
          <Descriptions.Item label="Đột biến nucleotide">{nucleotideMutation}</Descriptions.Item>
          <Descriptions.Item label="Đột biến axit amin">{aminoAcidMutation}</Descriptions.Item>
          <Descriptions.Item label="Giá trị RS">{rsValue}</Descriptions.Item>
          <Descriptions.Item label="Thuốc đích">{drugName}</Descriptions.Item>
          <Descriptions.Item label="Phân loại thuốc">{classificationName}</Descriptions.Item>
          <Descriptions.Item label="Bệnh">{diseaseName}</Descriptions.Item>
          <Descriptions.Item label="Tài liệu tham khảo">
            <Tag color="#108ee9">
              <a target="_blank" rel="noopener noreferrer" href={href}>
                Xem
              </a>
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </List.Item>
    );
  });

  return (
    <>
      <div>
        <h1>Thuốc điều trị đích</h1>
      </div>
      <Form onFinish={handleSearch}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="region" label="Khu vực" initialValue={'asia'}>
              <Cascader options={options} expandTrigger="hover" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="geneName">
              <Input placeholder="Nhập tên gene" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: handleTableChange,
          total: totalPages,
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        dataSource={renderDrugItems}
        renderItem={(item) => item}
      />
    </>
  );
};

export default DrugInformation;
