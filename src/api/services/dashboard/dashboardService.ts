import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './dashboardMockData.json';
import type { DashboardData, DashboardStats, SpendingByCategory, IncomeVsExpense, RecentActivity } from '@/store/types/dashboard.types';

// Register mock data
mockAdapter.registerMockData('/dashboard', mockData);
mockAdapter.registerMockData('/dashboard/stats', mockData.stats);
mockAdapter.registerMockData('/dashboard/spending-by-category', mockData.spendingByCategory);
mockAdapter.registerMockData('/dashboard/income-vs-expense', mockData.incomeVsExpense);
mockAdapter.registerMockData('/dashboard/recent-activity', mockData.recentActivity);

class DashboardService {
    async getDashboardData(): Promise<DashboardData> {
        const response = await apiClient.get<DashboardData>('/dashboard');
        return response.data;
    }

    async getStats(): Promise<DashboardStats> {
        const response = await apiClient.get<DashboardStats>('/dashboard/stats');
        return response.data;
    }

    async getSpendingByCategory(period?: 'week' | 'month' | 'year'): Promise<SpendingByCategory[]> {
        const response = await apiClient.get<SpendingByCategory[]>('/dashboard/spending-by-category', {
            params: { period },
        });
        return response.data;
    }

    async getIncomeVsExpense(months?: number): Promise<IncomeVsExpense[]> {
        const response = await apiClient.get<IncomeVsExpense[]>('/dashboard/income-vs-expense', {
            params: { months },
        });
        return response.data;
    }

    async getRecentActivity(limit?: number): Promise<RecentActivity[]> {
        const response = await apiClient.get<RecentActivity[]>('/dashboard/recent-activity', {
            params: { limit },
        });
        return response.data;
    }

    async refreshDashboard(): Promise<DashboardData> {
        const response = await apiClient.post<DashboardData>('/dashboard/refresh');
        return response.data;
    }
}

export const dashboardService = new DashboardService();
