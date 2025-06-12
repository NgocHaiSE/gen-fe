import { server } from '@/pages/Api';
import { Col, Descriptions, Image, Row } from 'antd';
import { useEffect, useState } from 'react';

const TestDetail = () => {
  const [dataTest, setDataTest] = useState<
    Array<{
      runID: any;
      finishDate: any;
      totalReads: any;
      usableReads: any;
      status: any;
      totalBases: any;
      modeLength: any;
      meanLength: any;
      ISPLoadingPic: any;
      qualityPic: any;
      lengthPic: any;
    }>
  >([]);

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/tests/', '');

  const fetchDataTest = async (id: String) => {
    const response = await fetch(`${server}/test-case/find/${id}`);
    const data = await response.json();
    const testCase = [
      {
        runID: data.run.runId,
        finishDate: data.run.finishDate,
        totalReads: data.run.totalReads,
        usableReads: data.run.usableReads,
        status: data.run.status,
        totalBases: data.run.totalBases,
        modeLength: data.run.modeLength,
        meanLength: data.run.meanLength,
        ISPLoadingPic: data.run.ISPLoadingPic,
        qualityPic: data.run.qualityPic,
        lengthPic: data.run.lengthPic,
      },
    ];
    setDataTest(testCase);
  };

  useEffect(() => {
    fetchDataTest(id).catch((error) => console.error(error));
  }, []);

  console.log(dataTest);
  console.log(id);
  return (
    <Descriptions title="Thông tin trong báo cáo" bordered style={{ padding: '20px' }}>
      <Descriptions.Item label="Hình ảnh trong báo cáo" span={3}>
        <Row gutter={16}>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Image src={`data:image/jpeg;base64,${dataTest[0]?.ISPLoadingPic}`} />
            <h2>ISPLoadingPic</h2>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Image src={`data:image/jpeg;base64,${dataTest[0]?.lengthPic}`} />
            <h2>lengthPic</h2>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Image src={`data:image/jpeg;base64,${dataTest[0]?.qualityPic}`} />
            <h2>qualityPic</h2>
          </Col>
        </Row>
      </Descriptions.Item>
      <Descriptions.Item label="RunID" span={2}>
        {dataTest[0]?.runID}
      </Descriptions.Item>
      <Descriptions.Item label="Trạng thái">{dataTest[0]?.status}</Descriptions.Item>
      <Descriptions.Item label="Ngày hoàn thành">{dataTest[0]?.finishDate}</Descriptions.Item>
      <Descriptions.Item label="Dung lượng đoạn đọc">{dataTest[0]?.totalBases}</Descriptions.Item>
      <Descriptions.Item label="totalReads">{dataTest[0]?.totalReads}</Descriptions.Item>
      <Descriptions.Item label="Mode chiều dài đoạn đọc">
        {dataTest[0]?.modeLength}
      </Descriptions.Item>
      <Descriptions.Item label="Số đoạn đọc có thể sử dụng">
        {dataTest[0]?.usableReads}
      </Descriptions.Item>
      <Descriptions.Item label="Chiều dài trung bình đoạn đọc">
        {dataTest[0]?.meanLength}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TestDetail;
