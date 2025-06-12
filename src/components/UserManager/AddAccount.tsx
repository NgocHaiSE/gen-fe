import { server } from '@/pages/Api';
import CRUDService from '@/services/CRUDService';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useState } from 'react';
import './addAccount.css';

const AddAPI = `${server}/user/register`;

const AddAccount = ({ onSuccess }) => {
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
      await CRUDService.saveService(AddAPI, values);
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
        Thêm người dùng mới
      </Button>
      <Modal
        title="Thêm tài khoản người dùng mới"
        open={isModalOpen}
        onOk={handleFinish}
        onCancel={handleCancel}
      >
        <Form form={form} className="add-account-form">
          <Form.Item name="email" label="Tài khoản:">
            <Input allowClear placeholder="Tài khoản" required={true} />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu:">
            <Input allowClear placeholder="Mật khẩu" required={true} />
          </Form.Item>
          <Form.Item name="access" label="Quyền truy cập:">
            <Select
              defaultValue="user"
              onChange={handleChange}
              options={[
                { value: 'user', label: 'Người dùng phổ thông' },
                { value: 'doctor', label: 'Bác sĩ' },
              ]}
            />
          </Form.Item>
          <Form.Item name="name" label="Tên người dùng:">
            <Input allowClear placeholder="Tên người dùng" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAccount;
