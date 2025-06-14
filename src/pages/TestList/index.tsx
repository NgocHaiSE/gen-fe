import token from '@/utils/token';
import { ExclamationCircleOutlined, FileWordOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link, useAccess, useSearchParams } from '@umijs/max';
import { Button, message, Modal, Space, Tag, Card, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { server } from '../Api';
import { testCaseEp } from '../EndPoint';
import AddTestCase from '@/components/TestList/addTestInformation';
import UpdateTestCase from '@/components/TestList/updateTestInformation';
import UploadTestCase from '@/components/TestList/uploadTestCase';
import ExportModal from '@/components/TestList/ExportModal'; // Thêm import này
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

const { Search } = Input;
const { Title, Text } = Typography;
const { confirm } = Modal;

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState(() => {
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    return { current: page, pageSize };
  });
  const [totalPages, setTotalPages] = useState(1);
  const [IDTestData, setIDTestData] = useState<any[]>([]);
  const [resultStatus, setResultStatus] = useState<any[]>([]);
  const [errorList, setErrorList] = useState<any[]>([]);
  // Thêm state cho export modal
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const access = useAccess();

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

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current ?? 1,
      pageSize: newPagination.pageSize ?? 10,
    });
    setSearchParams({
      page: (newPagination.current ?? 1).toString(),
      pageSize: (newPagination.pageSize ?? 10).toString(),
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${testCaseEp}/detail`);
      const data = await response.json();
      setIDTestData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addResultStatus = async () => {
    try {
      const response = await fetch(`${testCaseEp}/file-name`);
      const data = await response.json();
      setResultStatus(data);
    } catch (error) {
      console.log(error);
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

  // Thêm hàm xử lý export cho từng bệnh nhân
  const handleExportClick = (patientData: any) => {
    setSelectedPatient(patientData);
    setExportModalVisible(true);
  };

  const columns: ProColumns[] = [
    {
      key: 'patientID',
      title: 'Mã xét nghiệm',
      dataIndex: 'patientID',
      sorter: (a, b) => a.patientID - b.patientID,
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono font-semibold text-gray-900">{text}</span>
        </div>
      ),
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
      render: (text) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      ),
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
      render: (text, data) => {
        const tissueMap = {
          'lung': { name: 'Phổi', color: 'bg-red-100 text-red-700 border-red-200' },
          'breast': { name: 'Vú', color: 'bg-pink-100 text-pink-700 border-pink-200' },
          'hepatocellular_carcinoma': { name: 'Gan', color: 'bg-orange-100 text-orange-700 border-orange-200' },
          'large_intestine': { name: 'Đại tràng', color: 'bg-blue-100 text-blue-700 border-blue-200' },
          'thyroid': { name: 'Tuyến giáp', color: 'bg-green-100 text-green-700 border-green-200' },
        };

        const tissue = tissueMap[data.primaryTissue as keyof typeof tissueMap] || { name: 'Không xác định', color: 'bg-gray-100 text-gray-700 border-gray-200' };

        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${tissue.color}`}>
            {tissue.name}
          </span>
        );
      },
    },
    {
      key: 'testName',
      title: 'Mẫu bệnh phẩm',
      dataIndex: 'testName',
      render: (text) => (
        <div className="flex items-center space-x-2">
          <span className="text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      key: 'option',
      title: 'Tùy chọn',
      width: 300,
      valueType: 'option',
      align: 'left',
      render: (text, data) => (
        <>
          {access.canAdmin || access.canDoctor ? (
            <div className="flex items-center space-x-2">
              <Button
                icon={<FileWordOutlined />}
                size="medium"
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
                onClick={() => handleExportClick(data)}
              >
                Xuất file
              </Button>
              <UploadTestCase patientID={data.patientID} onSuccess={handleUpSuccess} />
              <UpdateTestCase data={data} onSuccess={handleCRUDSuccess} />
              <Button
                type="primary"
                danger
                size="medium"
                className="bg-red-500 hover:bg-red-600 border-red-500"
                onClick={() => handleDelete(data._id, data.patientID)}
              >
                Xóa
              </Button>
            </div>
          ) : (
            <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
              Doctor and admin zone
            </div>
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

        if (IDTestData.includes(data.patientID)) {
          return (
            <Link to={`/tests/detail/${data.patientID}?page=${pagination.current}&pageSize=${pagination.pageSize}`}>
              <div className="inline-flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                <span className="font-medium">Chi tiết</span>
              </div>
            </Link>
          );
        } else if (Array.isArray(resultStatus) && resultStatus.includes(data.patientID)) {
          return (
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              <span className="font-medium">Đang xử lý</span>
            </div>
          );
        } else if (matchedError) {
          return (
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <span className="font-medium">{matchedError.ruleName}</span>
            </div>
          );
        } else {
          return (
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
              <span className="font-medium">Chưa có dữ liệu</span>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-1">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <Title level={2} className="!mb-1 !text-gray-900">
                  Danh sách xét nghiệm
                </Title>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <ProTable
            columns={columns}
            dataSource={data}
            toolbar={{
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
            rowKey={(record) => record._id || record.patientID}
            search={false}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: totalPages,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} xét nghiệm`,
              className: "custom-pagination"
            }}
            onChange={handleTableChange}
            rowClassName="hover:bg-gray-50 transition-colors"
            className="custom-table"
          />
        </Card>

        {/* Export Modal */}
        <ExportModal
          visible={exportModalVisible}
          onCancel={() => setExportModalVisible(false)}
          selectedPatient={selectedPatient}
        />

      </div>

      <style>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #374151;
        }
        
        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9;
          padding: 16px;
        }
        
        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc;
        }
        
        .search-input .ant-input-affix-wrapper {
          border-radius: 8px;
          border: 2px solid #e2e8f0;
        }
        
        .search-input .ant-input-affix-wrapper:focus,
        .search-input .ant-input-affix-wrapper-focused {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }
        
        .custom-pagination .ant-pagination-item-active {
          border-color: #06b6d4;
          background-color: #06b6d4;
        }
        
        .custom-pagination .ant-pagination-item-active a {
          color: white;
        }
      `}</style>
    </div>
  );
};