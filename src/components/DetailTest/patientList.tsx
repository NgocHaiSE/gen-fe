import { server } from '@/pages/Api';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { useEffect, useState } from 'react';

const PatientList = () => {
  const [dataPatient, setDataPatient] = useState<
    Array<{
      patient: String;
      sample: String;
    }>
  >([]);

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/tests/', '');

  const fetchDataTest = async (id: String) => {
    const response = await fetch(`${server}/test-case/find/${id}`);
    const data = await response.json();
    const patientInformation = [
      {
        patient: data.patients,
        sample: data.sams,
      },
    ];
    setDataPatient(patientInformation);
  };

  useEffect(() => {
    fetchDataTest(id).catch((error) => console.error(error));
  }, []);

  console.log(dataPatient);

  const columns: ProColumns[] = [
    {
      title: 'STT',
      dataIndex: '',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên bệnh nhân',
      dataIndex: 'patient',
      hideInSearch: true,
      align: 'left',
      render: (patient) => (
        <>
          {patient.split(',').map((item: any, index: any) => (
            <li>{item.trim()}</li>
          ))}
        </>
      ),
    },
    {
      title: 'Mẫu',
      dataIndex: 'sample',
      hideInSearch: true,
      align: 'left',
      render: (sample) => (
        <>
          {sample.split(',').map((item: any, index: any) => (
            <li>{item.trim()}</li>
          ))}
        </>
      ),
    },
    {
      title: '',
      dataIndex: '',
      hideInSearch: true,
      align: 'center',
      render: (text, data) => (
        <>
          <Link key="showDetail" style={{ textDecoration: 'underline' }} to={`/`}>
            Chi tiết
          </Link>
        </>
      ),
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={dataPatient}
      toolbar={{
        settings: [],
      }}
      rowKey="key"
      search={false}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default PatientList;
