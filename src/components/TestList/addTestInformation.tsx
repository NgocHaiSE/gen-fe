import { server } from '@/pages/Api';
import CRUDService from '@/services/CRUDService';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useState } from 'react';
import './addTestInfor.css';

const searchUrl = `${server}/test-case/add`;

const AddTestCase = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Thêm thông tin thành công !!!',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Xảy ra lỗi khi thêm thông tin !!!',
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
      await CRUDService.saveService(searchUrl, values);
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
        <PlusOutlined />
        Thêm xét nghiệm mới
      </Button>

      <Modal
        title="Thêm thông tin xét nghiệm"
        open={isModalOpen}
        onOk={handleFinish}
        onCancel={handleCancel}
      >
        <Form form={form} className="add-test-case-form">
          <Form.Item name="patientID" label="Mã bệnh nhân:">
            <Input allowClear placeholder="Nhập mã bệnh nhân" required={true} />
          </Form.Item>
          <Form.Item name="patientName" label="Tên bệnh nhân:">
            <Input allowClear placeholder="Nhập tên bệnh nhân" required={true} />
          </Form.Item>
          <Form.Item name="testName" label="Mẫu bệnh phẩm:">
            <Input allowClear placeholder="Nhập mẫu bệnh phẩm" />
          </Form.Item>
          <Form.Item name="primaryTissue" label="Vị trí mô:">
            <Select
              defaultValue="Vị trí mô"
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

export default AddTestCase;
