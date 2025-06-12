import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const validateMessages = {
  required: '${label} cần nhập đủ!',
  types: {
    number: '${label} phải là một số!',
  },
  number: {
    range: '${label} phải nằm trong khoảng từ ${min} đến ${max}',
  },
};

const AddInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    try {
      const { ID, sex, year, age, location, province, district, deadYear } =
        await form.validateFields();
      await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID, sex, year, age, location, province, district, deadYear }),
      });
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button key="key" type="primary" onClick={showModal}>
        <PlusOutlined />
        Thêm xét nghiệm mới
      </Button>
      <Modal
        title="Thêm thông tin xét nghiệm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600, padding: 40 }}
          validateMessages={validateMessages}
        >
          <Form.Item name={['ID', 'ID']} label="Số chứng minh thư" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['sex', 'sex']} label="Giới tính" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['year', 'year']} label="Năm sinh">
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['age', 'age']}
            label="Tuổi phát hiện bệnh"
            rules={[{ type: 'number', min: 0, max: 150 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['location', 'location']}
            label="Vị trí ung thư"
            rules={[{ type: 'string' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['province', 'province']} label="Tỉnh" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['district', 'district']} label="Huyện/TP" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['deadYear', 'deadYear']} label="Năm tử vong">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddInformation;
