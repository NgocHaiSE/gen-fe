
// Mock service for HealthRecord until backend is ready or proxy is set up

export interface Patient {
    id: string;
    name: string;
    dob: string;
    gender: string;
    diagnosis: string;
    stage: string;
    lastUpdate: string;
}

const MOCK_PATIENTS: Patient[] = [
    {
        id: 'P001',
        name: 'Nguyễn Văn A',
        dob: '1980-01-01',
        gender: 'Nam',
        diagnosis: 'Ung thư phổi',
        stage: 'IIA',
        lastUpdate: '2025-01-10'
    },
    {
        id: 'P002',
        name: 'Trần Thị B',
        dob: '1975-05-15',
        gender: 'Nữ',
        diagnosis: 'Ung thư phổi',
        stage: 'IIIB',
        lastUpdate: '2025-02-20'
    },
    {
        id: 'P003',
        name: 'Lê Văn C',
        dob: '1960-12-20',
        gender: 'Nam',
        diagnosis: 'Ung thư gan',
        stage: 'IV',
        lastUpdate: '2025-03-05'
    }
];

export const healthRecordService = {
    getAllByType: async (type: string, _page = 1, _limit = 10) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = MOCK_PATIENTS;
        if (type === 'lung-cancer') {
            filtered = MOCK_PATIENTS.filter(p => p.diagnosis === 'Ung thư phổi');
        } else if (type === 'liver-cancer') {
            filtered = MOCK_PATIENTS.filter(p => p.diagnosis === 'Ung thư gan');
        }

        return {
            data: filtered,
            total: filtered.length,
            success: true
        };
    },

    getById: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_PATIENTS.find(p => p.id === id);
    },

    delete: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log('Deleted patient', id);
        return { success: true };
    }
};
