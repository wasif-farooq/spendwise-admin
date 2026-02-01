import { useState } from 'react';
import { useAdminSubscriptions } from '@/hooks/features/admin/useAdminSubscriptions';

export const useSubscriptionsList = () => {
    const {
        subscriptions,
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
        totalCount
    } = useAdminSubscriptions();

    const [showFilters, setShowFilters] = useState(false);

    return {
        subscriptions,
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
        totalCount,
        showFilters,
        setShowFilters
    };
};
