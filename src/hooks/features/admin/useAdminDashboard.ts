import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAdminMetricsThunk } from '@/store/slices/adminDashboardSlice';

export const useAdminDashboard = () => {
    const dispatch = useAppDispatch();
    const { metrics, loading, error } = useAppSelector(state => state.adminDashboard);

    useEffect(() => {
        dispatch(fetchAdminMetricsThunk());
    }, [dispatch]);

    const growthData = useMemo(() => {
        return metrics?.userGrowth.map((ug, index) => ({
            name: new Date(ug.date).toLocaleDateString('en-US', { month: 'short' }),
            users: ug.value,
            revenue: metrics.revenueGrowth[index]?.value || 0
        })) || [];
    }, [metrics]);

    return {
        metrics,
        loading,
        error,
        growthData,
        refresh: () => dispatch(fetchAdminMetricsThunk())
    };
};
