import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminOrganizations } from '@/hooks/features/admin/useAdminOrganizations';

export const useOrganizationsList = () => {
    const navigate = useNavigate();
    const {
        organizations,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        handleToggleStatus,
        createOrg,
        updateOrg,
        deleteOrg,
        getOrgById,
        refresh,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount
    } = useAdminOrganizations();

    const [showFilters, setShowFilters] = useState(false);

    return {
        organizations,
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
        navigate,
        createOrg,
        updateOrg,
        deleteOrg,
        getOrgById,
        refresh
    };
};
