import { server } from '@/pages/Api';
import CRUDService from '@/services/CRUDService';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useState } from 'react';
import './updateTestInfor.css';

const UpdateTestCase = ({ data, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  console.log(data);
  const api = `${server}/test-case/update-test`;
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa thông tin thành công !!!',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Xảy ra lỗi khi sửa thông tin !!!',
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await CRUDService.updateService(api, values);
      success();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      warning();
    }
    handleCancel();
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {contextHolder}

      <Button key="key" type="primary" onClick={showModal}>
        Sửa
      </Button>

      <Modal
        title="Thêm thông tin xét nghiệm"
        open={isModalOpen}
        onOk={handleFinish}
        onCancel={handleCancel}
      >
        <Form form={form} className="update-test-case-form">
          <Form.Item name="patientID" label="Mã bệnh nhân:" initialValue={data.patientID}>
            <Input allowClear placeholder="Nhập mã bệnh nhân" required={true} disabled />
          </Form.Item>
          <Form.Item name="patientName" label="Tên bệnh nhân:" initialValue={data.patientName}>
            <Input allowClear placeholder="Nhập tên bệnh nhân" required={true} />
          </Form.Item>
          <Form.Item name="testName" label="Mẫu bệnh phẩm:" initialValue={data.testName}>
            <Input allowClear placeholder="Nhập mẫu bệnh phẩm" />
          </Form.Item>
          <Form.Item name="primaryTissue" label="Vị trí mô:" initialValue={data.primaryTissue}>
            <Select
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: 'breast', label: 'Vú (Breast)' },
                { value: 'hepatocellular_carcinoma', label: 'Gan (Hepatocellular Carcinoma)' },
                { value: 'lung', label: 'Phổi (Lung)' },
                { value: 'large_intestine', label: 'Đại tràng (Large Intestine)' },
                { value: 'thyroid', label: 'Tuyến giáp (Thyroid)' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateTestCase;
