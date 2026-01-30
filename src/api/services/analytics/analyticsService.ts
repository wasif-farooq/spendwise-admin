import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './analyticsMockData.json';
import type { AnalyticsData, AnalyticsOverview, CategoryTrend, MonthlyComparison } from '@/store/types/analytics.types';

// Register mock data
mockAdapter.registerMockData('/analytics', mockData);
mockAdapter.registerMockData('/analytics/overview', mockData.overview);
mockAdapter.registerMockData('/analytics/category-trends', mockData.categoryTrends);
mockAdapter.registerMockData('/analytics/monthly-comparison', mockData.monthlyComparison);

class AnalyticsService {
    async getAnalyticsData(dateRange?: { start: string; end: string }): Promise<AnalyticsData> {
        const response = await apiClient.get<AnalyticsData>('/analytics', {
            params: dateRange,
        });
        return response.data;
    }

    async getOverview(period?: 'week' | 'month' | 'year'): Promise<AnalyticsOverview> {
        const response = await apiClient.get<AnalyticsOverview>('/analytics/overview', {
            params: { period },
        });
        return response.data;
    }

    async getCategoryTrends(months?: number): Promise<CategoryTrend[]> {
        const response = await apiClient.get<CategoryTrend[]>('/analytics/category-trends', {
            params: { months },
        });
        return response.data;
    }

    async getMonthlyComparison(months?: number): Promise<MonthlyComparison[]> {
        const response = await apiClient.get<MonthlyComparison[]>('/analytics/monthly-comparison', {
            params: { months },
        });
        return response.data;
    }

    async exportAnalytics(format: 'csv' | 'pdf' | 'excel'): Promise<Blob> {
        const response = await apiClient.get<Blob>(`/analytics/export`, {
            params: { format },
            responseType: 'blob',
        });
        return response.data as Blob;
    }
}

export const analyticsService = new AnalyticsService();
