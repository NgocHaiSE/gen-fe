import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, Table, Typography, Divider, Row, Col } from 'antd';
import { FileWordOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface ExportModalProps {
  visible: boolean;
  onCancel: () => void;
  selectedPatient?: any;
}

const ExportModal: React.FC<ExportModalProps> = ({ visible, onCancel, selectedPatient }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    clinicalDiagnosis: '',
    doctor: '',
    receiveDate: dayjs(),
    resultDate: dayjs(),
    sampleType: '',
    sampleCode: '',
  });

  // Cập nhật formData khi selectedPatient thay đổi
  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        patientName: selectedPatient.patientName || '',
        patientId: selectedPatient.patientID || '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        clinicalDiagnosis: '',
        doctor: '',
        receiveDate: dayjs(),
        resultDate: dayjs(),
        sampleType: selectedPatient.testName || '',
        sampleCode: '',
      });
    }
  }, [selectedPatient]);

  // Dữ liệu mẫu cho các bảng kết quả
  const approvedVariants = [
    {
      key: '1',
      gene: 'EGFR',
      variant: 'p.L858R',
      vaf: '45.2',
      responsive: 'Erlotinib, Gefitinib, Afatinib',
      resistant: 'N/A'
    },
    {
      key: '2',
      gene: 'KRAS',
      variant: 'p.G12C',
      vaf: '32.1',
      responsive: 'Sotorasib, Adagrasib',
      resistant: 'Anti-EGFR'
    }
  ];

  const potentialVariants = [
    {
      key: '1',
      gene: 'PIK3CA',
      variant: 'p.H1047R',
      vaf: '28.5',
      responsive: 'Alpelisib',
      resistant: 'N/A'
    }
  ];

  const unknownVariants = [
    {
      key: '1',
      gene: 'TP53',
      variant: 'p.R273H',
      mutationType: 'Missense',
      vaf: '67.3',
      classification: 'VUS'
    }
  ];

  const columns = [
    { title: 'Gen', dataIndex: 'gene', key: 'gene' },
    { title: 'Biến thể', dataIndex: 'variant', key: 'variant' },
    { title: 'VAF (%)', dataIndex: 'vaf', key: 'vaf' },
    { title: 'Đáp ứng', dataIndex: 'responsive', key: 'responsive' },
    { title: 'Kháng', dataIndex: 'resistant', key: 'resistant' },
  ];

  const unknownColumns = [
    { title: 'Gen', dataIndex: 'gene', key: 'gene' },
    { title: 'Biến thể', dataIndex: 'variant', key: 'variant' },
    { title: 'Loại đột biến', dataIndex: 'mutationType', key: 'mutationType' },
    { title: 'VAF (%)', dataIndex: 'vaf', key: 'vaf' },
    { title: 'Phân loại', dataIndex: 'classification', key: 'classification' },
  ];

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportWord = async () => {
    try {
      // Tạo nội dung HTML cho file Word
      const htmlContent = generateWordContent();

      // Tạo Blob với nội dung HTML
      const blob = new Blob([htmlContent], {
        type: 'application/msword'
      });

      // Tạo link download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Ket_qua_xet_nghiem_${formData.patientId}_${dayjs().format('DDMMYYYY')}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset form và đóng modal
      setFormData({
        patientName: '',
        patientId: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        clinicalDiagnosis: '',
        doctor: '',
        receiveDate: dayjs(),
        resultDate: dayjs(),
        sampleType: '',
        sampleCode: '',
      });
      onCancel();
    } catch (error) {
      console.error('Lỗi khi xuất file:', error);
      alert('Có lỗi xảy ra khi xuất file. Vui lòng thử lại.');
    }
  };

  const generateWordContent = () => {
    return `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
        xmlns:w="urn:schemas-microsoft-com:office:word" 
        xmlns="http://www.w3.org/TR/REC-html40">
      <head>
      <meta charset="utf-8">
      <title>Kết quả xét nghiệm</title>
      <style>
        @page { margin: 2cm; }
        body { 
        font-family: 'Times New Roman', serif; 
        font-size: 11pt; 
        line-height: 1.3;
        margin: 0;
        padding: 0;
        }
        .header { 
        text-align: center; 
        font-weight: bold; 
        font-size: 13pt; 
        margin-bottom: 30px;
        text-transform: uppercase;
        }
        .section-title { 
        font-weight: bold; 
        font-size: 11pt; 
        margin: 5px 0 5px 0;
        color: #000;
        }
        .patient-info { 
        margin-bottom: 25px; 
        }
        .patient-info table { 
        width: 100%; 
        border-collapse: collapse;
        font-size: 11pt;
        }
        .patient-info td { 
        padding: 6px 8px; 
        border: 1px solid #000;
        vertical-align: top;
        }
        .result-table { 
        width: 100%; 
        border-collapse: collapse; 
        margin: 5px 0 10px 0;
        font-size: 11pt;
        }
        .result-table th, .result-table td { 
        border: 1px solid #000; 
        padding: 6px 8px; 
        text-align: left;
        vertical-align: middle;
        }
        .result-table th { 
        background-color: #f5f5f5; 
        font-weight: bold;
        text-align: center;
        }
        .result-table td {
        text-align: left;
        }
        .result-table td.center {
        text-align: center;
        }
        .tech-specs { 
        margin-top: 8px; 
        }
        .tech-specs table { 
        width: 100%; 
        border-collapse: collapse;
        font-size: 11pt;
        }
        .tech-specs td { 
        padding: 6px 8px; 
        border: 1px solid #000;
        vertical-align: top;
        }
        .tech-specs td:first-child {
        width: 30%;
        font-weight: bold;
        background-color: #f9f9f9;
        }
        .signature-section {
        margin-top: 30px;
        }
        .signature-table {
        width: 100%;
        border: none;
        border-collapse: collapse;
        }
        .signature-table td {
        border: none;
        padding: 10px;
        text-align: center;
        vertical-align: top;
        }
        .note {
        margin: 15px 0;
        font-style: italic;
        font-size: 11pt;
        }
        .date-location {
        text-align: right;
        font-style: italic;
        margin-bottom: 25px;
        }
      </style>
      </head>
      <body>
      <div class="header">
        XÉT NGHIỆM XÁC ĐỊNH ĐỘT BIẾN GEN UNG THƯ CHO ĐIỀU TRỊ ĐÍCH
      </div>
      
      <div class="section-title">I. THÔNG TIN BỆNH NHÂN</div>
        <div class="patient-info">
          <table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse; width:100%;">
            <tr>
              <td style="width: 50%;">Họ tên người bệnh: <strong>${formData.patientName}</strong></td>
              <td style="width: 30%;">Năm sinh/Tuổi: ${formData.age}</td>
              <td style="width: 20%;">Giới: ${formData.gender}</td>
            </tr>
            <tr>
              <td>Số điện thoại: ${formData.phone}</td>
              <td colspan="2">Mã người bệnh: ${formData.patientId}</td>
            </tr>
            <tr>
              <td>Địa chỉ: ${formData.address}</td>
              <td colspan="2">Phòng khám: </td>
            </tr>
            <tr>
              <td>Chẩn đoán lâm sàng: ${formData.clinicalDiagnosis}</td>
              <td colspan="2">Bác sĩ chỉ định: ${formData.doctor}</td>
            </tr>
            <tr>
              <td>Thời gian nhận mẫu: ${formData.receiveDate ? formData.receiveDate.format('DD/MM/YYYY') : ""}</td>
              <td colspan="2">Thời gian trả kết quả: ${formData.resultDate ? formData.resultDate.format('DD/MM/YYYY') : ""}</td>
            </tr>
            <tr>
              <td>Loại mẫu: ${formData.sampleType}</td>
              <td colspan="2">Mã bệnh phẩm: ${formData.sampleCode}</td>
            </tr>
          </table>
        </div>


      <div class="section-title">II. KẾT QUẢ GIẢI TRÌNH TỰ GEN</div>
      
      <div class="section-title" style="margin-left: 20px;">1. Kết quả phân tích</div>
      
      <div class="section-title" style="margin-left: 40px;">1.1. Biến thể có ý nghĩa trên lâm sàng được Bộ Y tế Việt Nam/FDA chấp thuận</div>
      <table class="result-table">
        <thead>
        <tr>
          <th rowspan="2" style="width: 15%; vertical-align: middle;">Gen</th>
          <th rowspan="2" style="width: 25%; vertical-align: middle;">Biến thể</th>
          <th rowspan="2" style="width: 12%; vertical-align: middle;">VAF (%)</th>
          <th colspan="2" style="width: 48%; vertical-align: middle;">Liệu pháp điều trị</th>
        </tr>
        <tr>
          <th style="width: 24%;">Đáp ứng</th>
          <th style="width: 24%;">Kháng</th>
        </tr>
        </thead>
        <tbody>
        ${approvedVariants.length > 0 ? approvedVariants.map(variant => `
          <tr>
          <td>${variant.gene}</td>
          <td>${variant.variant}</td>
          <td class="center">${variant.vaf}</td>
          <td>${variant.responsive}</td>
          <td>${variant.resistant}</td>
          </tr>
        `).join('') : '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;"></td></tr>'}
        </tbody>
      </table>

      <div class="section-title" style="margin-left: 40px;">1.2. Biến thể có ý nghĩa trên lâm sàng theo các tổ chức khác</div>
      <table class="result-table">
        <thead>
        <tr>
          <th rowspan="2" style="width: 15%; vertical-align: middle;">Gen</th>
          <th rowspan="2" style="width: 25%; vertical-align: middle;">Biến thể</th>
          <th rowspan="2" style="width: 12%; vertical-align: middle;">VAF (%)</th>
          <th colspan="2" style="width: 48%; vertical-align: middle;">Liệu pháp điều trị</th>
        </tr>
        <tr>
          <th style="width: 24%;">Đáp ứng</th>
          <th style="width: 24%;">Kháng</th>
        </tr>
        </thead>
        <tbody>
        <tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;"></td></tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-left: 40px;">1.3. Biến thể có tiềm năng lâm sàng</div>
      <table class="result-table">
        <thead>
        <tr>
          <th rowspan="2" style="width: 15%; vertical-align: middle;">Gen</th>
          <th rowspan="2" style="width: 25%; vertical-align: middle;">Biến thể</th>
          <th rowspan="2" style="width: 12%; vertical-align: middle;">VAF (%)</th>
          <th colspan="2" style="width: 48%; vertical-align: middle;">Liệu pháp điều trị</th>
        </tr>
        <tr>
          <th style="width: 24%;">Đáp ứng</th>
          <th style="width: 24%;">Kháng</th>
        </tr>
        </thead>
        <tbody>
        ${potentialVariants.length > 0 ? potentialVariants.map(variant => `
          <tr>
          <td>${variant.gene}</td>
          <td>${variant.variant}</td>
          <td class="center">${variant.vaf}</td>
          <td>${variant.responsive}</td>
          <td>${variant.resistant}</td>
          </tr>
        `).join('') : '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;"></td></tr>'}
        </tbody>
      </table>

      <div class="section-title" style="margin-left: 40px;">1.4. Biến thể có tiềm năng nghiên cứu</div>
      <table class="result-table">
        <thead>
        <tr>
          <th rowspan="2" style="width: 15%; vertical-align: middle;">Gen</th>
          <th rowspan="2" style="width: 25%; vertical-align: middle;">Biến thể</th>
          <th rowspan="2" style="width: 12%; vertical-align: middle;">VAF (%)</th>
          <th colspan="2" style="width: 48%; vertical-align: middle;">Liệu pháp điều trị</th>
        </tr>
        <tr>
          <th style="width: 24%;">Đáp ứng</th>
          <th style="width: 24%;">Kháng</th>
        </tr>
        </thead>
        <tbody>
        <tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;"></td></tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-left: 40px;">1.5. Biến thể chưa rõ ý nghĩa trên lâm sàng</div>
      <table class="result-table">
        <thead>
        <tr>
          <th style="width: 15%;">Gen</th>
          <th style="width: 25%;">Biến thể</th>
          <th style="width: 20%;">Loại đột biến</th>
          <th style="width: 15%;">VAF (%)</th>
          <th style="width: 25%;">Phân loại</th>
        </tr>
        </thead>
        <tbody>
        ${unknownVariants.length > 0 ? unknownVariants.map(variant => `
          <tr>
          <td>${variant.gene}</td>
          <td>${variant.variant}</td>
          <td>${variant.mutationType}</td>
          <td class="center">${variant.vaf}</td>
          <td class="center">${variant.classification}</td>
          </tr>
        `).join('') : '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;"></td></tr>'}
        </tbody>
      </table>

      <p class="note"><strong>* Lưu ý:</strong> Các đột biến được khảo sát bao gồm: đột biến điểm, mất đoạn và chèn đoạn ngắn (dưới 20 nucleotide) trong vùng trình tự của những gen thuộc danh sách 177 gen khảo sát (danh sách trong phụ lục đính kèm). Các gen khác không được khảo sát trong báo cáo này. Kết quả này chỉ áp dụng trên mẫu bệnh phẩm đã nhận.</p>

      <div class="section-title">2. Thông số kỹ thuật</div>
      <div class="tech-specs">
        <table>
        <tr>
          <td>Hoá chất</td>
          <td>DNBSEQ-G400RS Sequencing Flow Cell, MGI</td>
        </tr>
        <tr>
          <td>Thiết bị</td>
          <td>Hệ thống giải trình tự gen thế hệ mới (Next Generation Sequencing) DNBSEQ-G400, MGI, Trung Quốc</td>
        </tr>
        <tr>
          <td>Kỹ thuật</td>
          <td>Massively parallel DNA sequencing by Next Generation Sequencing technology</td>
        </tr>
        <tr>
          <td>Tần suất phát hiện tối thiểu</td>
          <td>1%</td>
        </tr>
        <tr>
          <td>Độ đọc sâu trung bình</td>
          <td>Q30 (300x-500x)</td>
        </tr>
        </table>
      </div>

      <div class="signature-section">
        <p class="date-location">Hà Nội, ngày ${dayjs().format('DD')} tháng ${dayjs().format('MM')} năm ${dayjs().format('YYYY')}</p>
        
        <table class="signature-table">
        <tr>
          <td style="width: 50%;"><strong>Người thực hiện XN</strong></td>
          <td style="width: 50%;"><strong>Phụ trách chuyên môn</strong></td>
        </tr>
        <tr>
          <td style="height: 80px;"></td>
          <td style="height: 80px;"></td>
        </tr>
        </table>
      </div>
      </body>
      </html>
    `;
  };

  if (previewMode) {
    return (
      <Modal
        title="Xem trước báo cáo"
        open={visible}
        onCancel={() => {
          setPreviewMode(false);
          setFormData({
            patientName: '',
            patientId: '',
            age: '',
            gender: '',
            phone: '',
            address: '',
            clinicalDiagnosis: '',
            doctor: '',
            receiveDate: dayjs(),
            resultDate: dayjs(),
            sampleType: '',
            sampleCode: '',
          });
          onCancel();
        }}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setPreviewMode(false)}>
            Quay lại
          </Button>,
          <Button key="export" type="primary" icon={<FileWordOutlined />} onClick={handleExportWord}>
            Xuất file Word
          </Button>,
        ]}
      >
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ padding: '20px', backgroundColor: '#fff' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
              XÉT NGHIỆM XÁC ĐỊNH ĐỘT BIẾN GEN UNG THƯ CHO ĐIỀU TRỊ ĐÍCH
            </Title>

            <Title level={4}>I. THÔNG TIN BỆNH NHÂN</Title>
            <Row gutter={[16, 8]} style={{ marginBottom: '20px', background: '#fafafa', padding: '16px', borderRadius: '8px' }}>
              <Col span={8}><Text strong>Họ tên người bệnh:</Text> {formData.patientName || 'Chưa điền'}</Col>
              <Col span={8}><Text strong>Năm sinh/Tuổi:</Text> {formData.age || 'Chưa điền'}</Col>
              <Col span={8}><Text strong>Giới:</Text> {formData.gender || 'Chưa điền'}</Col>
              <Col span={8}><Text strong>Số điện thoại:</Text> {formData.phone || 'Chưa điền'}</Col>
              <Col span={8}><Text strong>Mã người bệnh:</Text> {formData.patientId || 'Chưa điền'}</Col>
              <Col span={8}><Text strong>Phòng khám:</Text> Chưa điền</Col>
              <Col span={12}><Text strong>Địa chỉ:</Text> {formData.address || 'Chưa điền'}</Col>
              <Col span={12}><Text strong>Bác sĩ chỉ định:</Text> {formData.doctor || 'Chưa điền'}</Col>
              <Col span={12}><Text strong>Chẩn đoán lâm sàng:</Text> {formData.clinicalDiagnosis || 'Chưa điền'}</Col>
              <Col span={12}></Col>
              <Col span={12}><Text strong>Thời gian nhận mẫu:</Text> {formData.receiveDate.format('DD/MM/YYYY')}</Col>
              <Col span={12}><Text strong>Thời gian trả kết quả:</Text> {formData.resultDate.format('DD/MM/YYYY')}</Col>
              <Col span={12}><Text strong>Loại mẫu:</Text> {formData.sampleType || 'Chưa điền'}</Col>
              <Col span={12}><Text strong>Mã bệnh phẩm:</Text> {formData.sampleCode || 'Chưa điền'}</Col>
            </Row>

            <Title level={4}>II. KẾT QUẢ GIẢI TRÌNH TỰ GEN</Title>

            <Title level={5}>1. Kết quả phân tích</Title>

            <Title level={5} style={{ marginLeft: '20px' }}>a. Biến thể có ý nghĩa trên lâm sàng được Bộ Y tế Việt Nam/FDA chấp thuận</Title>
            <Table
              columns={columns}
              dataSource={approvedVariants}
              pagination={false}
              size="small"
              style={{ marginBottom: '20px' }}
            />

            <Title level={5} style={{ marginLeft: '20px' }}>b. Biến thể có ý nghĩa trên lâm sàng theo các tổ chức khác</Title>
            <Table
              columns={columns}
              dataSource={[]}
              pagination={false}
              size="small"
              locale={{ emptyText: '' }}
              style={{ marginBottom: '20px' }}
            />

            <Title level={5} style={{ marginLeft: '20px' }}>c. Biến thể có tiềm năng lâm sàng</Title>
            <Table
              columns={columns}
              dataSource={potentialVariants}
              pagination={false}
              size="small"
              style={{ marginBottom: '20px' }}
            />

            <Title level={5} style={{ marginLeft: '20px' }}>d. Biến thể có tiềm năng nghiên cứu</Title>
            <Table
              columns={columns}
              dataSource={[]}
              pagination={false}
              size="small"
              locale={{ emptyText: '' }}
              style={{ marginBottom: '20px' }}
            />

            <Title level={5} style={{ marginLeft: '20px' }}>e. Biến thể chưa rõ ý nghĩa trên lâm sàng</Title>
            <Table
              columns={unknownColumns}
              dataSource={unknownVariants}
              pagination={false}
              size="small"
              style={{ marginBottom: '20px' }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Thông tin báo cáo xét nghiệm"
      open={visible}
      onCancel={() => {
        setFormData({
          patientName: '',
          patientId: '',
          age: '',
          gender: '',
          phone: '',
          address: '',
          clinicalDiagnosis: '',
          doctor: '',
          receiveDate: dayjs(),
          resultDate: dayjs(),
          sampleType: '',
          sampleCode: '',
        });
        onCancel();
      }}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="preview" type="primary" icon={<EyeOutlined />} onClick={() => setPreviewMode(true)}>
          Xem trước
        </Button>,
      ]}
    >
      <Form layout="vertical" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ tên bệnh nhân" required>
              <Input
                value={formData.patientName}
                onChange={(e) => handleFormChange('patientName', e.target.value)}
                placeholder="Nhập họ tên bệnh nhân"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mã bệnh nhân" required>
              <Input
                value={formData.patientId}
                onChange={(e) => handleFormChange('patientId', e.target.value)}
                placeholder="Nhập mã bệnh nhân"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tuổi">
              <Input
                value={formData.age}
                onChange={(e) => handleFormChange('age', e.target.value)}
                placeholder="Nhập tuổi"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Giới tính">
              <Select
                value={formData.gender}
                onChange={(value) => handleFormChange('gender', value)}
                placeholder="Chọn giới tính"
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Số điện thoại">
              <Input
                value={formData.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bác sĩ chỉ định">
              <Input
                value={formData.doctor}
                onChange={(e) => handleFormChange('doctor', e.target.value)}
                placeholder="Nhập tên bác sĩ"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Địa chỉ">
          <Input.TextArea
            value={formData.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
            placeholder="Nhập địa chỉ"
            rows={2}
          />
        </Form.Item>

        <Form.Item label="Chẩn đoán lâm sàng">
          <Input.TextArea
            value={formData.clinicalDiagnosis}
            onChange={(e) => handleFormChange('clinicalDiagnosis', e.target.value)}
            placeholder="Nhập chẩn đoán lâm sàng"
            rows={2}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Thời gian nhận mẫu">
              <DatePicker
                value={formData.receiveDate}
                onChange={(date) => handleFormChange('receiveDate', date)}
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian trả kết quả">
              <DatePicker
                value={formData.resultDate}
                onChange={(date) => handleFormChange('resultDate', date)}
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Loại mẫu">
              <Input
                value={formData.sampleType}
                onChange={(e) => handleFormChange('sampleType', e.target.value)}
                placeholder="Nhập loại mẫu"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mã bệnh phẩm">
              <Input
                value={formData.sampleCode}
                onChange={(e) => handleFormChange('sampleCode', e.target.value)}
                placeholder="Nhập mã bệnh phẩm"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ExportModal;