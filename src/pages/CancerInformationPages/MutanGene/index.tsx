import {
  mutationBreastGeneEp,
  mutationColorectalGeneEp,
  mutationLiverGeneEp,
  mutationLungGeneEp,
  mutationThyroidGeneEp,
} from '@/pages/EndPoint';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

const lungCancerPage = '/lung-cancer/gene-mutation';
const liverCancerPage = '/liver-cancer/gene-mutation';
const breastCancerPage = '/breast-cancer/gene-mutation';
const thyroidCancerPage = '/thyroid-cancer/gene-mutation';
const colorectalCancerPage = '/colorectal-cancer/gene-mutation';

const MutanGene = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);

  let URLReload = '';
  let URLFindByName = '';
  switch (location.pathname) {
    case lungCancerPage:
      URLReload = `${mutationLungGeneEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
      URLFindByName = `${mutationLungGeneEp}/findByName`;
      break;
    case liverCancerPage:
      URLReload = `${mutationLiverGeneEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
      URLFindByName = `${mutationLungGeneEp}/findByName`;
      break;
    case breastCancerPage:
      URLReload = `${mutationBreastGeneEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
      URLFindByName = `${mutationBreastGeneEp}/findByName`;
      break;
    case thyroidCancerPage:
      URLReload = `${mutationThyroidGeneEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
      URLFindByName = `${mutationThyroidGeneEp}/findByName`;
      break;
    case colorectalCancerPage:
      URLReload = `${mutationColorectalGeneEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
      URLFindByName = `${mutationColorectalGeneEp}/findByName`;
      break;
    default:
      URLReload = '';
      URLFindByName = '';
      break;
  }

  useEffect(() => {
    fetch(URLReload)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.totalPages);
        switch (location.pathname) {
          case lungCancerPage:
            setData(data.mutationLungGeneModels);
            break;
          case liverCancerPage:
            setData(data.mutationLiverGeneModels);
            break;
          case breastCancerPage:
            setData(data.mutationBreastGeneModels);
            break;
          case thyroidCancerPage:
            setData(data.mutationThyroidGeneModels);
            break;
          case colorectalCancerPage:
            setData(data.mutationColorectalGeneModels);
            break;
          default:
            setData([]);
            break;
        }
      });
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetch(URLFindByName)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.totalPages);
        switch (location.pathname) {
          case lungCancerPage:
            setData(data.mutationLungGeneModels);
            break;
          case liverCancerPage:
            setData(data.mutationLiverGeneModels);
            break;
          case breastCancerPage:
            setData(data.mutationBreastGeneModels);
            break;
          case thyroidCancerPage:
            setData(data.mutationThyroidGeneModels);
            break;
          case colorectalCancerPage:
            setData(data.mutationColorectalGeneModels);
            break;
          default:
            setData([]);
            break;
        }
      });
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const columns: ProColumns[] = [
    {
      title: 'TÊN GEN',
      dataIndex: 'gene_name',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.gene_name).toLowerCase().includes(String(value).toLowerCase());
      },
      render: (_, record) => {
        const gene_name = record.gene_name;
        return (
          <a
            href={`https://cancer.sanger.ac.uk/cosmic/gene/analysis?all_data=n&in=t&ln=${gene_name}&sn=liver&src=tissue&wgs=off`}
            target="_blank"
          >
            {gene_name}
          </a>
        );
      },
    },
    {
      title: 'TRƯỜNG HỢP MANG ĐỘT BIẾN',
      dataIndex: 'mutated_samples',
      sorter: (a, b) => a.mutated_samples - b.mutated_samples,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'TỔNG SỐ MẪU',
      dataIndex: 'samples_tested',
      sorter: (a, b) => a.samples_tested - b.samples_tested,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'TỶ LỆ TRƯỜNG HỢP MANG ĐỘT BIẾN',
      render: (_, row) => ((row.mutated_samples / row.samples_tested) * 100).toFixed(2) + '%',
      hideInSearch: true,
      align: 'center',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Gen đột biến',
        search: {
          placeholder: 'Nhập tên gene',
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
        },

        settings: [],
      }}
      rowKey="key"
      search={false}
      dateFormatter="string"
      pagination={{ total: totalPages, pageSize: 10 }}
      onChange={handleTableChange}
    />
  );
};

export default MutanGene;
