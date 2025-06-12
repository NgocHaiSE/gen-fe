import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Pagination, Popconfirm, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import './styles.css';

const ViewFDA = ({ datas, setCurentPage, metadata, role }) => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [visible5, setVisible5] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [showEvidenceEN, setShowEvidenceEN] = useState({});
  const [showEvidenceVN, setShowEvidenceVN] = useState({});

  const toggleEvidenceEN = (medicineId) => {
    setShowEvidenceEN((prevState) => ({
      ...prevState,
      [medicineId]: !prevState[medicineId],
    }));
  };

  const toggleEvidenceVN = (medicineId) => {
    setShowEvidenceVN((prevState) => ({
      ...prevState,
      [medicineId]: !prevState[medicineId],
    }));
  };
  const handlePageChange = (page) => {
    setCurrentPage1(page);
    setCurentPage(page);
  };
  const handleEditComponent = (component) => {
    setCurrentComponent(component);
    setVisible(true);
  };
  const handleDeleteComponent = (componentId) => {
    axios
      .post('https://ut-project-be.vercel.app/api/delete-fda-medicine', {
        medicineId: componentId,
      })
      .then((response) => {
        console.log('xoa thuốc thanh cong');
      })
      .catch((error) => {
        console.log('xóa thất bại');
      });
  };
  const handleModalSubmit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/edit-fda-medicine', {
        medicineId: currentComponent._id,
        type: values.type,
        medicine_name: values.medicine_name,
        link_evidence: values.link_evidence,
        fda_approved: true,
        link_image: values.link_image,
        text_evidence_us: values.text_evidence_us,
        text_evidence_vn: values.text_evidence_vn,
      })
      .then((response) => {
        console.log('sửa thông tin hoạt chất thành công');
      })
      .catch((error) => {
        console.log('sửa thất bại');
      });

    console.log('Edit component:', currentComponent._id, 'with values:', values);
    setVisible(false);
    setCurrentComponent(null);
  };
  const handleModalCancel = () => {
    setCurrentComponent(null);
    setVisible(false);
  };
  const handleAddMedicine = () => {
    setVisible5(true);
    console.log('Add medicine to component:');
  };
  const handleModal3Cancel = () => {
    setVisible5(false);
  };
  const handleModal3Submit = (values) => {
    axios
      .post('https://ut-project-be.vercel.app/api/fda-medicine', {
        medicine_name: values.medicine_name,
        type: values.type,
        link_evidence: values.link_evidence,
        link_image: values.link_image,
        text_evidence_us: values.text_evidence_us,
        text_evidence_vn: values.text_evidence_vn,
        fda_approved: true,
      })
      .then((response) => {
        console.log('them thuoc thanh cong');
      })
      .catch((error) => {
        console.log('thuoc thuoc thất bại');
      });

    console.log('add medicin:', 'with values:', values);
    setVisible5(false);
  };
  return (
    <div>
      {role && (
        <Card style={{ marginBottom: 16 }}>
          <Button type="text" icon={<PlusOutlined />} onClick={() => handleAddMedicine()}>
            Thêm thuốc
          </Button>
        </Card>
      )}

      {datas.map((medicine) => (
        <Card className="medicine-card" key={medicine._id}>
          {role && (
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditComponent(medicine)}
              />
              <Popconfirm
                title="Are you sure to delete this component?"
                onConfirm={() => handleDeleteComponent(medicine._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          )}

          <h2>{medicine.medicine_name}</h2>
          <p>Type: {medicine.type}</p>
          <p>FDA Approved: {medicine.fda_approved ? 'Còn Hạn' : 'Hết Hạn'}</p>
          <p>
            <a href={medicine.link_evidence}>Link to Evidence</a>
          </p>
          <p>
            <a href={medicine.link_image}>Link to image</a>
          </p>

          {/* <img src={medicine.link_image} alt={medicine.medicine_name} /> */}
          <h3>
            Evidence (English):{' '}
            <Button
              type="text"
              icon={showEvidenceEN[medicine._id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => toggleEvidenceEN(medicine._id)}
            />
          </h3>
          {showEvidenceEN[medicine._id] && <p>{medicine.text_evidence_us}</p>}
          <h3>
            Evidence (Vietnamese):{' '}
            <Button
              type="text"
              icon={showEvidenceVN[medicine._id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => toggleEvidenceVN(medicine._id)}
            />
          </h3>
          {showEvidenceVN[medicine._id] && <p>{medicine.text_evidence_vn}</p>}
        </Card>
      ))}
      <Modal
        title="Sửa thông tin thuốc"
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleModalSubmit} layout="vertical">
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Vui lòng nhập type!' }]}
            initialValue={currentComponent?.type}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên thuốc"
            name="medicine_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên thuốc!' }]}
            initialValue={currentComponent?.medicine_name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="link_evidence"
            name="link_evidence"
            rules={[{ required: true, message: 'Vui lòng nhập link_evidence!' }]}
            initialValue={currentComponent?.link_evidence}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="link_image"
            name="link_image"
            rules={[{ required: true, message: 'Vui lòng nhập link_image!' }]}
            initialValue={currentComponent?.link_image}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text evidence us"
            name="text_evidence_us"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên text evidence us!',
              },
            ]}
            initialValue={currentComponent?.medicine_name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text evidence vn"
            name="text_evidence_vn"
            rules={[{ required: true, message: 'Vui lòng nhập text evidence vn!' }]}
            initialValue={currentComponent?.text_evidence_vn}
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
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Vui lòng nhập tên type!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên thuốc"
            name="medicine_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên thuốc!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Link evidence"
            name="link_evidence"
            rules={[{ required: true, message: 'Vui lòng nhập link evidence!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Link image"
            name="link_image"
            rules={[{ required: true, message: 'Vui lòng nhập link image!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text evidence us"
            name="text_evidence_us"
            rules={[{ required: true, message: 'Vui lòng nhập text evidence us!' }]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text evidence vn"
            name="text_evidence_vn"
            rules={[{ required: true, message: 'Vui lòng nhập text evidence vn!' }]}
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
    </div>
  );
};

export default ViewFDA;
