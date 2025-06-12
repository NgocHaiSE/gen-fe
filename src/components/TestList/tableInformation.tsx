import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { server } from '../../Api';
import { testCaseEp } from '../../EndPoint';
import AddTestCase from '../component/addTestInformation';

const { confirm } = Modal;
export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);

  const urlData = `${testCaseEp}?page=${pagination.current}&limit=${pagination.pageSize}`;
  useEffect(() => {
    fetch(urlData)
      .then((response) => response.json())
      .then((data) => {
        const testCase = data.testCaseModels.map((obj: any) => ({
          id: obj._id,
          patientID: obj.patientID,
          patientName: obj.patientName,
          testName: obj.testName,
        }));
        console.log(testCase);
        setData(testCase);
        setTotalPages(data.totalPages);
      });
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleDelete = (id: String, runID: String) => {
    confirm({
      title: `Bạn muốn xóa xét nghiệm có ID:${runID} này?`,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Xóa',
      okType: 'danger',
      onOk() {
        fetch(`${server}/test-case/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Lỗi khi xóa');
            }
            message.success('Xóa thành công');
            setData((prevData) => prevData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      key: 'patientID',
      title: 'Mã xét nghiệm',
      dataIndex: 'patientID',
      sorter: (a, b) => a.patientID - b.patientID,
    },
    {
      key: 'patientName',
      title: 'Tên bệnh nhân',
      dataIndex: 'patientName',
      align: 'left',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.patientName).toLowerCase().includes(String(value).toLowerCase());
      },
    },
    {
      key: 'testName',
      title: 'Mẫu bệnh phẩm',
      dataIndex: 'testName',
      // render: (testName) => (
      //   <>
      //     {testName?.split(',').map((item: any, index: any) => (
      //       <li>{item.trim()}</li>
      //     ))}
      //   </>
      // ),
    },
    {
      key: 'option',
      title: 'Tùy chọn',
      width: 200,
      valueType: 'option',
      align: 'left',
      render: (text, data) => <></>,
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Danh sách xét nghiệm',
        search: {
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
          style: { width: '350px' },
        },
        actions: [<AddTestCase />],
        settings: [],
      }}
      showSorterTooltip={false}
      rowKey="key"
      search={false}
      pagination={{ total: totalPages, pageSize: 10 }}
      onChange={handleTableChange}
    />
  );
};
