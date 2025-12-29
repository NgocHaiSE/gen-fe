import {
    getMutationEndpoint,
    getDrugsInfoEndpoint,
    searchDrugsInfoEndpoint,
    getApprovedDrugsEndpoint,
    getNotApprovedDrugsEndpoint,
    getFDADrugsEndpoint
} from '@/config/api';

// Gene Mutation Data
export interface MutationItem {
    id: string;
    gene_name: string;
    alteration_name: string;
    oncogenic: string;
    mutation_effect: string;
    articles: string[];
}

export interface MutationResponse {
    mutationModels: any[];
    totalPages: number;
}

export const getMutationData = async (page = 1, limit = 10): Promise<MutationResponse> => {
    const response = await fetch(getMutationEndpoint(page, limit));
    return response.json();
};

// Drug Information Data
export interface DrugInfoItem {
    _id: string;
    cancer_main_type: string;
    cancer_sub_type: string;
    gene: string;
    alteration_name: string;
    level: string;
    drug: string[];
    articles: any[];
}

export interface DrugInfoResponse {
    drugInformationModels: DrugInfoItem[];
    totalPages: number;
}

export const getDrugInfoData = async (page = 1, limit = 10): Promise<DrugInfoResponse> => {
    const response = await fetch(getDrugsInfoEndpoint(page, limit));
    return response.json();
};

export interface SearchParams {
    geneName?: string;
    drugName?: string;
    alterationName?: string;
    cancerMainType?: string;
    cancerSubType?: string;
}

export const searchDrugInfo = async (page = 1, limit = 10, params: SearchParams): Promise<{ data: DrugInfoItem[], totalPages: number }> => {
    const response = await fetch(searchDrugsInfoEndpoint(page, limit), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    return response.json();
};

// Drug Therapy Data (from external API)
export interface DrugTherapyMetadata {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface ApprovedDrugItem {
    _id: string;
    noDKHetHan?: string;
    noDKConHan?: string;
    tenThuoc: string;
    hoatChat?: string;
    nongDoHamLuong?: string;
    congTyDK?: string;
    nuocDK?: string;
    congTySX?: string;
    nuocSX?: string;
    soDK?: string;
    dotCap?: number;
    ngayBD?: string;
    ngayHH?: string;
    dongGoi?: string;
    trangThai?: string;
    tuThue?: string;
}

export interface FDADrugItem {
    _id: string;
    tenThuoc: string;
    congTy?: string;
    ngayDuyet?: string;
    chiDinh?: string;
    noiDung?: string;
}

export const getApprovedDrugs = async (page = 1): Promise<{ data: any[], metadata: any }> => {
    const response = await fetch(getApprovedDrugsEndpoint(page));
    return response.json();
};

export const getNotApprovedDrugs = async (page = 1): Promise<{ data: any[], metadata: any }> => {
    const response = await fetch(getNotApprovedDrugsEndpoint(page));
    return response.json();
};

export const getFDADrugs = async (page = 1): Promise<{ data: any[], metadata: any }> => {
    const response = await fetch(getFDADrugsEndpoint(page));
    return response.json();
};

export default {
    getMutationData,
    getDrugInfoData,
    searchDrugInfo,
    getApprovedDrugs,
    getNotApprovedDrugs,
    getFDADrugs,
};
