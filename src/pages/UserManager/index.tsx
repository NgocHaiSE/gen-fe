import AddAccount from '@/components/UserManager/AddAccount';
import UpdateAccount from '@/components/UserManager/UpdateAccount';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { server } from '../Api';

const { confirm } = Modal;
export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${server}/user/get-all-user`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAccountSuccess = () => {
    fetchData();
  };

  const handleDelete = (id: string, name: string) => {
    confirm({
      title: `Bạn muốn xóa user :${name} này?`,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Xóa',
      okType: 'danger',
      onOk() {
        fetch(`${server}/user/delete-user/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Lỗi khi xóa');
            }
            message.success('Xóa thành công');
            fetchData();
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      key: 'UserID',
      title: 'Mã tài khoản',
      dataIndex: '_id',
    },
    {
      key: 'username',
      title: 'Tài khoản',
      dataIndex: 'email',
      align: 'left',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.patientName).toLowerCase().includes(String(value).toLowerCase());
      },
    },
    {
      key: 'access',
      title: 'Quyền truy cập',
      dataIndex: 'access',
      render: (text, data) => (
        <>
          {data.access == 'admin'
            ? 'Quản trị viên'
            : data.access == 'user'
            ? 'Người dùng thông thường'
            : data.access == 'doctor'
            ? 'Bác sĩ'
            : 'Chưa cấp quyền truy cập'}
        </>
      ),
    },
    {
      key: 'name',
      title: 'Tên người dùng',
      dataIndex: 'name',
      align: 'left',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.patientName).toLowerCase().includes(String(value).toLowerCase());
      },
    },
    {
      key: 'created_date',
      title: 'Ngày tạo tài khoản',
      dataIndex: 'createAt',
    },
    {
      key: 'modified_date',
      title: 'Ngày cập nhật tài khoản',
      dataIndex: 'updateAt',
    },
    {
      key: 'option',
      title: 'Tùy chọn',
      width: 200,
      valueType: 'option',
      align: 'left',
      render: (text, data) => (
        <>
          {data.access === 'admin' ? (
            <></>
          ) : (
            <Space size="large">
              <UpdateAccount data={data} onSuccess={handleAddAccountSuccess} />
              <Button type="primary" danger onClick={() => handleDelete(data._id, data.name)}>
                Xóa
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Danh sách người dùng',
        search: {
          placeholder: 'Nhập thông tin tên người dùng',
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
          style: { width: '350px' },
        },
        actions: [<AddAccount onSuccess={handleAddAccountSuccess} />],
        settings: [],
      }}
      showSorterTooltip={false}
      rowKey="key"
      search={false}
      pagination={{ pageSize: 10 }}
    />
  );
};
