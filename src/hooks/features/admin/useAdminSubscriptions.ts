import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';

export interface Subscription {
    id: string;
    date: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Failed';
    method: string;
}

export const useAdminSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 600));
                // Use recentPayments from mockData.subscription
                setSubscriptions(mockData.subscription.recentPayments as Subscription[]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch subscriptions');
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedSubscriptions,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<Subscription>(subscriptions, ['id', 'method', 'status']);

    return {
        subscriptions: paginatedSubscriptions,
        totalCount,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 600);
        }
    };
};
