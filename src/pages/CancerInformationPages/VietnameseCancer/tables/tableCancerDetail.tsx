import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

export const tableCancerDetail = (data: any) => {
  const columns: ProColumns[] = [
    {
      title: 'Ung thư',
      dataIndex: 'Cancer',
      hideInSearch: true,
    },
    {
      title: 'Số trường hợp',
      dataIndex: 'Cases',
      sorter: (a, b) => a.Cases - b.Cases,
      hideInSearch: true,
      align: 'left',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Bảng thống kê chi tiết',
        settings: [],
      }}
      rowKey="key"
      search={false}
      dateFormatter="string"
    />
  );
};
