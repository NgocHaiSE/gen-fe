import { server } from '@/pages/Api';
import { currentPage } from '@/shared/CurrentPage';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

const NormalGenes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);

  let API = '';
  const locationPage = currentPage(location.pathname);

  switch (locationPage) {
    case 'lungCancerPage':
      API = `${server}/normal-lung-gene`;
      break;
    case 'liverCancerPage':
      API = `${server}/normal-liver-gene`;
      break;
    case 'breastCancerPage':
      API = `${server}/normal-breast-gene`;
      break;
    case 'thyroidCancerPage':
      API = `${server}/normal-thyroid-gene`;
      break;
    case 'colorectalCancerPage':
      API = `${server}/normal-colorectal-gene`;
      break;
    default:
      API = '';
      break;
  }

  useEffect(() => {
    fetch(`${API}?page=${pagination.current}&limit=${pagination.pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.totalPages);
        switch (locationPage) {
          case 'lungCancerPage':
            setData(data.normalLungGeneModels);
            break;
          case 'liverCancerPage':
            setData(data.normalLiverGeneModels);
            break;
          case 'breastCancerPage':
            setData(data.normalBreastGeneModels);
            break;
          case 'thyroidCancerPage':
            setData(data.normalThyroidGeneModels);
            break;
          case 'colorectalCancerPage':
            setData(data.normalColorectalGeneModels);
            break;
          default:
            API = '';
            break;
        }

        // if (location.pathname === locationPage) {
        //   setData(data.normalLungGeneModels);
        // } else if (location.pathname === liverCancerPage) {
        //   setData(data.normalLiverGeneModels);
        // } else if (location.pathname === breastCancerPage) {
        //   setData(data.normalBreastGeneModels);
        // } else if (location.pathname === thyroidCancerPage) {
        //   setData(data.normalThyroidGeneModels);
        // } else if (location.pathname === colorectalCancerPage) {
        //   setData(data.normalColorectalGeneModels);
        // }
      });
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  console.log(data);
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
      title: 'TỔNG SỐ MẪU',
      dataIndex: 'samples_tested',
      sorter: (a, b) => a.samples_tested - b.samples_tested,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'TRƯỜNG HỢP MANG ĐỘT BIẾN',
      dataIndex: 'mutated_samples',
      hideInSearch: true,
      align: 'center',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Gen không đột biến',
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

export default NormalGenes;
