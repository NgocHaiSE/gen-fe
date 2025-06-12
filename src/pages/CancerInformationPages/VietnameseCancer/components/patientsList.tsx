import { server } from '@/pages/Api';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';
import AddInformation from './addInformation';
import FileUpload from './uploadExcelFile';

const columns: ProColumns[] = [
  {
    title: 'Căn cước công dân',
    dataIndex: 'gene_name',
  },
  {
    title: 'Giới tính',
    dataIndex: 'samples_tested',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Năm sinh',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Tuổi phát hiện bệnh',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Vị trí ung thư',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Tỉnh',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Huyện/Thành phố',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Năm tử vong',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: 'Thời gian sống',
    dataIndex: '',
    hideInSearch: true,
    align: 'center',
  },
];

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (params: any, sort: any, filter: any) => {
    const response = await fetch(server);
    const data = await response.json();
    return {
      data: data.filter((row: { gene_name: string }) =>
        row.gene_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    };
  };

  return (
    <ProTable
      columns={columns}
      request={fetchData}
      toolbar={{
        title: 'Thông tin bệnh nhân',
        search: {
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
        },
        actions: [<FileUpload />, <AddInformation />],
        settings: [],
      }}
      rowKey="key"
      search={false}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default PatientsList;
