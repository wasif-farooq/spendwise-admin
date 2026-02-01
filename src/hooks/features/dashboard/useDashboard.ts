import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/api/services/dashboard/dashboardService';
import type { DashboardData } from '@/store/types/dashboard.types';
import { toast } from 'sonner';

export const useDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            const dashboardData = await dashboardService.getDashboardData();
            setData(dashboardData);
            setError(null);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshDashboard = async () => {
        try {
            setLoading(true);
            const refreshedData = await dashboardService.refreshDashboard();
            setData(refreshedData);
            toast.success('Dashboard recalculated successfully');
        } catch (err) {
            toast.error('Failed to refresh dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        data,
        loading,
        error,
        refreshDashboard,
        reFetch: fetchDashboardData
    };
};
