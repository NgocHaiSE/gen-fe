import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { dataTable } from '../data/dataForTable';

const TableCancer = () => {
  const columns: ProColumns[] = [
    {
      title: 'ICD',
      dataIndex: 'ICD',
      hideInSearch: true,
    },
    {
      title: 'Cancer',
      dataIndex: 'Cancer',
      hideInSearch: true,
    },
    {
      title: 'Number',
      dataIndex: 'Number',
      sorter: (a, b) => a.Number - b.Number,
      hideInSearch: true,
    },
    {
      title: 'Uncertainty interval',
      dataIndex: 'Uncertainty interval',
      hideInSearch: true,
    },
    {
      title: 'Crude Rate',
      dataIndex: 'Crude_Rate',
      sorter: (a, b) => a.Crude_Rate - b.Crude_Rate,
      hideInSearch: true,
    },
    {
      title: 'ASR (World)',
      dataIndex: 'ASR',
      sorter: (a, b) => a.ASR - b.ASR,
      hideInSearch: true,
    },
    {
      title: 'Cum. risk',
      dataIndex: 'Cum_risk',
      sorter: (a, b) => a.Cum_risk - b.Cum_risk,
      hideInSearch: true,
      align: 'left',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={dataTable}
      toolbar={{
        title: 'Bảng thống kê chi tiết',
        settings: [],
      }}
      rowKey="key"
      search={false}
      dateFormatter="string"
      pagination={{ pageSize: 8 }}
    />
  );
};

export default TableCancer;
