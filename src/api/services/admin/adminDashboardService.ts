import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './dashboardMockData.json';
import type { AdminDashboardMetrics } from '@/store/types/admin.types';

// Register mock data
mockAdapter.registerMockData('/admin/dashboard/metrics', mockData);

class AdminDashboardService {
    async getMetrics(): Promise<AdminDashboardMetrics> {
        const response = await apiClient.get<AdminDashboardMetrics>('/dashboard/metrics');
        return response.data;
    }
}

export const adminDashboardService = new AdminDashboardService();
