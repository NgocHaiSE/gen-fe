import request from '../utils/request';

export interface CancerStatisticsResponse {
    success: boolean;
    data?: {
        total: number;
        byOrgan: {
            lung: number;
            breast: number;
            colorectal: number;
            liver: number;
            thyroid: number;
        };
        details: Array<{
            organ: 'lung' | 'breast' | 'colorectal' | 'liver' | 'thyroid';
            name: string;
            count: number;
            percentage: string;
        }>;
    };
    errorCode?: string;
    message?: string;
}

const statisticsService = {
    getCancerStatistics: async (): Promise<CancerStatisticsResponse> => {
        const response = await request.get('/statistics/cancer-cases');
        return response.data || response;
    }
};

export default statisticsService;
