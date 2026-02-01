import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './organizationsMockData.json';
import type { AdminOrganization } from '@/store/types/admin.types';

// Register mock data
mockAdapter.registerMockData('/admin/organizations', mockData);

class AdminOrganizationService {
    async getAllOrganizations(): Promise<AdminOrganization[]> {
        const response = await apiClient.get<AdminOrganization[]>('/organizations');
        return response.data;
    }

    async getById(id: string): Promise<AdminOrganization> {
        const response = await apiClient.get<AdminOrganization>(`/organizations/${id}`);
        return response.data;
    }

    async create(data: Partial<AdminOrganization>): Promise<AdminOrganization> {
        const response = await apiClient.post<AdminOrganization>('/organizations', data);
        return response.data;
    }

    async update(id: string, data: Partial<AdminOrganization>): Promise<AdminOrganization> {
        const response = await apiClient.put<AdminOrganization>(`/organizations/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/organizations/${id}`);
    }

    async toggleOrgStatus(id: string): Promise<AdminOrganization> {
        const response = await apiClient.patch<AdminOrganization>(`/organizations/${id}/toggle-status`);
        return response.data;
    }

    async getMembers(orgId: string): Promise<any[]> {
        const response = await apiClient.get<any[]>(`/organizations/${orgId}/members`);
        return response.data;
    }

    async removeMember(orgId: string, memberId: string): Promise<void> {
        await apiClient.delete(`/organizations/${orgId}/members/${memberId}`);
    }
}

export const adminOrganizationService = new AdminOrganizationService();
