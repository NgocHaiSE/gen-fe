import {
  PageContainer,
  ProColumns,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import './style.css';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = [
  'CHP2-UT08VIET-FFPE-S-69',
  'CHP2-UT09THANG-FFPE-S-70',
  'HCC1395_FD',
  'HCC1395_FD1',
  'HCC1395_FD1',
];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'Loại đột biến',
    containers: i,
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

type FormValue = {
  jobInfo: {
    name: string;
    type: number;
  };
  syncTableInfo: {
    timeRange: [Dayjs, Dayjs];
    title: string;
  };
};

const formValue: FormValue = {
  jobInfo: {
    name: 'normal job',
    type: 1,
  },
  syncTableInfo: {
    timeRange: [dayjs().subtract(1, 'm'), dayjs()],
    title: 'example table title',
  },
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValue);
    }, time);
  });
};

const PatientManagement = () => {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  useEffect(() => {
    waitTime(1000).then(() => {
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Gen',
      dataIndex: 'containers',
      render: (_) => <a>{_}</a>,
    },
    {
      title: 'Loại đột biến',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: 'Tên đột biến',
      dataIndex: 'creator',
    },
    {
      title: 'Chỉnh sửa',
      width: 120,
      valueType: 'option',
      render: () => [<a key="link">Xóa</a>],
    },
  ];

  return (
    <StepsForm
      formMapRef={formMapRef}
      onFinish={(values) => {
        console.log(values);
        return Promise.resolve(true);
      }}
    >
      <StepsForm.StepForm style={{ margin: '0 0 25px 0' }} name="step1" title="Thông tin bệnh nhân">
        <PageContainer
          title={'Thông tin bệnh nhân'}
          style={{ background: '#ffffff', borderRadius: '6px' }}
        >
          <ProFormText width="md" name="id" label="Mã bệnh nhân" placeholder="" />
          <ProForm.Group>
            <ProFormText width="md" name="name" label="Tên bệnh nhân" placeholder="" />
            <ProFormText width="sm" name="age" label="Tuổi (năm sinh)" placeholder="" />
            <ProFormSelect
              // colProps={{ xl: 8, md: 12 }}
              label="Giới tính"
              name="gender"
              placeholder=""
              valueEnum={{
                1: 'Nam',
                2: 'Nữ',
                3: 'Khác',
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText name="folk" width="md" label="Dân tộc" placeholder="" />
            <ProFormText name="nation" width="md" label="Quốc tịch" placeholder="" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText name="address" width="md" label="Địa chỉ" placeholder="" />
            <ProFormText name="phone-number" width="md" label="Số điện thoại" placeholder="" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText name="hospital-name" width="md" label="Bệnh viện" placeholder="" />
            <ProFormText name="department" width="md" label="Khoa/phòng điều trị" placeholder="" />
            <ProFormText name="doctor-name" width="md" label="Bác sĩ điều trị" placeholder="" />
          </ProForm.Group>
        </PageContainer>
      </StepsForm.StepForm>
      <StepsForm.StepForm style={{ margin: '0 0 25px 0' }} name="step2" title="Thông tin lâm sàng">
        <PageContainer
          title={'Thông tin lâm sàng'}
          style={{ background: '#ffffff', borderRadius: '6px' }}
        >
          <ProForm.Group>
            <ProFormSelect
              colProps={{ xl: 12, md: 16 }}
              width={'md'}
              label="Loại ung thư"
              name="gender"
              placeholder=""
              valueEnum={{
                1: 'Ung thư phổi',
                2: 'Ung thư vú',
                3: 'Ung thư gan',
                4: 'Ung thư tuyến giáp',
                5: 'Ung thư trực tràng',
              }}
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width={'md'}
              label="Cơ quan di căn"
              name="metastatic-agency"
              placeholder=""
              valueEnum={{
                1: 'Não',
                2: 'Phổi',
                3: 'Gan',
                4: 'Dạ dày',
                5: 'Đại trực tràng',
                6: 'Vú',
                7: 'Tử cung',
                8: 'Buồng trứng',
                9: 'Xương',
                10: 'Khác',
                11: 'Không di căn',
              }}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText width="sm" name="name" label="stage" placeholder="" />
            <ProFormText width="100px" name="t" label="T" placeholder="" />
            <ProFormText width="100px" name="n" label="N" placeholder="" />
            <ProFormText width="100px" name="m" label="M" placeholder="" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText name="anamnesis" width="md" label="Tiền sử bệnh" placeholder="" />
            <ProFormText name="family-history" width="md" label="Tiền sử gia đình" placeholder="" />
          </ProForm.Group>
          <ProForm.Group title="Công thức máu">
            <ProFormText name="rbc" width="sm" label="RBC(T/L)" placeholder="" />
            <ProFormText name="hb" width="sm" label="Hb(g/L)" placeholder="" />
            <ProFormText name="wbc" width="sm" label="WBC(G/L)" placeholder="" />
            <ProFormText name="plt" width="sm" label="PLT(G/L)" placeholder="" />
          </ProForm.Group>
          <ProForm.Group title="Hóa sinh máu">
            <ProFormText name="ast" width="sm" label="AST(U/L)" placeholder="" />
            <ProFormText name="alt" width="sm" label="ALT(U/L)" placeholder="" />
            <ProFormText name="ure" width="sm" label="Ure(mmol/L)" placeholder="" />
            <ProFormText name="creatimin" width="sm" label="Creatimin(mol/L)" placeholder="" />
          </ProForm.Group>
        </PageContainer>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        style={{ margin: '0 0 25px 0' }}
        name="step3"
        title="Thông tin xét nghiệm gen"
      >
        <PageContainer
          title={'Thông tin xét nghiệm gen'}
          style={{ background: '#ffffff', borderRadius: '6px' }}
        >
          <ProForm.Group>
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Nguồn gốc mẫu"
              name="sample-origin"
              placeholder=""
              valueEnum={{
                1: 'Mô tổn thương tiên phát',
                2: 'Mô tổn thương di căn',
                3: 'Khác',
              }}
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Loại mẫu"
              name="sample-type"
              placeholder=""
              valueEnum={{
                1: 'Mô tươi',
                2: 'FFPE',
                3: 'Máu ngoại vi (ctDNA)',
                4: 'Dịch màng phổi/ màng bụng',
                5: 'DNA',
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDatePicker name="date" label="Ngày lấy mẫu" />
            <ProFormDatePicker name="test-date" label="Ngày xét nghiệm" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Phương pháp bảo quản "
              name="preservation-method"
              placeholder=""
              valueEnum={{
                1: 'Nhiệt độ thường',
                2: '4 độ C',
                3: '-20 độ C',
                4: '-80 độ C',
              }}
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Điều kiện vận chuyển"
              name="shipping-terms"
              placeholder=""
              valueEnum={{
                1: 'Nhiệt độ thường',
                2: 'Ice bag',
                3: 'Dry ice',
              }}
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Tình trạng mẫu"
              name="sample-status"
              placeholder=""
              valueEnum={{
                1: 'Đạt',
                2: 'Không đạt',
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="gene-testing-method"
              width="md"
              label="Phương pháp xét nghiệm gen"
              placeholder=""
            />
          </ProForm.Group>
          <ProForm.Group title="Kết quả xét nghiệm gen">
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              width="md"
              label="Gen"
              name="gene-name"
              placeholder=""
              valueEnum={{}}
            />
            <ProFormText name="mutan-type" width="md" label="Loại đột biến" placeholder="" />
            <ProFormText
              name="mutan-percent"
              width="md"
              label="Tỉ lệ đột biến (%)"
              placeholder=""
            />
            <Button style={{ marginTop: '30px' }}>ADD</Button>
          </ProForm.Group>
          <ProTable<TableListItem>
            columns={columns}
            request={(params, sorter, filter) => {
              console.log(params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            }}
            toolbar={{
              actions: [],
              settings: [],
            }}
            rowKey="key"
            search={false}
          />
        </PageContainer>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default PatientManagement;
