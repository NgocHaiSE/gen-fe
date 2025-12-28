import request from '../utils/request';

export interface Collection {
    _id: string;
    collectionName: string;
    description?: string;
    tags?: string[];
    testCases?: any[];
    testCasesCount?: number;
    createAt?: string;
    updateAt?: string;
}

export interface CreateCollectionPayload {
    collectionName: string;
    description?: string;
    tags?: string[];
    userId?: string;
}

class CollectionsService {
    async create(body: CreateCollectionPayload) {
        const response = await request.post('/case-collection/create', body);
        return response.data;
    }

    async myCollections() {
        const response = await request.get<{ success: boolean; data: Collection[]; total: number; message?: string }>(
            '/case-collection/my-collections'
        );
        return response.data;
    }

    async getOne(id: string) {
        const response = await request.get<{ success: boolean; data: Collection }>(`/case-collection/${id}`);
        return response.data;
    }

    async update(id: string, body: { collectionName?: string; description?: string; tags?: string[] }) {
        const response = await request.put(`/case-collection/${id}`, body);
        return response.data;
    }

    async delete(id: string) {
        const response = await request.delete(`/case-collection/${id}`);
        return response.data;
    }

    async addCase(id: string, body: { testCaseId: string; note?: string }) {
        const response = await request.post(`/case-collection/${id}/add-case`, body);
        return response.data;
    }

    async removeCase(id: string, testCaseId: string) {
        const response = await request.delete(`/case-collection/${id}/remove-case/${testCaseId}`);
        return response.data;
    }

    async updateNote(id: string, testCaseId: string, note: string) {
        const response = await request.put(`/case-collection/${id}/update-note/${testCaseId}`, { note });
        return response.data;
    }

    async batchAdd(collectionId: string, testCaseIds: string[]) {
        const response = await request.post('/case-collection/batch-add', { collectionId, testCaseIds });
        return response.data;
    }

    async search(params: { keyword?: string; tag?: string }) {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        const response = await request.get(`/case-collection/search?${queryString}`);
        return response.data;
    }
}

export default new CollectionsService();
