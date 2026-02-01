import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './accountsMockData.json';
import type { AdminAccount } from '@/store/types/admin.types';

// Register mock data
mockAdapter.registerMockData('/admin/accounts', mockData);

class AdminAccountService {
    async getAllAccounts(): Promise<AdminAccount[]> {
        const response = await apiClient.get<AdminAccount[]>('/accounts');
        return response.data;
    }

    async getById(id: string): Promise<AdminAccount> {
        const response = await apiClient.get<AdminAccount>(`/accounts/${id}`);
        return response.data;
    }

    async create(data: Partial<AdminAccount>): Promise<AdminAccount> {
        const response = await apiClient.post<AdminAccount>('/accounts', data);
        return response.data;
    }

    async update(id: string, data: Partial<AdminAccount>): Promise<AdminAccount> {
        const response = await apiClient.put<AdminAccount>(`/accounts/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/accounts/${id}`);
    }

    async flagAccount(id: string): Promise<AdminAccount> {
        const response = await apiClient.patch<AdminAccount>(`/accounts/${id}/flag`);
        return response.data;
    }
}

export const adminAccountService = new AdminAccountService();
