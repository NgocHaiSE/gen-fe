import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { useEffect, useState } from 'react';
import { geneAndMutationEp } from '../EndPoint';

const GeneAndMutation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataMutation, setDataMutation] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`${geneAndMutationEp}?page=${pagination.current}&limit=${pagination.pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        const mutationData = data.mutationModels.map((obj: any) => ({
          id: obj._id,
          gene_name: obj.variant.gene.hugoSymbol,
          alteration_name: obj.variant.name,
          oncogenic: obj.oncogenic,
          mutation_effect: obj.mutationEffect,
          articles: obj.variant.gene.geneAliases,
        }));
        setDataMutation(mutationData);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  console.log(dataMutation);

  const columns: ProColumns[] = [
    {
      key: 'geneName',
      title: 'Gene',
      dataIndex: 'gene_name',
      align: 'left',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.gene_name).toLowerCase().includes(String(value).toLowerCase());
      },
      width: '20%',
    },
    {
      key: 'alterationName',
      title: 'Đột biến',
      dataIndex: 'alteration_name',
      align: 'left',
      width: '20%',
    },
    {
      key: 'oncogenic',
      title: 'Oncogenic',
      dataIndex: 'oncogenic',
      width: '20%',
    },
    {
      key: 'mutationEffect',
      title: 'Mutation Effect',
      dataIndex: 'mutation_effect',
      width: '20%',
    },
    {
      title: 'DẪN CHỨNG',
      dataIndex: 'articles',
      hideInSearch: true,
      align: 'center',
      render: (articles: any, dataMutation) => (
        <Link
          key="showDetail"
          style={{ textDecoration: 'underline' }}
          to={`/gene-and-mutation/${dataMutation.id}`}
        >
          {articles.length}
        </Link>
      ),
      width: '20%',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={dataMutation}
      toolbar={{
        title: 'Danh sách gen đột biến',
        search: {
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
          style: { width: '350px' },
          placeholder: 'Nhập tên gene',
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

export default GeneAndMutation;
