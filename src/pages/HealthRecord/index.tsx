import HealthRecordService from '@/services/healthRecord';
import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useAccess } from '@umijs/max';
import { Button, Form, Input, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

interface DataType {
  id: string;
  name: string;
  dob: string;
  typeHealthRecord: string;
  healthRecordId: string;
}
const handleCreateHealthRecord = (typeRecord: any, id = 0) => {
  switch (typeRecord) {
    case 'colorectal-record':
      history.push(`/health-record/colorectal-record/${id}`);
      break;
    case 'lung-record':
      history.push(`/health-record/lung-record/${id}`);
      break;
    case 'liver-record':
      history.push(`/health-record/liver-record/${id}`);
      break;
    case 'thyroid-record':
      history.push(`/health-record/thyroid-record/${id}`);
      break;
    case 'breast-record':
      history.push(`/health-record/breast-record/${id}`);
      break;
    default:
      break;
  }
  return;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default () => {
  const typeHealthRecord = history.location.pathname
    .split('/health-record')[0]
    .substring(1)
    .replace('cancer', 'record');
  const [post, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [reload, setReload] = useState('');
  const access = useAccess();
  const handleDeleteHealthRecord = async (typeHealthRecord: string, id: string) => {
    try {
      await HealthRecordService.deleteHealthRecord(typeHealthRecord, id);
      setReload(id);
    } catch (err) {
      console.log(err);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã bệnh án (Giải phẫu bệnh)',
      dataIndex: 'healthRecordId',
      key: 'healthRecordId',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'name',
    },
    {
      title: 'Năm sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          {access.canAdmin || access.canDoctor ? 
          (<Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleCreateHealthRecord(record.typeHealthRecord, record.id)}
            />
            <Popconfirm
              title="Xóa bệnh án"
              description="Bạn có chắc muốn xóa bệnh án này?"
              onConfirm={() => handleDeleteHealthRecord(record.typeHealthRecord, record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>)
        :(<Button type="primary" danger>Admin and doctor zone</Button>)}
        </>
      ),
    },
  ];
  const handleGetAll = async (page: any, limit: any) => {
    let records =
      (await HealthRecordService.getAllByType(typeHealthRecord, page, limit))?.data || [];
    console.log(records);

    setData(records);
  };
  useEffect(() => {
    handleGetAll(pagination.current, pagination.pageSize);
  }, [reload, pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  const handleSearch = async (values: any) => {
    console.log('[handle search]', values);
    const data = (await HealthRecordService.search(values, typeHealthRecord))?.data;
    setData(data);
  };

  return (
    <PageContainer>
      <Form {...layout} layout="inline" onFinish={handleSearch}>
        <Form.Item label="Mã bệnh án" name="healthRecordId">
          <Input placeholder="Hãy nhập mã bệnh án"></Input>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Tìm kiếm</Button>
        </Form.Item>
      </Form>
      {access.canAdmin || access.canDoctor ? 
      (<Button
        icon={<FileAddOutlined />}
        style={{ margin: '20px 0' }}
        onClick={() => handleCreateHealthRecord(typeHealthRecord)}
      >
        Thêm bệnh án
      </Button>):
      (<></>)}
      <Table columns={columns} dataSource={post} />
    </PageContainer>
  );
};
