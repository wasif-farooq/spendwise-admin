import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './usersMockData.json';
import type { AdminUser } from '@/store/types/admin.types';

// Register mock data
mockAdapter.registerMockData('/admin/users', mockData);

class AdminUserService {
    async getAllUsers(): Promise<AdminUser[]> {
        const response = await apiClient.get<AdminUser[]>('/users');
        return response.data;
    }

    async toggleUserStatus(id: string): Promise<AdminUser> {
        const response = await apiClient.patch<AdminUser>(`/users/${id}/toggle-status`);
        return response.data;
    }
}

export const adminUserService = new AdminUserService();
