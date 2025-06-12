import Icon, { InfoCircleOutlined } from '@ant-design/icons';

const listMenu = [
  {
    label: 'Hành chính',
    key: 'patient_info',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Tiền sử',
    key: 'medical_history',
    icon: <Icon component={() => <img className="icon" src="/icons/categories/history.png" />} />,
  },
  {
    label: 'Bệnh sử',
    key: 'disease_history',
    icon: (
      <Icon
        component={() => <img className="icon" src="/icons/categories/medical-history.png" />}
      />
    ),
  },
  {
    label: 'Khám lâm sàng',
    key: 'clinical_examination',
    icon: <Icon component={() => <img className="icon" src="/icons/categories/code.png" />} />,
  },
  {
    label: 'Cận lâm sàng',
    key: 'subclinical',
    icon: <Icon component={() => <img className="icon" src="/icons/categories/exam.png" />} />,
  },
  {
    label: 'Phương pháp điều trị',
    key: 'treatments',
    icon: (
      <Icon component={() => <img className="icon" src="/icons/categories/hydrotherapy.png" />} />
    ),
  },
  {
    label: 'Đánh giá đáp ứng điều trị',
    key: 'assessment_response_treatment',
    icon: (
      <Icon component={() => <img className="icon" src="/icons/categories/hydrotherapy.png" />} />
    ),
  },
  {
    label: 'Xét nghiệm di truyền',
    key: 'gen_test',
    icon: <Icon component={() => <img className="icon" src="/icons/categories/test.png" />} />,
  },
];

export default listMenu;
