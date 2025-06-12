import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Panel } = Collapse;
const { Meta } = Card;

const ViewThuocTriLieu = ({ datas, setCurentPage, metadata, role }) => {
  const [visible, setVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [visible2, setVisible2] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [currentAdd, setCurrentAdd] = useState(null);
  const [currentPage1, setCurrentPage1] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage1(page);
    setCurentPage(page);
  };

  const handleEdit = (component) => {
    setCurrentMedicine(component);
    setVisible2(true);
    console.log('Edit component:', component);
  };

  const handleModal2Cancel = () => {
    setVisible2(false);
    setCurrentMedicine(null);
  };

  const handleModal2Submit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/edit-vn-medicine', {
        medicine_name: values.medicine_name,
        content: values.content,
        medicineId: currentMedicine._id,
        dosage_form: values.dosage_form,
        company_name: values.company_name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(message);
      });

    console.log('Edit component:', 'with values:', values);
    setVisible2(false);
    setCurrentMedicine(null);
  };

  const handleDelete = (medicine_Id) => {
    axios
      .post('https://ut-project-be.vercel.app/api/delete-vn-medicine', { medicineId: medicine_Id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(message);
      });
  };
  const handleDeleteComponent = (componentId) => {
    axios
      .post('https://ut-project-be.vercel.app/api/delete-component', {
        componentId: componentId,
      })
      .then((response) => {
        console.log('xoa hoat chat thanh cong');
      })
      .catch((error) => {
        console.log(message);
      });
  };
  const handleAddMedicine = (componentId) => {
    setCurrentAdd(componentId);
    setVisible5(true);
    console.log('Add medicine to component:', componentId);
  };

  const handleAddComponent = () => {
    setVisible4(true);
    console.log('Add component');
  };

  const handleEditComponent = (component) => {
    setCurrentComponent(component);
    setVisible(true);
  };

  const handleModalCancel = () => {
    setCurrentComponent(null);
    setVisible(false);
  };

  const handleModalSubmit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/edit-component', {
        componentId: currentComponent._id,
        cure: values.cure,
        component: values.component,
        gene: values.gene,
      })
      .then((response) => {
        console.log('sửa thông tin hoạt chất thành công');
      })
      .catch((error) => {
        console.log(message);
      });

    console.log('Edit component:', currentComponent._id, 'with values:', values);
    setVisible(false);
    setCurrentComponent(null);
  };
  const handleModal3Cancel = () => {
    setVisible5(false);
  };
  const handleModal3Submit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/vn-medicine-not-approved', {
        medicine_name: values.medicine_name,
        content: values.content,
        component: currentAdd,
        dosage_form: values.dosage_form,
        company_name: values.company_name,
        packing: values.packing,
      })
      .then((response) => {
        console.log('them thuoc thanh cong');
      })
      .catch((error) => {
        console.log(message);
      });

    console.log('add medicin:', 'with values:', values);
    setVisible5(false);
  };

  const handleModal4Cancel = () => {
    setVisible4(false);
  };
  const handleModal4Submit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/add-component', {
        cure: values.cure,
        component: values.component,
        gene: values.gene,
        approved: false,
      })
      .then((response) => {
        console.log('them thanh cong hoat chat');
      })
      .catch((error) => {
        console.log(message);
      });

    setVisible4(false);
  };
  return (
    <Row gutter={16}>
      {role && (
        <Col span={24}>
          <Card style={{ marginBottom: 16 }}>
            <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddComponent}>
              Thêm hoạt chất
            </Button>
          </Card>
        </Col>
      )}
      {datas.map((data) => (
        <Col key={data._id} span={24}>
          <Card
            title={data.component}
            style={{ marginBottom: 16 }}
            extra={
              role && (
                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditComponent(data)}
                  />
                  <Popconfirm
                    title="Are you sure to delete this component?"
                    onConfirm={() => handleDeleteComponent(data._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddMedicine(data._id)}
                  >
                    Thêm thuốc
                  </Button>
                </Space>
              )
            }
          >
            <p>
              <strong className="component-name">Cure:</strong> {data.cure}
            </p>
            <p>
              <strong className="component-name">Gene:</strong> {data.gene}
            </p>
            <Collapse ghost>
              <Panel header={<strong className="collapse-header">Thuốc</strong>} key="1">
                <Row gutter={16}>
                  {data.medicines.map((medicine) => (
                    <Col key={medicine._id} span={24}>
                      <Card
                        actions={[
                          role && (
                            <Button
                              type="text"
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(medicine)}
                            />
                          ),
                          role && (
                            <Popconfirm
                              title="Are you sure to delete this medicine?"
                              onConfirm={() => handleDelete(medicine._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="text" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          ),
                        ]}
                      >
                        <Meta
                          title={
                            <strong className="medicine-name">{medicine.medicine_name}</strong>
                          }
                          description={
                            <>
                              <p>
                                <strong>Content:</strong> {medicine.content}
                              </p>
                              <p>
                                <strong>Dosage Form:</strong> {medicine.dosage_form}
                              </p>
                              <p>
                                <strong>Packing:</strong> {medicine.packing}
                              </p>
                              <p>
                                <strong>Company Name:</strong> {medicine.company_name}
                              </p>
                              <p>
                                <strong>Circulation Permit:</strong>
                                {medicine.approved ? medicine.circulation_permit : 'Hết hạn'}
                              </p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      ))}

      <Modal
        title="Sửa thông tin hoạt chất"
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleModalSubmit} layout="vertical">
          <Form.Item
            label="Tên hoạt chất"
            name="component"
            rules={[{ required: true, message: 'Vui lòng nhập tên hoạt chất!' }]}
            initialValue={currentComponent?.component}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cure"
            name="cure"
            rules={[{ required: true, message: 'Vui lòng nhập cure!' }]}
            initialValue={currentComponent?.cure}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gene"
            name="gene"
            rules={[{ required: true, message: 'Vui lòng nhập gene!' }]}
            initialValue={currentComponent?.gene}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa thông tin thuốc"
        visible={visible2}
        onCancel={handleModal2Cancel}
        footer={null}
      >
        <Form onFinish={handleModal2Submit} layout="vertical">
          <Form.Item
            label="Tên thuốc"
            name="medicine_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên thuốc!' }]}
            initialValue={currentMedicine?.medicine_name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập content!' }]}
            initialValue={currentMedicine?.content}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dosage form"
            name="dosage_form"
            rules={[{ required: true, message: 'Vui lòng nhập dosage form!' }]}
            initialValue={currentMedicine?.dosage_form}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company name"
            name="company_name"
            rules={[{ required: true, message: 'Vui lòng nhập company name!' }]}
            initialValue={currentMedicine?.company_name}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Thêm thuốc" visible={visible5} onCancel={handleModal3Cancel} footer={null}>
        <Form onFinish={handleModal3Submit} layout="vertical">
          <Form.Item
            label="Tên thuốc"
            name="medicine_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên thuốc!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập content!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dosage form"
            name="dosage_form"
            rules={[{ required: true, message: 'Vui lòng nhập dosage form!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Packing"
            name="packing"
            rules={[{ required: true, message: 'Vui lòng nhập packing!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company name"
            name="company_name"
            rules={[{ required: true, message: 'Vui lòng nhập company name!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Thêm hoạt chất" visible={visible4} onCancel={handleModal4Cancel} footer={null}>
        <Form onFinish={handleModal4Submit} layout="vertical">
          <Form.Item
            label="Tên hoạt chất"
            name="component"
            rules={[{ required: true, message: 'Vui lòng nhập tên hoạt chất!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cure"
            name="cure"
            rules={[{ required: true, message: 'Vui lòng nhập cure!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gene"
            name="gene"
            rules={[{ required: true, message: 'Vui lòng nhập gene!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Pagination
        current={currentPage1}
        pageSize={5}
        total={metadata.totalPage * 5}
        onChange={handlePageChange}
      />
    </Row>
  );
};

export default ViewThuocTriLieu;
