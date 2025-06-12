import { Form, Input, Radio } from 'antd';
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
    md: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 12 },
    md: {
      span: 12,
    },
  },
};
export default ({ form }) => {
  // const [generalInfoForm] = Form.useForm();

  return (
    <Form {...formItemLayout} form={form} labelAlign="left">
      <Form.Item name="healthRecordId" label="Mã bệnh án (Giải phẫu bệnh)">
        <Input></Input>
      </Form.Item>
      <Form.Item name="healthRecordClass" label="Phân loại bệnh án">
        <Radio.Group>
          <Radio value="yes">Duyệt</Radio>
          <Radio value="no">Chưa</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="PatineId" label="Mã bệnh nhân">
        <Input></Input>
      </Form.Item>
      <Form.Item name="startDate" label="Ngày tiến hành khảo sát">
        <Input type="date"></Input>
      </Form.Item>
      <Form.Item name="identID" label="ID định danh">
        <Input></Input>
      </Form.Item>
      <Form.Item name="fullname" label="Họ và tên">
        <Input></Input>
      </Form.Item>
      <Form.Item name="dob" label="Năm sinh">
        <Input
          type="text"
          maxLength={4} // Giới hạn độ dài tối đa là 4 ký tự
        />
      </Form.Item>
      <Form.Item name="sex" label="Giới tính">
        <Radio.Group>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="job" label="Nghề nghiệp">
        <Input></Input>
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ(Huyện - Tỉnh TP)">
        <Input></Input>
      </Form.Item>
      <Form.Item name="phone" label="SĐT liên lạc">
        <Input></Input>
      </Form.Item>

    </Form>
  );
};
