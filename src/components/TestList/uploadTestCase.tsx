import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload, UploadFile, Progress } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { addTestCaseEp } from '@/pages/EndPoint';

type UploadTestCaseProps = {
  patientID: string;
  onSuccess?: () => void;
};

const UploadTestCase: React.FC<UploadTestCaseProps> = ({ patientID, onSuccess }) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleOk = async () => {
    if (fileList.length === 0) {
      message.error('Vui lòng chọn file để upload');
      return;
    }

    const formData = new FormData();
    formData.append('patientID', patientID);
    formData.append('file', fileList[0].originFileObj as File);

    try {
      setUploading(true);
      setUploadProgress(0);

      await axios.post(addTestCaseEp, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer my-token',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      message.success('Upload thành công!');
      setFileList([]);
      setUploadProgress(0);
      setIsModalOpen(false);

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 800); 
      }

    } catch (error) {
      console.error('Lỗi upload file:', error);
      message.error('Upload thất bại!');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUploadProgress(0);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (info: { file: UploadFile<any>; fileList: UploadFile<any>[] }) => {
    setFileList(info.fileList.slice(-1));
  };

  return (
    <>
      <Button key="key" type="primary" onClick={showModal}>
        Thêm mẫu
      </Button>

      <Modal
        title="Thêm mẫu bệnh phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={uploading}
      >
        <Upload
          name="file"
          accept=".gz,.bam,.sam,.vcf,.fastq"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Chọn file</Button>
        </Upload>

        {uploading && (
          <Progress
            percent={uploadProgress}
            size="small"
            style={{ marginTop: 10 }}
          />
        )}
      </Modal>
    </>
  );
};

export default UploadTestCase;
