import { Form, Input, Radio } from 'antd';
import CustomTable from '../CustomTable';
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
    md: {
      span: 8,
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
export default ({ form, cancer }) => {
  return (
    <>
      <Form {...formItemLayout} labelAlign="left" form={form}>
        <Form.Item name="patientId" label="Mã bệnh nhân">
          <Input></Input>
        </Form.Item>
        <Form.Item name="testCode" label="Mã xét nghiệm">
          <Input></Input>
        </Form.Item>
        <Form.Item name="dateSample" label="Ngày lấy mẫu">
          <Input type="date"></Input>
        </Form.Item>
        <Form.Item name="testDate" label="Ngày thực hiện xét nghiệm">
          <Input type="date"></Input>
        </Form.Item>
        <Form.Item name="typeSample" label="Loại mẫu bệnh phẩm">
          <Radio.Group>
            <Radio value="Mẫu mô tươi.">Mẫu mô tươi</Radio>
            <Radio value="Mẫu mô đúc nến.">Mẫu mô đúc nến</Radio>
            <Radio value="Mẫu máu ngoại vi">Mẫu máu ngoại vi</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="sourceSample" label="Nguồn lấy mẫu">
          <Radio.Group>
            <Radio value="Mô tổn thương chính">Mô tổn thương chính</Radio>
            <Radio value="Mô tổn thương di căn">Mô tổn thương di căn</Radio>
            <Radio value="Khác">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="concentrateDNA" label="Nồng độ DNA thu được">
          <Input></Input>
        </Form.Item>
        <Form.Item name="purityDNA" label="Độ tinh sạch của DNA sau tách chiết">
          <Radio.Group>
            <Radio value="Đạt">Đạt</Radio>
            <Radio value="Không đạt">Không đạt</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <h4> Kết quả xét nghiệm biến thể gây bệnh</h4>
      <CustomTable record={cancer.genTest} />
      <h4>Kết quả xét nghiệm biến thể liên quan đáp ứng thuốc điều trị đích</h4>
      <CustomTable record={cancer.genTestResponseTreatment} />
    </>
  );
};
