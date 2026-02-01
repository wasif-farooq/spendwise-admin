import { apiClient } from '../../client/apiClient';
import type { Staff } from '@/store/types/admin.types';

export const AdminStaffService = {
    getAll: async (): Promise<Staff[]> => {
        const response = await apiClient.get<Staff[]>('/admin/staff');
        return response.data;
    },

    getById: async (id: string): Promise<Staff> => {
        const response = await apiClient.get<Staff>(`/admin/staff/${id}`);
        return response.data;
    },

    updateRoles: async (staffId: string, roleIds: number[]): Promise<void> => {
        await apiClient.put(`/admin/staff/${staffId}/roles`, { roleIds });
    },

    invite: async (data: { email: string; roleId: number }): Promise<void> => {
        await apiClient.post('/admin/staff/invite', data);
    },

    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/staff/${id}`);
    }
};
