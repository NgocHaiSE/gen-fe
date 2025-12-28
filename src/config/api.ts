// API Server Configuration - reads from .env file
export const API_SERVER = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api';

// Top 20 Gene Endpoints
export const getTop20GeneEndpoint = (type: string): string => {
    const typeMap: Record<string, string> = {
        'lung-cancer': `${API_SERVER}/mutation-lung-gene/top20`,
        'liver-cancer': `${API_SERVER}/mutation-liver-gene/top20`,
        'breast-cancer': `${API_SERVER}/mutation-breast-gene/top20`,
        'thyroid-cancer': `${API_SERVER}/mutation-thyroid-gene/top20`,
        'colorectal-cancer': `${API_SERVER}/mutation-colorectal-gene/top20`,
    };
    return typeMap[type] || '';
};

// Mutated Gene Endpoints (paginated)
export const getMutatedGeneEndpoint = (type: string, page = 1, limit = 10): string => {
    const typeMap: Record<string, string> = {
        'lung-cancer': `${API_SERVER}/mutation-lung-gene`,
        'liver-cancer': `${API_SERVER}/mutation-liver-gene`,
        'breast-cancer': `${API_SERVER}/mutation-breast-gene`,
        'thyroid-cancer': `${API_SERVER}/mutation-thyroid-gene`,
        'colorectal-cancer': `${API_SERVER}/mutation-colorectal-gene`,
    };
    const base = typeMap[type];
    return base ? `${base}?page=${page}&limit=${limit}` : '';
};

// Normal Gene Endpoints (paginated) - uses 'normal-' prefix
export const getNormalGeneEndpoint = (type: string, page = 1, limit = 10): string => {
    const typeMap: Record<string, string> = {
        'lung-cancer': `${API_SERVER}/normal-lung-gene`,
        'liver-cancer': `${API_SERVER}/normal-liver-gene`,
        'breast-cancer': `${API_SERVER}/normal-breast-gene`,
        'thyroid-cancer': `${API_SERVER}/normal-thyroid-gene`,
        'colorectal-cancer': `${API_SERVER}/normal-colorectal-gene`,
    };
    const base = typeMap[type];
    return base ? `${base}?page=${page}&limit=${limit}` : '';
};

// Drug Information Endpoints
export const getDrugsInfoEndpoint = (page = 1, limit = 10): string => {
    return `${API_SERVER}/drugs-information?page=${page}&limit=${limit}`;
};

export const searchDrugsInfoEndpoint = (page = 1, limit = 10): string => {
    return `${API_SERVER}/drugs-information/search?page=${page}&limit=${limit}`;
};
