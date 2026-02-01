import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAccounts } from '@/hooks/features/admin/useAdminAccounts';

export const useAccountsList = () => {
    const navigate = useNavigate();
    const {
        accounts,
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
        handleFlagAccount,
        createAccount,
        updateAccount,
        deleteAccount,
        getAccountById,
        totalLiquid,
        totalLiability,
        totalCount
    } = useAdminAccounts();

    const [showFilters, setShowFilters] = useState(false);

    return {
        accounts,
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
        handleFlagAccount,
        createAccount,
        updateAccount,
        deleteAccount,
        getAccountById,
        totalLiquid,
        totalLiability,
        totalCount,
        showFilters,
        setShowFilters,
        navigate
    };
};
