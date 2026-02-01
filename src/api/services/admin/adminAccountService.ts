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

    async flagAccount(id: string): Promise<AdminAccount> {
        const response = await apiClient.patch<AdminAccount>(`/accounts/${id}/flag`);
        return response.data;
    }
}

export const adminAccountService = new AdminAccountService();
