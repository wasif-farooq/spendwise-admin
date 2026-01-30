import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './rolesMockData.json';
import type { Role, CreateRoleDTO, UpdateRoleDTO } from '@/store/types/roles.types';

// Register mock data
mockAdapter.registerMockData('/roles', mockData);

class RolesService {
    async getRoles(): Promise<Role[]> {
        const response = await apiClient.get<Role[]>('/roles');
        return response.data;
    }

    async getRoleById(id: string): Promise<Role> {
        const response = await apiClient.get<Role>(`/roles/${id}`);
        return response.data;
    }

    async createRole(data: CreateRoleDTO): Promise<Role> {
        const response = await apiClient.post<Role>('/roles', data);
        return response.data;
    }

    async updateRole(id: string, data: UpdateRoleDTO): Promise<Role> {
        const response = await apiClient.put<Role>(`/roles/${id}`, data);
        return response.data;
    }

    async deleteRole(id: string): Promise<void> {
        await apiClient.delete(`/roles/${id}`);
    }

    async duplicateRole(id: string): Promise<Role> {
        const response = await apiClient.post<Role>(`/roles/${id}/duplicate`);
        return response.data;
    }
}

export const rolesService = new RolesService();
