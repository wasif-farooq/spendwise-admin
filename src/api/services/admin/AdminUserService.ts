import { apiClient } from '../../client/apiClient';
import type { AdminUser } from '@/store/types/admin.types';

export const AdminUserService = {
    getAll: async (): Promise<AdminUser[]> => {
        const response = await apiClient.get<AdminUser[]>('/admin/users');
        return response.data;
    },

    getById: async (id: string): Promise<AdminUser> => {
        const response = await apiClient.get<AdminUser>(`/admin/users/${id}`);
        return response.data;
    },

    create: async (data: Partial<AdminUser>): Promise<AdminUser> => {
        const response = await apiClient.post<AdminUser>('/admin/users', data);
        return response.data;
    },

    update: async (id: string, data: Partial<AdminUser>): Promise<AdminUser> => {
        const response = await apiClient.put<AdminUser>(`/admin/users/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/users/${id}`);
    },

    toggleStatus: async (id: string): Promise<AdminUser> => {
        const response = await apiClient.patch<AdminUser>(`/admin/users/${id}/status`);
        return response.data;
    }
};
