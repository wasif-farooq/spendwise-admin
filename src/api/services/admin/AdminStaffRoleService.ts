import { apiClient } from '../../client/apiClient';
import type { StaffRole } from '@/store/types/admin.types';

export const AdminStaffRoleService = {
    getAll: async (): Promise<StaffRole[]> => {
        const response = await apiClient.get<StaffRole[]>('/admin/staff-roles');
        return response.data;
    },

    getById: async (id: number): Promise<StaffRole> => {
        const response = await apiClient.get<StaffRole>(`/admin/staff-roles/${id}`);
        return response.data;
    },

    create: async (data: Omit<StaffRole, 'id'>): Promise<StaffRole> => {
        const response = await apiClient.post<StaffRole>('/admin/staff-roles', data);
        return response.data;
    },

    updatePermissions: async (id: number, permissions: Record<string, string[]>): Promise<void> => {
        await apiClient.put(`/admin/staff-roles/${id}/permissions`, { permissions });
    },

    update: async (id: number, data: Partial<StaffRole>): Promise<StaffRole> => {
        const response = await apiClient.put<StaffRole>(`/admin/staff-roles/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/admin/staff-roles/${id}`);
    }
};
