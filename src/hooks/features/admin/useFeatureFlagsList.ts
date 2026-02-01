import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminFeatureFlags } from '@/hooks/features/admin/useAdminFeatureFlags';

export const useFeatureFlagsList = () => {
    const navigate = useNavigate();
    const {
        flags,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        toggleFlag,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount,
        refresh
    } = useAdminFeatureFlags();

    const [showFilters, setShowFilters] = useState(false);

    return {
        flags,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        toggleFlag,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount,
        refresh,
        showFilters,
        setShowFilters,
        navigate
    };
};
