import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './organizationMockData.json';
import type { Organization, OrganizationSettings, UpdateOrganizationDTO } from '@/store/types/organization.types';

// Register mock data
mockAdapter.registerMockData('/organization', mockData.organization);
mockAdapter.registerMockData('/organization/settings', mockData.settings);

class OrganizationService {
    async getOrganization(): Promise<Organization> {
        const response = await apiClient.get<Organization>('/organization');
        return response.data;
    }

    async updateOrganization(data: UpdateOrganizationDTO): Promise<Organization> {
        const response = await apiClient.put<Organization>('/organization', data);
        return response.data;
    }

    async uploadLogo(file: File): Promise<{ logoUrl: string }> {
        const formData = new FormData();
        formData.append('logo', file);
        const response = await apiClient.post<{ logoUrl: string }>('/organization/logo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    async getOrganizationSettings(): Promise<OrganizationSettings> {
        const response = await apiClient.get<OrganizationSettings>('/organization/settings');
        return response.data;
    }

    async updateOrganizationSettings(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings> {
        const response = await apiClient.put<OrganizationSettings>('/organization/settings', settings);
        return response.data;
    }

    async deleteOrganization(password: string): Promise<void> {
        await apiClient.post('/organization/delete', { password });
    }
}

export const organizationService = new OrganizationService();
