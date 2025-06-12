import { Collapse, Tag, Descriptions, Button } from 'antd';
import { useEffect, useState } from 'react';
import { testCaseEp } from '../EndPoint';
import { Link } from '@umijs/max';
import './resultTestList.css';

const { Panel } = Collapse;

interface GeneDetail {
  RS_ID: string;
  Nucleotide: string;
  Protein: string;
  VariationType: string;
  Position: string;
  DrugResponse: string;
  VariantRate: number;
  ReadDepth: number;
}

interface GeneData {
  Gene: string;
  details: GeneDetail[];
}

const translateDrugResponse = (response: string) => {
  switch (response) {
    case 'Pathogenic':
      return 'Gây bệnh';
    case 'Likely_pathogenic':
      return 'Có khả năng gây bệnh';
    case 'Benign':
      return 'Lành tính';
    case 'Likely_benign':
      return 'Có khả năng lành tính';
    case 'VUS':
      return 'Đột biến chưa rõ ý nghĩa (VUS)';
    default:
      return response || 'Không xác định';
  }
};

const ResultTest = () => {

  const [data, setData] = useState<GeneData[]>([]);
  const [dataPatient, setDataPatient] = useState<any[]>([]);

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/tests/detail/', '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${testCaseEp}/detail/${id}`);
        const rawData: any[] = await response.json();

        const groupedData = rawData.reduce((acc: Record<string, GeneData>, item: any) => {
          const gene = item.Gene;
          if (!acc[gene]) {
            acc[gene] = {
              Gene: gene,
              details: [],
            };
          }
          acc[gene].details.push({
            RS_ID: item.RS_ID || '-',
            Nucleotide: item.Nucleotide,
            Protein: item.Protein,
            VariationType: item.VariationType,
            Position: item.Position,
            DrugResponse: item.DrugResponse,
            VariantRate: item.VariantRate,
            ReadDepth: item.ReadDepth,
          });
          return acc;
        }, {});

        const sortedData: GeneData[] = Object.values(groupedData);
        sortedData.sort((a, b) => a.Gene.localeCompare(b.Gene));
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`${testCaseEp}/find/${id}`);
        const patientData: any[] = await response.json();
        setDataPatient(patientData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTestData();
  }, []);

  return (
    <>
      {dataPatient.length > 0 && (
        <Descriptions title="Thông tin chi tiết giải trình tự" size="middle">
          <Descriptions.Item label="Mã xét nghiệm"><b>{dataPatient[0].patientID}</b></Descriptions.Item>
          <Descriptions.Item label="Tên bệnh nhân"><b>{dataPatient[0].patientName}</b></Descriptions.Item>
          <Descriptions.Item label="Mẫu mô"><b>{dataPatient[0].testName}</b></Descriptions.Item>
          <Descriptions.Item label="Mẫu bệnh phẩm"><b>{dataPatient[0].primaryTissue}</b></Descriptions.Item>
          <Descriptions.Item label="Thông tin thuốc điều trị">
            <Link to={`/perdict-drug/${dataPatient[0].patientID}?typeCancer=${dataPatient[0].primaryTissue}`}>
              <Button type="primary">Thuốc điều trị đích</Button>
            </Link>
          </Descriptions.Item>
        </Descriptions>
      )}

      <Collapse accordion>
        {data.map((geneData) => (
          <Panel
            key={geneData.Gene}
            header={
              <div className="gene-header">
                <Tag className="gene-tag">{geneData.Gene}</Tag>
                <span className="variant-count">({geneData.details.length} biến thể)</span>
              </div>
            }
          >
            {geneData.details.map((item, index) => (
              <div key={index} className="gene-description">
                <div className="gene-item">
                  <strong>RS_ID</strong>
                  <div>{item.RS_ID}</div>
                </div>
                <div className="gene-item">
                  <strong>Nucleotide</strong>
                  <div>{item.Nucleotide}</div>
                </div>
                <div className="gene-item">
                  <strong>Protein</strong>
                  <div>{item.Protein}</div>
                </div>
                <div className="gene-item">
                  <strong>Loại đột biến</strong>
                  <div>{item.VariationType}</div>
                </div>
                <div className="gene-item">
                  <strong>Vị trí</strong>
                  <div>{item.Position}</div>
                </div>
                <div className="gene-item">
                  <strong>Phân loại</strong>
                  <div>{translateDrugResponse(item.DrugResponse)}</div>
                </div>
                <div className="gene-item">
                  <strong>Variant Rate</strong>
                  <div>{item.VariantRate}%</div>
                </div>
                <div className="gene-item">
                  <strong>Read Depth</strong>
                  <div>{item.ReadDepth}</div>
                </div>
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default ResultTest;