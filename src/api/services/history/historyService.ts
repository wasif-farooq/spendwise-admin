import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './historyMockData.json';
import type {
    ModificationHistoryEntry,
    ModificationHistoryFilters
} from '@/store/types/history.types';

// Register mock data
mockAdapter.registerMockData('/history', mockData);

class HistoryService {
    async getHistory(filters?: ModificationHistoryFilters): Promise<ModificationHistoryEntry[]> {
        const response = await apiClient.get<ModificationHistoryEntry[]>('/history', { params: filters });
        return response.data;
    }

    async getEntityHistory(type: string, id: string): Promise<ModificationHistoryEntry[]> {
        const response = await apiClient.get<ModificationHistoryEntry[]>(`/history/entity/${type}/${id}`);
        return response.data;
    }

    async getActorHistory(userId: string): Promise<ModificationHistoryEntry[]> {
        const response = await apiClient.get<ModificationHistoryEntry[]>(`/history/actor/${userId}`);
        return response.data;
    }
}

export const historyService = new HistoryService();
