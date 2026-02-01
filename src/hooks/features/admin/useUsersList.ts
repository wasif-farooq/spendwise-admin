import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';

export const useUsersList = () => {
    const navigate = useNavigate();
    const {
        users,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        handleToggleStatus,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount
    } = useAdminUsers();

    const [showFilters, setShowFilters] = useState(false);

    return {
        users,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        handleToggleStatus,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount,
        showFilters,
        setShowFilters,
        navigate
    };
};
