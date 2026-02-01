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

    async toggleOrgStatus(id: string): Promise<AdminOrganization> {
        const response = await apiClient.patch<AdminOrganization>(`/organizations/${id}/toggle-status`);
        return response.data;
    }
}

export const adminOrganizationService = new AdminOrganizationService();
