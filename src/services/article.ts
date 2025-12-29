import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Article {
    Index2?: number;
    PMID?: number;
    Article_citation?: string;
    Heading_title?: string;
    Authors?: string;
    Affiliation?: string;
    Identifiers?: string;
    Abstract?: string;
    Free_label?: string;
    Category?: number;
}

export interface ArticleResponse {
    success: boolean;
    data: Article[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ParsedIdentifiers {
    pmid?: string;
    doi?: string;
    pmcid?: string;
}

/**
 * Parse Identifiers string to extract PMID, DOI, PMCID
 * Example: "PMID: 20093296 PMCID: PMC7564956 DOI: 10.3390/cancers12092415"
 */
export const parseIdentifiers = (identifiers?: string): ParsedIdentifiers => {
    if (!identifiers) return {};

    const result: ParsedIdentifiers = {};

    // Extract PMID
    const pmidMatch = identifiers.match(/PMID:\s*(\d+)/i);
    if (pmidMatch) {
        result.pmid = pmidMatch[1];
    }

    // Extract DOI
    const doiMatch = identifiers.match(/DOI:\s*([^\s]+)/i);
    if (doiMatch) {
        result.doi = doiMatch[1];
    }

    // Extract PMCID
    const pmcidMatch = identifiers.match(/PMCID:\s*(PMC\d+)/i);
    if (pmcidMatch) {
        result.pmcid = pmcidMatch[1];
    }

    return result;
};

/**
 * Generate article URLs based on identifiers
 */
export const generateArticleUrls = (identifiers: ParsedIdentifiers) => {
    const urls: { type: string; url: string; label: string }[] = [];

    if (identifiers.pmid) {
        urls.push({
            type: 'pmid',
            url: `https://pubmed.ncbi.nlm.nih.gov/${identifiers.pmid}/`,
            label: 'PubMed'
        });
    }

    if (identifiers.doi) {
        urls.push({
            type: 'doi',
            url: `https://doi.org/${identifiers.doi}`,
            label: 'DOI'
        });
    }

    if (identifiers.pmcid) {
        urls.push({
            type: 'pmcid',
            url: `https://www.ncbi.nlm.nih.gov/pmc/articles/${identifiers.pmcid}/`,
            label: 'PMC'
        });
    }

    return urls;
};

export const articleService = {
    /**
     * Get articles by cancer type
     */
    getByType: async (
        type: string,
        page = 1,
        limit = 10,
        search = '',
        category = 'All'
    ): Promise<ArticleResponse> => {
        const response = await axios.get<ArticleResponse>(
            `${API_BASE_URL}/articles/${type}`,
            {
                params: { page, limit, search, category }
            }
        );
        return response.data;
    },

    /**
     * Get available cancer types
     */
    getAvailableTypes: async (): Promise<string[]> => {
        const response = await axios.get<{ success: boolean; types: string[] }>(
            `${API_BASE_URL}/articles/types`
        );
        return response.data.types;
    },

    /**
     * Get single article by ID
     */
    getArticleById: async (
        type: string,
        id: string
    ): Promise<ArticleResponse> => {
        const response = await axios.get<ArticleResponse>(
            `${API_BASE_URL}/articles/${type}/${id}`
        );
        return response.data;
    }
};

export default articleService;
