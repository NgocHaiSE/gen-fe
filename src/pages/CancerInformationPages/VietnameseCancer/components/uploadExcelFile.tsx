import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const FileUpload = () => {
  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <Upload accept=".xlsx,.xls" beforeUpload={handleUpload}>
      <Button icon={<UploadOutlined />}>Upload Excel File</Button>
    </Upload>
  );
};

export default FileUpload;
