import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './transactionsMockData.json';
import type { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '@/store/types/transactions.types';

// Register mock data
mockAdapter.registerMockData('/transactions', mockData);

class TransactionsService {
    async getTransactions(filters?: {
        category?: string;
        type?: 'income' | 'expense' | 'all';
        dateRange?: { start: string; end: string };
    }): Promise<Transaction[]> {
        const response = await apiClient.get<Transaction[]>('/transactions', { params: filters });
        return response.data;
    }

    async getTransactionById(id: string): Promise<Transaction> {
        const response = await apiClient.get<Transaction>(`/transactions/${id}`);
        return response.data;
    }

    async createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
        const response = await apiClient.post<Transaction>('/transactions', data);
        return response.data;
    }

    async updateTransaction(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
        const response = await apiClient.put<Transaction>(`/transactions/${id}`, data);
        return response.data;
    }

    async deleteTransaction(id: string): Promise<void> {
        await apiClient.delete(`/transactions/${id}`);
    }

    async uploadReceipt(id: string, file: File): Promise<{ receiptUrl: string }> {
        const formData = new FormData();
        formData.append('receipt', file);
        const response = await apiClient.post<{ receiptUrl: string }>(`/transactions/${id}/receipt`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    async getTransactionStats(): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }> {
        const transactions = await this.getTransactions();
        const totalIncome = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }
}

export const transactionsService = new TransactionsService();
