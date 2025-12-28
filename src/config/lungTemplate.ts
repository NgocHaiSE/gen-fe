
export const LUNG_TEMPLATE = {
    typeHealthRecord: 'lung-record',
    generalInfo: [
        {
            name: 'II. TIỀN SỬ',
            key: 'medical_history',
            listQuestions: [
                {
                    id: 'smoking_history',
                    label: 'Hút thuốc',
                    type: 'group',
                    children: [
                        { id: 'smoking_active', label: 'Hút thuốc lá chủ động', type: 'checkbox' },
                        { id: 'smoking_lao', label: 'Hút thuốc lào', type: 'checkbox' },
                        { id: 'smoking_passive', label: 'Hút thuốc lá bị động', type: 'checkbox' },
                        { id: 'smoking_pack_year', label: 'Số bao/năm', type: 'number', unit: 'bao/năm' },
                        { id: 'smoking_years', label: 'Số năm hút', type: 'number', unit: 'năm' },
                    ]
                },
                {
                    id: 'lung_diseases',
                    label: 'Các bệnh lý phổi',
                    type: 'group',
                    children: [
                        { id: 'copd', label: 'COPD', type: 'checkbox' },
                        { id: 'pneumonia', label: 'Viêm phổi', type: 'checkbox' },
                        { id: 'asthma', label: 'Hen phế quản', type: 'checkbox' },
                        { id: 'bronchiectasis', label: 'Giãn phế quản', type: 'checkbox' },
                        { id: 'pleural_effusion', label: 'Tràn dịch/Tràn khí màng phổi', type: 'checkbox' },
                    ]
                },
                {
                    id: 'family_history',
                    label: 'Tiền sử gia đình mắc ung thư phổi',
                    type: 'group',
                    children: [
                        { id: 'family_has_cancer', label: 'Có người thân mắc', type: 'checkbox' },
                        { id: 'family_relationship', label: 'Quan hệ với bệnh nhân', type: 'text' },
                    ]
                }
            ]
        },
        {
            name: 'III. BỆNH SỬ',
            key: 'disease_history',
            listQuestions: [
                { id: 'diagnosis_year', label: 'Năm chẩn đoán', type: 'number' },
                {
                    id: 'first_symptoms',
                    label: 'Triệu chứng khởi phát',
                    type: 'group',
                    children: [
                        { id: 'symptom_cough', label: 'Ho', type: 'checkbox' },
                        { id: 'symptom_blood', label: 'Ho ra máu', type: 'checkbox' },
                        { id: 'symptom_chest_pain', label: 'Đau ngực', type: 'checkbox' },
                        { id: 'symptom_dyspnea', label: 'Khó thở', type: 'checkbox' },
                    ]
                },
                { id: 'duration_before_diagnosis', label: 'Thời gian diễn biến (ngày)', type: 'number' }
            ]
        },
        {
            name: 'IV. KHÁM LÂM SÀNG',
            key: 'clinical_exam',
            listQuestions: [
                { id: 'weight', label: 'Cân nặng (kg)', type: 'number' },
                { id: 'height', label: 'Chiều cao (cm)', type: 'number' },
                { id: 'ecog_score', label: 'Đánh giá ECOG (PS)', type: 'select', options: ['0', '1', '2', '3', '4'] }
            ]
        }
    ]
};
