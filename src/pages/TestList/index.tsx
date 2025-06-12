import token from '@/utils/token';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link, useAccess } from '@umijs/max';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { server } from '../Api';
import { testCaseEp } from '../EndPoint';
import AddTestCase from '@/components/TestList/addTestInformation';
import UpdateTestCase from '@/components/TestList/updateTestInformation';
import UploadTestCase from '@/components/TestList/uploadTestCase';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

// const accessToken = token.get().accessToken;

const { confirm } = Modal;
export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);
  const [IDTestData, setIDTestData] = useState<any[]>([]);
  const [resultStatus, setResultStatus] = useState<any[]>([]);
  const [errorList, setErrorList] = useState<any[]>([]);

  const access = useAccess();

  // const urlData = `${testCaseEp}?page=${pagination.current}&limit=${pagination.pageSize}`;

  const getData = async (page = 1, pageSize = 10) => {
    try {
      const response = await fetch(`${testCaseEp}?page=${page}&limit=${pageSize}`);
      const data = await response.json();
      setData(data.testCaseModels);
      setTotalPages(data.totalPages * pageSize);
    } catch (error) {
      console.log(error);
      message.error('Lỗi khi lấy dữ liệu');
    }
  };

  const fetchErrorList = async () => {
    try {
      const response = await fetch('https://aicancer.io.vn/api/error');
      const errorData = await response.json();
      setErrorList(errorData);
    } catch (err) {
      console.error('❌ Lỗi khi gọi API lỗi:', err);
    }
  };

  useEffect(() => {
    getData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${testCaseEp}/detail`);
      const data = await response.json();
      setIDTestData(data);
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };
  const addResultStatus = async () => {
    try {
      const response = await fetch(`${testCaseEp}/file-name`);
      const data = await response.json();
      setResultStatus(data);
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };

  useEffect(() => {
    addResultStatus();
    fetchData();
    fetchErrorList();
  }, []);

  const handleDelete = (id: String, runID: String) => {
    confirm({
      title: `Bạn muốn xóa xét nghiệm có ID:${runID} này?`,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Xóa',
      okType: 'danger',
      onOk() {
        fetch(`${testCaseEp}/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              // throw new Error('Lỗi khi xóa');
            }
            // message.success('Xóa thành công');
            const newPage = data.length === 1 && pagination.current > 1 ? pagination.current - 1 : pagination.current;
            setPagination({ ...pagination, current: newPage });
            getData(newPage, pagination.pageSize);
          })
          .catch((error) => {
            message.error(error.message);
          });
      }
    });
  };

  const handleCRUDSuccess = () => {
    getData(pagination.current, pagination.pageSize);
  };

  const handleUpSuccess = () => {
    addResultStatus();
    getData(pagination.current, pagination.pageSize);
  }

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
      key: 'primaryTissue',
      title: 'Mẫu mô',
      dataIndex: 'primaryTissue',
      align: 'left',
      filteredValue: [searchTerm],
      onFilter: (value, record) => {
        return String(record.patientName).toLowerCase().includes(String(value).toLowerCase());
      },
      render: (text, data) => (
        <>
          {data.primaryTissue == 'lung'
            ? 'Phổi'
            : data.primaryTissue == 'breast'
              ? ' Vú'
              : data.primaryTissue == 'hepatocellular_carcinoma'
                ? 'Gan'
                : data.primaryTissue == 'large_intestine'
                  ? 'Đại tràng'
                  : data.primaryTissue == 'thyroid'
                    ? 'Tuyến giáp'
                    : 'Không xác định'}
        </>
      ),
    },
    {
      key: 'testName',
      title: 'Mẫu bệnh phẩm',
      dataIndex: 'testName',
    },
    {
      key: 'option',
      title: 'Tùy chọn',
      width: 200,
      valueType: 'option',
      align: 'left',
      render: (text, data) => (
        <>
          {access.canAdmin || access.canDoctor ? (
            <Space size="large">
              <UploadTestCase patientID={data.patientID} onSuccess={handleUpSuccess} />
              <UpdateTestCase data={data} onSuccess={handleCRUDSuccess} />
              <Button type="primary" danger onClick={() => handleDelete(data._id, data.patientID)}>
                Xóa
              </Button>
            </Space>
          ) : (
            <Button type="primary" danger>
              Doctor and admin zone
            </Button>
          )}
        </>
      ),
    },
    {
      key: 'status',
      title: 'Trạng thái',
      dataIndex: '',
      align: 'center',
      render: (text: any, data: any) => {
        const matchedError = errorList.find((err) => err.fileName === data.patientID);
        return (
          <Space size={'large'}>
            {Array.from(IDTestData).includes(data.patientID) ? (
              <Tag color="success">
                <Link key="showDetail" to={`/tests/detail/${data.patientID}`}>
                  Chi tiết
                </Link>
              </Tag>
            ) : Array.isArray(resultStatus) && resultStatus.includes(data.patientID) ? (
              <Tag color="processing">Đang xử lý ...</Tag>
            ) : matchedError ? (
              <Tag color="error">{matchedError.ruleName}</Tag>
            ) : (
              <Tag color="warning">Chưa có dữ liệu ...</Tag>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      toolbar={{
        title: 'Danh sách xét nghiệm',
        search: {
          placeholder: 'Nhập thông tin',
          onSearch: (value) => setSearchTerm(value),
          onChange: (e) => setSearchTerm(e.target.value),
          style: { width: '350px' },
        },
        actions: [
          access.canAdmin || access.canDoctor ? (
            <AddTestCase onSuccess={handleCRUDSuccess} />
          ) : (
            <></>
          ),
        ],
        settings: [],
      }}
      showSorterTooltip={false}
      rowKey={(record) => record._id || record.patientID}
      search={false}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: totalPages,
      }}
      onChange={handleTableChange}
    />

  );
};
