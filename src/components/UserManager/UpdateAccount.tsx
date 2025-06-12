import { server } from '@/pages/Api';
import CRUDService from '@/services/CRUDService';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useState } from 'react';
import './updateAccount.css';

const UpdateAccount = ({ data, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const api = `${server}/user/update-user`;
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {contextHolder}

      <Button key="key" type="primary" onClick={showModal}>
        Sửa
      </Button>

      <Modal
        title="Cập nhật thông tin tài khoản người dùng"
        visible={isModalOpen}
        onOk={handleFinish}
        onCancel={handleCancel}
      >
        <Form form={form} className="update-account-form">
          <Form.Item name="email" label="Tài khoản:" initialValue={data.email}>
            <Input allowClear placeholder="Tài khoản" required />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu:" initialValue="">
            <Input.Password allowClear placeholder="Mật khẩu mới" required={false} />
          </Form.Item>
          <Form.Item name="access" label="Quyền truy cập:" initialValue={data.access}>
            <Select onChange={handleChange}>
              <Select.Option value="user">Người dùng phổ thông</Select.Option>
              <Select.Option value="doctor">Bác sĩ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="Tên người dùng:" initialValue={data.name}>
            <Input allowClear placeholder="Tên người dùng" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAccount;
