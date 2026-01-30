import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './accountsMockData.json';
import type { Account, CreateAccountDTO, UpdateAccountDTO } from '@/store/types/accounts.types';

// Register mock data
mockAdapter.registerMockData('/accounts', mockData);

class AccountsService {
    async getAccounts(): Promise<Account[]> {
        const response = await apiClient.get<Account[]>('/accounts');
        return response.data;
    }

    async getAccountById(id: string): Promise<Account> {
        const response = await apiClient.get<Account>(`/accounts/${id}`);
        return response.data;
    }

    async createAccount(data: CreateAccountDTO): Promise<Account> {
        const response = await apiClient.post<Account>('/accounts', data);
        return response.data;
    }

    async updateAccount(id: string, data: UpdateAccountDTO): Promise<Account> {
        const response = await apiClient.put<Account>(`/accounts/${id}`, data);
        return response.data;
    }

    async deleteAccount(id: string): Promise<void> {
        await apiClient.delete(`/accounts/${id}`);
    }

    async getAccountBalance(id: string): Promise<{ balance: number }> {
        const response = await apiClient.get<{ balance: number }>(`/accounts/${id}/balance`);
        return response.data;
    }

    async getTotalBalance(): Promise<{ total: number }> {
        const accounts = await this.getAccounts();
        const total = accounts.reduce((sum, account) => sum + account.balance, 0);
        return { total };
    }
}

export const accountsService = new AccountsService();
